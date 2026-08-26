"use client";

import { useRef, useState } from "react";

import type { Editor } from "@tiptap/react";

import {
  ImagePlus,
  Loader2,
  Video,
} from "lucide-react";

interface MediaUploaderProps {
  editor: Editor | null;
  type: "image" | "video";
}

export default function MediaUploader({
  editor,
  type,
}: MediaUploaderProps) {
  const inputRef =
    useRef<HTMLInputElement | null>(null);

  const [uploading, setUploading] =
    useState(false);

  if (!editor) return null;

  const isImage = type === "image";

  async function uploadMedia(file: File) {
    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      /*
       * IMAGE
       * /api/upload/image
       *
       * VIDEO
       * /api/upload/media
       */
      const endpoint = isImage
        ? "/api/upload/image"
        : "/api/upload/media";

      /*
       * Media route requires the type.
       */
      if (!isImage) {
        formData.append("type", "video");
      }

      const response = await fetch(
        endpoint,
        {
          method: "POST",
          body: formData,
        },
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success ||
        !data.url
      ) {
        throw new Error(
          data.error ||
            "Media upload failed.",
        );
      }

      /*
       * IMAGE
       */
      if (isImage) {
        editor
          .chain()
          .focus()
          .setImage({
            src: data.url,
          })
          .run();

        return;
      }

      /*
       * VIDEO
       *
       * Requires the custom Tiptap
       * VideoExtension to be registered.
       */
      editor
        .chain()
        .focus()
        .insertContent({
          type: "video",
          attrs: {
            src: data.url,
            poster:
              data.thumbnailUrl ?? null,
          },
        })
        .run();
    } catch (error) {
      console.error(
        "MEDIA_UPLOAD_ERROR:",
        error,
      );

      window.alert(
        error instanceof Error
          ? error.message
          : "Media upload failed. Please try again.",
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    void uploadMedia(file);
  }

  return (
    <button
      type="button"
      title={
        uploading
          ? "Uploading..."
          : isImage
            ? "Add image"
            : "Add video"
      }
      aria-label={
        isImage
          ? "Add image"
          : "Add video"
      }
      disabled={uploading}
      onMouseDown={(event) => {
        event.preventDefault();
      }}
      onClick={() => {
        inputRef.current?.click();
      }}
      className="
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-lg
        border
        border-transparent
        text-neutral-400
        transition-all
        duration-150
        hover:border-white/[0.08]
        hover:bg-white/[0.05]
        hover:text-white
        disabled:cursor-not-allowed
        disabled:opacity-40
      "
    >
      {uploading ? (
        <Loader2
          size={17}
          className="animate-spin"
        />
      ) : isImage ? (
        <ImagePlus
          size={17}
          strokeWidth={1.8}
        />
      ) : (
        <Video
          size={17}
          strokeWidth={1.8}
        />
      )}

      <input
        ref={inputRef}
        hidden
        type="file"
        accept={
          isImage
            ? "image/jpeg,image/png,image/webp,image/avif"
            : "video/mp4,video/webm,video/quicktime"
        }
        onChange={handleChange}
      />
    </button>
  );
}