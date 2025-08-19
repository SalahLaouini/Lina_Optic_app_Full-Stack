import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import "../Styles/StylesNavbar.css";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { FiHeart } from 'react-icons/fi';

const Navbar = () => {
  // 🔄 State for toggling mobile menu and user dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 🔍 Ref to detect outside clicks on the dropdown
  const dropdownRef = useRef(null);

  // 🔐 Auth and cart data
  const { currentUser, logout } = useAuth();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // 🌍 Language and direction handling
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // 💬 Set document direction based on language
  useEffect(() => {
    document.body.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  // ✋ Close dropdown or mobile menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (
        isMobileMenuOpen &&
        !e.target.closest(".mobile-menu-panel") &&
        !e.target.closest(".mobile-menu-btn")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <header className="navbar-container">
      <nav className="navbar-content">
        {/* 🔵 Logo */}
        <div className="navbar-left">
          <a href="/" className="logo">
            <div className="lina-optic-logo">LINA OPTIC</div>
          </a>
        </div>

        {/* 📱 Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <FaBars className="menu-icon" />
        </button>

        {/* 🖥️ Desktop Navigation */}
        <ul className="nav-links desktop-only">
          <li><a href="/">Accueil</a></li>

          <li className="nav-item dropdown">
            <a href="/products?subCategory=Solaire">solaire</a>
            <ul className="dropdown-menu">
              <li><a href="/products?category=Hommes&subCategory=Solaire">solaire homme</a></li>
              <li><a href="/products?category=Femmes&subCategory=Solaire">solaire femme</a></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a href="/products?subCategory=Optique">optique</a>
            <ul className="dropdown-menu">
              <li><a href="/products?category=Hommes&subCategory=Optique">vue homme</a></li>
              <li><a href="/products?category=Femmes&subCategory=Optique">vue femme</a></li>
            </ul>
          </li>

          <li><a href="/products?subCategory=Lentilles">lentilles</a></li>
          <li><a href="/products?category=Enfants">enfants</a></li>
          <li><a href="/contact">Contactez-nous</a></li>
        </ul>

        {/* 🛒 Cart, Wishlist, User, Language */}
        <div className="nav-icons">
          {/* ✅ Cart icon */}
          <Link
            to="/cart"
            className="cart-icon"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <FaShoppingCart className="icon" />
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </Link>

          {/* ❤️ Wishlist icon */}
          <Link
            to="/wishlist"
            className="wishlist-icon"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <FiHeart className="icon" />
          </Link>

          {/* 👤 User avatar or login */}
          <div className="user-section" ref={dropdownRef}>
            {currentUser ? (
              <>
                <button
                  className="user-avatar-btn"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <FaUserCircle className="user-icon logged-in" />
                </button>

                {isDropdownOpen && (
                  <div className="user-dropdown">
                    <ul>
                      <li><a href="/user-dashboard">Tableau de Bord</a></li>
                      <li><a href="/orders">Ordres</a></li>
                      <li><button onClick={logout}>Déconnexion</button></li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <a href="/login" className="login-icon">
                <FaUserCircle className="icon" />
              </a>
            )}
          </div>

          
        </div>
      </nav>

      {/* 📱 Mobile Navigation Panel */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-panel">
          <button className="close-btn" onClick={() => setIsMobileMenuOpen(false)}>
            <FaTimes />
          </button>
          <ul>
            <li><a href="/" onClick={() => setIsMobileMenuOpen(false)}>Accueil</a></li>
            <li><a href="/products?subCategory=Solaire" onClick={() => setIsMobileMenuOpen(false)}>solaire homme</a></li>
            <li><a href="/products?subCategory=Solaire" onClick={() => setIsMobileMenuOpen(false)}>solaire femme</a></li>
            <li><a href="/products?subCategory=Optique" onClick={() => setIsMobileMenuOpen(false)}>vue homme</a></li>
            <li><a href="/products?subCategory=Optique" onClick={() => setIsMobileMenuOpen(false)}>vue femme</a></li>
            <li><a href="/products?subCategory=Lentilles" onClick={() => setIsMobileMenuOpen(false)}>lentilles</a></li>
            <li><a href="/products?mainCategory=Enfants" onClick={() => setIsMobileMenuOpen(false)}>enfants</a></li>
            <li><a href="/wishlist" onClick={() => setIsMobileMenuOpen(false)}>Mes favoris</a></li>
            <li><a href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contactez-nous</a></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
