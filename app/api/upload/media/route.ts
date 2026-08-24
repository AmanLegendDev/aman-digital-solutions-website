import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;

const IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
  resource_type: string;
};

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (
      !session?.user ||
      session.user.role !== "admin"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    const file = formData.get("file");
    const requestedType = formData.get("type");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: "No media file provided.",
        },
        { status: 400 }
      );
    }

    if (
      requestedType !== "image" &&
      requestedType !== "video"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid media type.",
        },
        { status: 400 }
      );
    }

    const isImage = requestedType === "image";

    const allowedTypes = isImage
      ? IMAGE_TYPES
      : VIDEO_TYPES;

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: isImage
            ? "Only JPG, PNG, WebP and AVIF images are allowed."
            : "Only MP4, WebM and MOV videos are allowed.",
        },
        { status: 400 }
      );
    }

    const maxSize = isImage
      ? MAX_IMAGE_SIZE
      : MAX_VIDEO_SIZE;

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: isImage
            ? "Image must be smaller than 5MB."
            : "Video must be smaller than 50MB.",
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    const result =
      await new Promise<CloudinaryUploadResult>(
        (resolve, reject) => {
          const uploadStream =
            cloudinary.uploader.upload_stream(
              {
                folder:
                  "aman-digital-solutions",

                resource_type: isImage
                  ? "image"
                  : "video",

                ...(isImage
                  ? {
                      transformation: [
                        {
                          quality: "auto",
                          fetch_format: "auto",
                        },
                      ],
                    }
                  : {}),
              },
              (error, uploadResult) => {
                if (
                  error ||
                  !uploadResult
                ) {
                  reject(
                    error ??
                      new Error(
                        "Cloudinary upload failed."
                      )
                  );

                  return;
                }

                resolve({
                  secure_url:
                    uploadResult.secure_url,
                  public_id:
                    uploadResult.public_id,
                  resource_type:
                    uploadResult.resource_type,
                });
              }
            );

          uploadStream.end(buffer);
        }
      );

    let thumbnailUrl:
      | string
      | undefined;

    if (
      result.resource_type === "video"
    ) {
      thumbnailUrl =
        cloudinary.url(
          result.public_id,
          {
            resource_type: "video",
            secure: true,
            format: "jpg",
            transformation: [
              {
                width: 1200,
                height: 675,
                crop: "fill",
                quality: "auto",
              },
            ],
          }
        );
    }

    return NextResponse.json({
      success: true,

      type: requestedType,

      url: result.secure_url,

      publicId: result.public_id,

      ...(thumbnailUrl
        ? {
            thumbnailUrl,
            thumbnailPublicId:
              result.public_id,
          }
        : {}),
    });
  } catch (error) {
  console.error("GALLERY_MEDIA_UPLOAD_ERROR:", error);

  return NextResponse.json(
    {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Media upload failed. Please try again.",
    },
    { status: 500 }
  );
}
}