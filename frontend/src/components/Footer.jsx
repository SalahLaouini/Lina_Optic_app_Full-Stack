import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "../Styles/StylesFooter.css";

const Footer = () => {
  return (
    <footer className="lina-footer">
      {/* 🔳 Grid layout for footer sections */}
      <div className="footer-grid">
        {/* 🔹 About + map */}
        <div className="footer-section">
          <h4>À propos</h4>
          <p>
            Lina Optic propose des montures modernes, des verres de haute qualité
            et un service client irréprochable pour tous vos besoins optiques.
          </p>

          <div className="footer-map-small">
  <iframe
              
          title="Lina Optic – Carte Manouba"
          src={
            "https://www.openstreetmap.org/export/embed.html" +
            "?layer=mapnik" +
            "&zoom=17" +
            "&marker=36.8109%2C10.0915" +
            "&bbox=10.0895%2C36.8090%2C10.0935%2C36.8125"
          }
          loading="lazy"
          width="100%"
          height="400"
          frameBorder="0"
          allowFullScreen
        />

</div>

        </div>

        {/* 🔹 Quick links */}
        <div className="footer-section">
          <h4>Liens rapides</h4>
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/products">Nos produits</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* 🔹 Contact + socials */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>
            <FaMapMarkerAlt className="footer-icon" />
            61 Rue Habib Bourguiba<br />
            Manouba 2010
          </p>
          <p>
            <FaMapMarkerAlt className="footer-icon" />
            292 Avenue Khaled Ebn El Walid<br />
            Douar Hicher 61
          </p>
          <p><FaPhoneAlt className="footer-icon" /> +216 22 344 803</p>
          <p><FaEnvelope className="footer-icon" /> linaopticlunettes@gmail.com</p>

          <div className="footer-socials">
            <a
              href="https://www.instagram.com/linaoptic2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Lina Optic"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100063696517447"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Lina Optic"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>

      {/* 🔻 Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Lina Optic – Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;