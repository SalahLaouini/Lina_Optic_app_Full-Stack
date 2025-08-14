// 📦 Import the function to determine the backend base URL (used for uploaded images)
import getBaseUrl from "./baseURL";

// 🖼️ Utility function to resolve the correct image URL for display
function getImgUrl(name) {
  // 🚫 If no image name is provided, return a default placeholder image
  if (!name) {
    return "/default-image.jpg"; // 🖼️ Default fallback image
  }

  // 📱 If the input is a File object (e.g., selected from a mobile device), generate a temporary URL for preview
  if (typeof name === "object" && name instanceof File) {
    return URL.createObjectURL(name);
  }

  // 🌍 If the image is already hosted externally (e.g., Cloudinary or S3), return the URL as is
  if (typeof name === "string" && (name.startsWith("http://") || name.startsWith("https://"))) {
    return name;
  }

  // 🗂️ If the image is uploaded to the backend (e.g., stored in `/uploads/`), prepend the backend base URL
  if (typeof name === "string" && (name.startsWith("/uploads/") || name.startsWith("uploads/"))) {
    return `${getBaseUrl()}${name.startsWith("/") ? name : `/${name}`}`;
  }

  // 🗃️ For static local images (e.g., in public folder), return relative path
  return `/${name}`;
}

// 🚀 Export the helper function for use across the project
export { getImgUrl };
