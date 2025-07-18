// ✅ Importing Outlet for nested routing support (react-router-dom)
import { Outlet } from "react-router-dom";

// ✅ Global styles
import "./App.css";

// ✅ Core layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FreeShippingBanner from "./components/FreeShippingBanner.jsx";

// ✅ Authentication provider to wrap the app
import { AuthProvider } from "./context/AuthContext";

// ✅ React hooks
import { useState, useEffect } from "react";

// ✅ Custom loading spinner while the app initializes
import Loading from "../src/components/Loading.jsx";

// ✅ Import i18n setup (multilingual support)
import "../src/i18n.js";

// ✅ Translation hook to detect current language
import { useTranslation } from "react-i18next";

function App() {
  const [loading, setLoading] = useState(true); // 🔄 Initial loading state
  const { i18n } = useTranslation(); // 🌐 Get current language

  // ✅ Set HTML lang and direction attributes dynamically
  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr"; // RTL for Arabic
  }, [i18n.language]);

  // ✅ Simulated loading effect (e.g., splash screen for 2 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer); // ⏱️ Cleanup timer on unmount
  }, []);

  // ✅ Show loading component if still loading
  if (loading) {
    return <Loading />;
  }

  // ✅ Main app structure with shared layout
  return (
    <AuthProvider>
      <FreeShippingBanner />
      <Navbar />
      <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
        <Outlet /> {/* Nested routes will render here */}
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
