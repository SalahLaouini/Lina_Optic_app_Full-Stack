import React from "react";
import "../Styles/StylesKidsEyewearSection.css"; // 🎨 Import custom styles
import kidsGlassesn2 from "../assets/Kid Glasses Section/Kid Glasses Section n°2.webp"; // 🖼️ Image asset

const KidsEyewearSection = () => {
  return (
    <div className="kids-section">
      {/* 📝 Text content for the kids section */}
      <div className="kids-text">
        {/* 🔗 Clickable title that leads to filtered kids products */}
        <a href="/products?category=Enfants">
          <h2 className="kids-title">Lunettes pour Enfants</h2>
        </a>

        {/* 🧒 Descriptive content */}
        <p className="kids-description">
          Offrez à vos enfants une vision claire avec style ! Chez <strong>Lina Optic</strong>, 
          nous avons sélectionné des montures légères, colorées et résistantes – idéales pour le quotidien des petits aventuriers.
        </p>

        <p className="kids-description">
          Confortables et tendance, nos modèles s’adaptent parfaitement aux visages des enfants, tout en assurant une protection optimale.
        </p>

        {/* ✅ Call-to-action */}
        <a href="/products?category=Enfants" className="kids-button">
          VOIR LA COLLECTION
        </a>
      </div>

      {/* 🖼️ Optimized image of a child wearing glasses */}
      <div className="kids-image-container">
        <a href="/products?category=Enfants">
          <img
            src={kidsGlassesn2}
            alt="Enfant avec lunettes Lina Optic"
            className="kids-image"
            loading="lazy"           // ✅ Load image only when needed
            decoding="async"         // ✅ Decode in background
            fetchpriority="auto"     // ✅ Let browser prioritize
          />
        </a>
      </div>
    </div>
  );
};

export default KidsEyewearSection;
