import React, { useState, useEffect, useRef } from "react";
import FadeInSection from "../Animations/FadeInSection.jsx";
import "../Styles/StylesSelectorProductsPage.css";

const SelectorsPageProducts = ({
  options = [],              // ✅ Array of checkbox options (e.g., brands, categories)
  onSelect,                  // 🔁 Callback function to notify parent when selection changes
  label,                     // 🏷️ Section title (e.g., "Marques", "Catégories")
  selected: externalSelected // 🌐 Selected values passed from parent (e.g., via URL params)
}) => {
  const isFirstRender = useRef(true); // ⏳ Track initial render
  const [selected, setSelected] = useState(["All"]); // 📦 Local state for selected options

  // ✅ Sync with parent state on first render only (e.g., initial URL param load)
  useEffect(() => {
    if (isFirstRender.current && Array.isArray(externalSelected)) {
      setSelected(externalSelected);
      isFirstRender.current = false;
    }
  }, [externalSelected]);

  // ✅ Notify parent of changes only after initial sync
  useEffect(() => {
    if (!isFirstRender.current && Array.isArray(selected)) {
      onSelect(selected);
    }
  }, [selected]);

  // 🧠 Handle checkbox changes
  const handleChange = (value) => {
    let updated = [];

    if (value === "All") {
      updated = ["All"]; // ☑️ Reset to only "All"
    } else {
      if (selected.includes(value)) {
        // ❌ Remove selected value
        updated = selected.filter((item) => item !== value);
      } else {
        // ✅ Add selected value and remove "All"
        updated = [...selected.filter((item) => item !== "All"), value];
      }

      // 🛑 If no options remain, fallback to "All"
      if (updated.length === 0) {
        updated = ["All"];
      }
    }

    setSelected(updated);
  };

  return (
    <FadeInSection delay={0.1}>
      <div className="selector-sidebar-lina">
        <h3 className="selector-title">{label}</h3>
        <div className="selector-options-grid">
          {options.map((option, index) => (
            <label key={index} className="selector-option-card">
              <input
                type="checkbox"
                value={option}
                checked={Array.isArray(selected) && selected.includes(option)}
                onChange={() => handleChange(option)}
                className="selector-checkbox"
              />
              <span className="selector-label">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
};

export default SelectorsPageProducts;
