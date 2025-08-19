import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import "../Styles/StylesLogin.css";

const ForgotPassword = () => {
  // 📧 Email input state
  const [email, setEmail] = useState("");

  // 🔄 Loading state while request is being processed
  const [loading, setLoading] = useState(false);

  // 📤 Handle password reset request
  const handleRequest = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Send reset email using Firebase Auth
      await sendPasswordResetEmail(auth, email);

      // ✅ Show success message to user
      alert("✅ Un lien de réinitialisation a été envoyé à votre adresse email.");

      // 🧹 Clear input after success
      setEmail("");
    } catch (error) {
      // ❌ Handle and log errors
      console.error("Erreur de réinitialisation:", error);

      // ❌ Show error alert
      alert("❌ Adresse email invalide ou utilisateur introuvable.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* 🏷️ Title */}
        <h2 className="login-title">Mot de passe oublié ?</h2>

        {/* 📩 Password reset form */}
        <form onSubmit={handleRequest} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Entrez votre email</label>
            <input
              type="email"
              id="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* 🔘 Submit button */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Envoi en cours..." : "Envoyer le lien"}
          </button>
        </form>

        {/* 🔙 Back to login link */}
        <p className="login-footer-link">
          <Link to="/login" className="login-link">Retour à la connexion</Link>
        </p>

        {/* 📆 Footer rights */}
        <p className="login-rights">©2025 Lina Optic. Tous droits réservés.</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
