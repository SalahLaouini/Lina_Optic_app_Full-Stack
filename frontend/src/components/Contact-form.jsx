// ContactForm.jsx
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import getBaseUrl from "../utils/baseURL"; // ⬅️ matches your actual file name

const ContactForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Generic change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  // Optional lightweight front-end validation
  const isValid = () => {
    const { name, email, subject, message } = formData;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Champs requis",
        text: "Veuillez remplir tous les champs.",
        confirmButtonColor: "#3085d6",
      });
      return false;
    }
    // basic email format check
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      Swal.fire({
        icon: "warning",
        title: "Email invalide",
        text: "Veuillez saisir une adresse e-mail valide.",
        confirmButtonColor: "#3085d6",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    setLoading(true);
    try {
      // ✅ Use the unified base URL (production → backend-two)
      await axios.post(`${getBaseUrl()}/api/contact`, formData, {
        headers: { "Content-Type": "application/json" },
        // withCredentials: false, // keep default unless you use cookies
      });

      Swal.fire({
        icon: "success",
        title: "Message envoyé !",
        text: "Votre message a été envoyé avec succès.",
        confirmButtonColor: "#3085d6",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      // Log details for debugging in DevTools
      console.error("Contact POST failed:", {
        status: err?.response?.status,
        data: err?.response?.data,
        headers: err?.response?.headers,
        message: err?.message,
      });

      // Friendly error
      const backendMsg =
        err?.response?.data?.message ||
        "Une erreur est survenue. Veuillez réessayer.";
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: backendMsg,
        confirmButtonColor: "#d33",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-container">
      {/* Title & description */}
      <h3 className="contact-title">Envoyez-nous un message</h3>
      <p className="contact-description">
        Pour toute demande de rendez-vous, question ou conseil optique, notre
        équipe vous répond rapidement.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        <input
          type="text"
          name="name"
          placeholder="Votre nom complet"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />
        <input
          type="email"
          name="email"
          placeholder="Votre adresse e-mail"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
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
          rows={6}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Envoi en cours..." : "Envoyer le message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
