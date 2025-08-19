import React from "react";
import { useTranslation } from "react-i18next";

// ✅ Simple banner component used for displaying section header and description
const Banner1 = () => {
  // 🌍 Access the translation function from i18next
  const { t } = useTranslation();

  return (
    // 🎨 Full-width banner with padding and brown background, centered white text
    <div className="w-full py-12 bg-[#A67C52] text-center text-white">
      {/* 🏷️ Banner title (translated key: update_product) */}
      <h2 className="text-3xl font-bold">
        {t("update_product")}
      </h2>

      {/* 📄 Banner description (translated key: update_product_description) */}
      <p className="mt-2 text-lg">
        {t("update_product_description")}
      </p>
    </div>
  );
};

export default Banner1;
