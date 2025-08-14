// utils/getImgUrl.js
import getBaseUrl from "./baseURL";

/**
 * Resolve the best image URL for display.
 * - Keeps your existing logic (File previews, backend /uploads, static paths)
 * - If the URL is Cloudinary, injects quality/format/DPR/width transforms.
 */
function getImgUrl(name, opts = {}) {
  const {
    w = 800,           // target width to serve (the browser can downscale)
    q = "auto",        // smart quality
    f = "auto",        // auto format (AVIF/WebP/JPEG fallback)
    dpr = "auto",      // crisp on Retina/high-DPI
    crop = "limit"     // don't upscale beyond original
  } = opts;

  // 1) Fallback
  if (!name) return "/default-image.jpg";

  // 2) Preview local File/Blob (e.g., on mobile)
  if (typeof name === "object" && (name instanceof File || name instanceof Blob)) {
    return URL.createObjectURL(name);
  }

  // 3) Absolute/external URLs
  if (typeof name === "string" && (name.startsWith("http://") || name.startsWith("https://"))) {
    // If Cloudinary, inject transforms after "/upload/"
    if (name.includes("res.cloudinary.com") && name.includes("/upload/")) {
      const t = `f_${f},q_${q},dpr_${dpr},c_${crop},w_${w}`;
      return name.replace("/upload/", `/upload/${t}/`);
    }
    // Non-Cloudinary externals: return as-is
    return name;
  }

  // 4) Backend uploads (prepend API base URL)
  if (typeof name === "string" && (name.startsWith("/uploads/") || name.startsWith("uploads/"))) {
    return `${getBaseUrl()}${name.startsWith("/") ? name : `/${name}`}`;
  }

  // 5) Static file in /public
  return name.startsWith("/") ? name : `/${name}`;
}

export { getImgUrl };
