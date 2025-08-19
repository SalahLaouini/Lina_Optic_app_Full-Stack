// src/components/PriceSlider.jsx
import React from "react";
import "../Styles/StylesPriceSlider.css";

const PriceSlider = ({ min, max, priceRange, onChange }) => {
  return (
    <div className="price-slider-container">
      <h3 className="price-slider-title">Prix</h3>

      <div className="price-slider-labels">
        <span>{priceRange[0]} TND</span>
        <span>{priceRange[1]} TND</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={priceRange[0]}
        onChange={(e) => onChange([+e.target.value, priceRange[1]])}
        className="price-slider-input"
      />

      <input
        type="range"
        min={min}
        max={max}
        value={priceRange[1]}
        onChange={(e) => onChange([priceRange[0], +e.target.value])}
        className="price-slider-input"
      />
    </div>
  );
};

export default PriceSlider;
