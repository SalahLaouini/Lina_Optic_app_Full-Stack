import React, { useState } from 'react';
import ContactForm from '../components/Contact-form.jsx';
import "../Styles/StylesContact.css";
import "../Styles/StylesContact-form.css";
import { Helmet } from "react-helmet";

const Contact = () => {
  const [successMessage, setSuccessMessage] = useState(null);

  return (
    <div className="contact-page">
      {/* 🔖 SEO title */}
     <Helmet>
  <title>Lunettes opticien & Lunettes Optic en Tunisie | Produits | Lina Optic</title>
  <meta
    name="description"
    content="Découvrez nos lunettes optiques, solaires et lentilles en Tunisie. Filtrez par catégorie, marque et type de cadre chez Lina Optic."
  />
  <meta
    name="keywords"
    content="Lunettes opticien, Lunettes Optic, Optic Tunisie, Lunettes solaires opticien, Opticien Tunisie, Catalogue lunettes Tunisie"
  />
</Helmet>



      {/* ===============================
          🏞️ Hero Section with Animated Title
      =============================== */}
      <section className="contact-hero">
        <h1 className="contact-hero-title">Restons en contact 👓</h1>
        <p className="contact-hero-subtitle">
          Notre équipe est à votre écoute pour toute question ou prise de rendez-vous.
        </p>
      </section>

      {/* ===============================
          📬 Contact Info + Form Side-by-Side
      =============================== */}
      <div className="contact-content-wrapper">
        {/* 📍 Contact Details Block */}
        <div className="contact-info">
          <h2 className="contact-info-title">📍 Nos coordonnées</h2>
          <ul className="contact-info-list">
            <li>
              <span className="contact-icon">📌</span>
              <address className="contact-address">
                61 Rue Habib Bourguiba<br />
                Manouba 2010
              </address>
            </li>
            <li>
              <span className="contact-icon">📌</span>
              <address className="contact-address">
                292 Avenue Khaled Ebn El Walid<br />
                Douar Hicher 61
              </address>
            </li>
            <li>
              <span className="contact-icon">📧</span>
              <a href="mailto:linaopticlunettes@gmail.com">linaopticlunettes@gmail.com</a>
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <a href="tel:+21653123456">+216 53 123 456</a>
            </li>
            <li>
              <span className="contact-icon">⏰</span>
              Lundi – Samedi : 8h à 20h
            </li>
          </ul>
        </div>

        {/* 📝 Contact Form Block */}
        <div className="contact-form-wrapper">
          <ContactForm onSuccess={setSuccessMessage} />
          {successMessage && (
            <p className="message-status">{successMessage}</p>
          )}
        </div>
      </div>

      {/* =============================== 🗺️ Map Location Block =============================== **/}
      <div className="contact-map-wrapper">
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
  );
};

export default Contact;
