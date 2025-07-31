import React, { useState } from "react";
import "../Styles/StylesLentillesSection.css";

// 📷 Utilise une image compressée WebP si possible
import lentillesSectionImg1 from "../../src/assets/Lentilles Section/Img1-lentilles-section.webp";

const LentillesSection = () => {
  const [imgLoaded, setImgLoaded] = useState(false); // ⏳ Pour afficher un loader si souhaité

  return (
    <section className="lentilles-section">
      {/* 📝 Left side content block */}
      <div className="lentilles-content">
        <a href="/products?subCategory=Lentilles">
          <h2 className="lentilles-title">Lentilles de Contact</h2>
        </a>

        <p className="lentilles-description">
          Découvrez notre gamme de lentilles de contact chez <strong>Lina Optic</strong>. 
          Que vous cherchiez confort, clarté ou style, nos lentilles s’adaptent à votre quotidien avec précision.
        </p>
        <p className="lentilles-description">
          Disponibles en différentes corrections et coloris, elles sont idéales pour un usage quotidien ou occasionnel. 
          Offrez à vos yeux une nouvelle vision !
        </p>

        <a href="/products?subCategory=Lentilles" className="section-button">
          VOIR LA COLLECTION
        </a>
      </div>

      {/* 🖼️ Right side image block */}
      <div className="lentilles-image-container">
        {!imgLoaded && (
          <div className="lentilles-img-loader">Chargement de l’image...</div>
        )}

        <a href="/products?subCategory=Lentilles">
          <img
            src={lentillesSectionImg1}
            alt="Lentilles de Contact Lina Optic"
            className={`lentilles-image ${imgLoaded ? "visible" : "hidden"}`}
            width="600"
            height="400"
            loading="lazy"
            decoding="async"
            fetchpriority="auto"
            onLoad={() => setImgLoaded(true)}
          />
        </a>
      </div>
    </section>
  );
};

export default LentillesSection;
