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
        <title>Contact Opticien Tunisie | Lina Optic</title>
        <meta
          name="description"
          content="Contactez Lina Optic, votre opticien en Tunisie : informations, adresses, horaires et prise de rendez-vous pour lunettes optiques, lunettes solaires et lentilles."
        />
        <meta
          name="keywords"
          content="Opticien Tunisie, Optic Tunisie, Contact opticien, Lunettes opticien, Site web opticien, Lina Optic Manouba"
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
              61 rue Habib Bourguiba, Manouba 2010 
              <br></br>
              292 Avenue Khaled Ebn El Walid, Douar Hicher 61
            </li>
            <li>
              <span className="contact-icon">📧</span>
              linaopticlunettes@gmail.com
            </li>
            <li>
              <span className="contact-icon">📞</span>
              +216 53 123 456
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

      {/* =============================== 🗺️ Map Location Block =============================== */}
      <div className="contact-map-wrapper">
        <iframe
          title="Lina Optic – Carte Manouba"
          src="https://www.openstreetmap.org/export/embed.html?bbox=10.0895%2C36.8090%2C10.0935%2C36.8125&layer=mapnik&marker=36.8109%2C10.0915"
          loading="lazy"
          width="100%"
          height="400"
          frameBorder="0"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default Contact;
