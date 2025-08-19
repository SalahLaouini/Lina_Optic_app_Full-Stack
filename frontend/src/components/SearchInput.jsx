import React from "react";
import { useTranslation } from "react-i18next";

const SearchInput = ({ setSearchTerm }) => {
  // 🌍 Hook for accessing translations
  const { t } = useTranslation();

  // 🔍 Input field triggers this function on every change
  // It updates the search term state in the parent component
  // via the passed-in `setSearchTerm` function

  return (
    <div className="search-input-container">
      <input
        type="text"
        placeholder={t("search_input.placeholder")} // 🈳 Translated placeholder text
        className="search-input" // 🎨 Custom styling class
        onChange={(e) => setSearchTerm(e.target.value)} // 📝 Update search term on typing
      />
    </div>
  );
};

export default SearchInput;

