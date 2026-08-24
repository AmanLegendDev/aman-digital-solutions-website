"use client";

import { useRef, useState } from "react";
import {
  ImagePlus,
  Loader2,
  RefreshCw,
  Trash2,
  UploadCloud,
} from "lucide-react";

type CloudinaryImageValue = {
  url: string;
  publicId?: string;
  alt?: string;
};

type CloudinaryImageUploaderProps = {
  value?: CloudinaryImageValue;
  onChange: (value: CloudinaryImageValue | undefined) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

export default function CloudinaryImageUploader({
  value,
  onChange,
  label = "Image",
  description = "JPG, PNG, WebP or AVIF. Maximum 5MB.",
  disabled = false,
}: CloudinaryImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const chooseFile = () => {
    if (disabled || uploading) return;

    setError("");
    inputRef.current?.click();
  };

  const uploadFile = async (file: File) => {
    setError("");

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please choose a JPG, PNG, WebP or AVIF image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ?? "Image upload failed."
        );
      }

      onChange({
        url: result.url,
        publicId: result.publicId,
      });
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Image upload failed."
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      void uploadFile(file);
    }
  };

  const removeImage = () => {
    if (disabled || uploading) return;

    setError("");
    onChange(undefined);
  };

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-medium text-white/80">
          {label}
        </p>

        <p className="mt-1 text-xs text-white/35">
          {description}
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || uploading}
      />

      {value?.url ? (
        <div className="overflow-hidden rounded-2xl border border-[#252525] bg-[#080808]">
          <div className="relative aspect-[16/8] overflow-hidden">
            <img
              src={value.url}
              alt={value.alt || label}
              className="h-full w-full object-cover"
            />

            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0D0D0D] px-4 py-2 text-xs">
                  <Loader2
                    size={14}
                    className="animate-spin text-[#FFC400]"
                  />
                  Uploading...
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-[#252525] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-medium text-white/70">
                Image uploaded
              </p>

              <p className="mt-1 truncate text-[11px] text-white/30">
                {value.publicId || value.url}
              </p>
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={chooseFile}
                disabled={disabled || uploading}
                className="inline-flex items-center gap-2 rounded-lg border border-[#303030] px-3 py-2 text-xs font-medium text-white/70 transition hover:border-[#FFC400]/40 hover:text-[#FFC400] disabled:opacity-50"
              >
                <RefreshCw size={14} />
                Replace
              </button>

              <button
                type="button"
                onClick={removeImage}
                disabled={disabled || uploading}
                className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
              >
                <Trash2 size={14} />
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={chooseFile}
          disabled={disabled || uploading}
          className="group flex min-h-[220px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-[#303030] bg-[#080808] px-6 text-center transition hover:border-[#FFC400]/50 hover:bg-[#0D0D0D] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#252525] bg-[#0D0D0D] text-white/40 transition group-hover:border-[#FFC400]/30 group-hover:text-[#FFC400]">
            {uploading ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              <UploadCloud size={24} />
            )}
          </div>

          <p className="text-sm font-medium text-white/80">
            {uploading
              ? "Uploading image..."
              : "Click to upload an image"}
          </p>

          <p className="mt-2 text-xs text-white/30">
            {uploading
              ? "Please wait while we upload your image."
              : "Choose an image from your computer"}
          </p>
        </button>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-300">
          {error}
        </div>
      )}
    </div>
  );
}