import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ContactForm = () => {
  // 🧾 State to store form field values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // ⏳ Loading state while submitting
  const [loading, setLoading] = useState(false);

  // 🔄 Handle input changes and update form data state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📤 Submit the form to backend endpoint
  const handleSubmit = async (e) => {
    e.preventDefault(); // 🚫 Prevent default form reload
    setLoading(true);

    try {
      // ✅ Send POST request to backend contact endpoint
      await axios.post('https://lina-optic-app-backend.vercel.app/api/contact', formData);

      // ✅ Show success alert using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Message envoyé !',
        text: 'Votre message a été envoyé avec succès.',
        confirmButtonColor: '#3085d6',
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      // 🔄 Reset form after success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      // ❌ Show error alert on failure
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue. Veuillez réessayer.',
        confirmButtonColor: '#d33',
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    } finally {
      // ✅ Always stop loading at the end
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-container">
      {/* 🏷️ Title and description */}
      <h3 className="contact-title">Envoyez-nous un message</h3>
      <p className="contact-description">
        Pour toute demande de rendez-vous, question ou conseil optique, notre équipe vous répond rapidement.
      </p>

      {/* 📝 Contact Form */}
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Votre nom complet"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Votre adresse e-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Objet de votre message"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Écrivez votre message ici..."
          value={formData.message}
          onChange={handleChange}
          required
        />

        {/* 🚀 Submit button with loading feedback */}
        <button type="submit" disabled={loading}>
          {loading ? "Envoi en cours..." : "Envoyer le message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
