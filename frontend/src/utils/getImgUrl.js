// utils/getImgUrl.js
export const getImgUrl = (url, opts = {}) => {
  const { w = 800, q = "auto", f = "auto", dpr = "auto", crop = "limit" } = opts;
  if (!url) return "/assets/default-image.png";

  // Cloudinary: insérer les transformations juste après "/upload/"
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    const t = `f_${f},q_${q},dpr_${dpr},c_${crop},w_${w}`;
    return url.replace("/upload/", `/upload/${t}/`);
  }

  // Sinon : laisser l’URL telle quelle
  return url;
};
