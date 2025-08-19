import React from "react";
import { useTranslation } from "react-i18next";

const Selector = ({ label, value, options, onChange }) => {
  // 🌍 Hook for accessing translation strings
  const { t } = useTranslation();

  // 🧾 This component renders a labeled <select> dropdown
  // 🔁 Options are dynamically mapped from the `options` prop
  // 📦 `value` is the currently selected option
  // 🛠️ `onChange` is triggered when a different option is selected

  return (
    <div className="selector-container">
      {/* 🏷️ Optional label shown above the selector */}
      {label && <label className="selector-label">{label}</label>}

      <select
        className="selector-dropdown" // 🎨 Custom styling class
        value={value} // ✅ Controlled value for the selector
        onChange={(e) => onChange(e.target.value)} // 📝 Update value on change
      >
        {/* 🔄 Render each option as <option> */}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {t(option)} {/* 🌐 Translate the option label */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selector;
