import React from "react";
import { FaTruck, FaInstagram, FaFacebookF } from "react-icons/fa"; // 🚚 Icons for shipping and social media
import "../Styles/StylesFreeShippingBanner.css"; // 🎨 CSS styling for the banner

const FreeShippingBanner = () => {
  return (
    <div className="free-shipping-banner">
      {/* 🚛 Shipping message section */}
      <div className="shipping-content">
        <FaTruck className="truck-icon" />
        Livraison Gratuite !{" "}
        <span>Commandez dès maintenant vos lunettes chez Lina Optic.</span>
      </div>

      {/* 📱 Social media icons */}
      <div className="shipping-socials">
        {/* 📸 Instagram link */}
        <a
          href="https://www.instagram.com/linaoptic2"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label="Instagram Lina Optic Manouba"
        >
          <FaInstagram />
        </a>

        {/* 📘 Facebook link */}
        <a
          href="https://www.facebook.com/profile.php?id=100063696517447"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label="Facebook Lina Optic Manouba"
        >
          <FaFacebookF />
        </a>
      </div>
    </div>
  );
};

export default FreeShippingBanner;
