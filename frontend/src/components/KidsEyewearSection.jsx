import React, { useState } from "react";
import "../Styles/StylesKidsEyewearSection.css"; // 🎨 Custom styles
import kidsGlassesn2 from "../assets/Kid Glasses Section/Kid Glasses Section n°2.webp"; // 🖼️ Compressed image

const KidsEyewearSection = () => {
  const [imgLoaded, setImgLoaded] = useState(false); // ⏳ For showing loader

  return (
    <div className="kids-section">
      {/* 📝 Text content block */}
      <div className="kids-text">
        <a href="/products?category=Enfants">
          <h2 className="kids-title">Lunettes pour Enfants</h2>
        </a>

        <p className="kids-description">
          Offrez à vos enfants une vision claire avec style ! Chez <strong>Lina Optic</strong>, 
          nous avons sélectionné des montures légères, colorées et résistantes – idéales pour le quotidien des petits aventuriers.
        </p>

        <p className="kids-description">
          Confortables et tendance, nos modèles s’adaptent parfaitement aux visages des enfants, tout en assurant une protection optimale.
        </p>

        <a href="/products?category=Enfants" className="kids-button">
          VOIR LA COLLECTION
        </a>
      </div>

      {/* 🖼️ Image block */}
      <div className="kids-image-container">
        {!imgLoaded && (
          <div className="kids-image-loader">Chargement de l’image...</div>
        )}

        <a href="/products?category=Enfants">
          <img
            src={kidsGlassesn2}
            alt="Enfant avec lunettes Lina Optic"
            className={`kids-image ${imgLoaded ? "visible" : "hidden"}`}
            width="600"
            height="400"
            loading="lazy"
            decoding="async"
            fetchpriority="auto"
            onLoad={() => setImgLoaded(true)}
          />
        </a>
      </div>
    </div>
  );
};

export default KidsEyewearSection;
