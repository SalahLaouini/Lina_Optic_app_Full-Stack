import React, { useRef } from "react";
import "../Styles/StylesHeroCategoryCards.css";
import femmeImage from "../assets/Glasses/Img HeroCategory Card Women Glasses n2.webp";
import hommeImage from "../assets/Glasses/Img HeroCategory Card Men Glasses n3.webp";

const HeroCategoryCards = () => {
  const handleMouseMove = (e, zoomRef) => {
    const zoom = zoomRef.current;
    const rect = zoom.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    zoom.style.backgroundPosition = `${x}% ${y}%`;
  };

  const handleMouseLeave = (zoomRef) => {
    zoomRef.current.style.backgroundPosition = "center center";
  };

  const femmeZoomRef = useRef(null);
  const hommeZoomRef = useRef(null);

  return (
    <div className="category-cards-container">
      {/* 🔴 Women's Glasses */}
      <a href="/products?category=Femmes" className="category-card-link-wrapper">
        <div
          className="category-card"
          onMouseMove={(e) => handleMouseMove(e, femmeZoomRef)}
          onMouseLeave={() => handleMouseLeave(femmeZoomRef)}
        >
          <div
            ref={femmeZoomRef}
            className="zoom-layer"
            style={{
  backgroundImage: `url(${femmeImage})`,
  backgroundPosition: "center center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat"
}}

          >
            {/* 🖼️ Optimization: real <img> for preloading and SEO */}
            <img
    src={femmeImage}
    alt="Lunettes pour Elle"
    className="hidden-img"
    loading="lazy"
    decoding="async"
    fetchpriority="high"
  />
</div>
          <div className="card-overlay">
            <p className="card-subtitle">Lunettes pour Elle</p>
            <h3 className="card-title">Beauté Visuelle</h3>
            <span className="card-link">VOIR LA COLLECTION</span>
          </div>
        </div>
      </a>

      {/* 🔵 Men's Glasses */}
      <a href="/products?category=Hommes" className="category-card-link-wrapper">
        <div
          className="category-card"
          onMouseMove={(e) => handleMouseMove(e, hommeZoomRef)}
          onMouseLeave={() => handleMouseLeave(hommeZoomRef)}
        >
          <div
            ref={hommeZoomRef}
            className="zoom-layer"
            style={{
  backgroundImage: `url(${hommeImage})`,
  backgroundPosition: "center center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat"
}}

          >
            <img
              src={hommeImage}
              alt="Lunettes pour Lui"
              className="hidden-img"
              loading="lazy"
              decoding="async"
              fetchpriority="auto"
            />
          </div>
          <div className="card-overlay">
            <p className="card-subtitle">Lunettes pour Lui</p>
            <h3 className="card-title">Audace Élégante</h3>
            <span className="card-link">VOIR LA COLLECTION</span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default HeroCategoryCards;



