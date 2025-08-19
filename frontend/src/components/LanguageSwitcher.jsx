import React, { useContext } from "react";
import { LanguageContext } from './../contextLanguage/LanguageContext';

const LanguageSwitcher = () => {
  // 🧠 Destructure language state and changeLanguage function from context
  const { language, changeLanguage } = useContext(LanguageContext);

  return (
    // 🔄 Select input to switch languages
    <select
      value={language} // ✅ Binds the current language to the select element
      onChange={(e) => changeLanguage(e.target.value)} // 🔁 Calls context function to update language
      className="language-switcher" // 🎨 Custom class for styling the dropdown
    >
      {/* 🌐 Language options */}
      <option value="en">🇬🇧 English</option>
      <option value="fr">🇫🇷 Français</option>
      <option value="ar">🇸🇦 العربية</option>
    </select>
  );
};

export default LanguageSwitcher;
