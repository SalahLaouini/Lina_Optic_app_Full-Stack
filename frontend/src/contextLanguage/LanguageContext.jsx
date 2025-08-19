import React, { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// 🌐 Create the LanguageContext to provide language state and change handler
export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();

  // 📦 Load saved language from localStorage, fallback to 'fr' if not set
  const localLang = localStorage.getItem("language");
  const defaultLang = localLang || "fr";
  const [language, setLanguage] = useState(defaultLang); // 🔁 Language state

  // 🔁 Function to update language across the app
  const changeLanguage = (lang) => {
    setLanguage(lang);                   // 📝 Update local state
    i18n.changeLanguage(lang);           // 🌍 Apply language change via i18next
    localStorage.setItem("language", lang); // 💾 Persist in localStorage
    document.documentElement.lang = lang;   // 📑 Set document language tag
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"; // ↔️ Set text direction
  };

  // ✅ Initialize language on first render
  useEffect(() => {
    changeLanguage(defaultLang); // 🔄 Sync language from localStorage or default
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
