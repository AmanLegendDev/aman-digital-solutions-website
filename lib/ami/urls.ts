export function isSafeImageUrl(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 2048) return false;

  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      url.hostname === "res.cloudinary.com"
    );
  } catch {
    return false;
  }
}

export function isSafeLiveUrl(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 2048) return false;
  if (/[\u0000-\u001F\u007F\\]/.test(value)) return false;

  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      url.hostname.includes(".")
    );
  } catch {
    return false;
  }
}