import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import "../Styles/StylesRegister.css";

const Register = () => {
  const [message, setMessage] = useState("");
  const { registerUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ SweetAlert - Success
  const showSuccessAlert = (title, text) => {
    Swal.fire({
      title,
      text,
      icon: "success",
      confirmButtonColor: "#444",
      confirmButtonText: "Continuer vers l'accueil",
      timer: 2000,
    });
  };

  // ❌ SweetAlert - Error
  const showErrorAlert = (title, text) => {
    Swal.fire({
      title,
      text,
      icon: "error",
      confirmButtonColor: "#d33",
      confirmButtonText: "Réessayer",
    });
  };

  // 📤 Form submission
  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);
      showSuccessAlert(
        "Inscription réussie !",
        "Bienvenue chez Lina Optic. Votre compte a été créé."
      );
      navigate("/");
    } catch (error) {
      showErrorAlert(
        "Échec de l'inscription",
        "Une erreur est survenue. Veuillez vérifier vos informations et réessayer."
      );
      console.error(error);
    }
  };

  // 🔐 Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      showSuccessAlert(
        "Connexion via Google réussie !",
        "Bienvenue chez Lina Optic. Vous êtes maintenant connecté."
      );
      navigate("/");
    } catch (error) {
      showErrorAlert(
        "Échec de la connexion Google",
        "Nous n'avons pas pu vous connecter via Google. Veuillez réessayer."
      );
      console.error(error);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Créer un compte</h2>

        {message && <p className="register-message">{message}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          <div className="form-group">
            <label htmlFor="email">Adresse e-mail</label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              placeholder="Entrez votre e-mail"
              className="input"
            />
            {errors.email && (
              <p className="input-error">L’adresse e-mail est requise.</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              placeholder="Entrez votre mot de passe"
              className="input"
            />
            {errors.password && (
              <p className="input-error">Le mot de passe est requis.</p>
            )}
          </div>

          <button type="submit" className="btn-primary">
            S’inscrire
          </button>
        </form>

        <p className="register-footer-link">
          <Link to="/forgot-password" className="text-link">
            Mot de passe oublié ?
          </Link>
        </p>

        <p className="register-footer-link">
          Vous avez déjà un compte ?{" "}
          <Link to="/login" className="text-link">Se connecter ici</Link>
        </p>

        <div className="google-login">
          <button onClick={handleGoogleSignIn} className="btn-google">
            <FaGoogle className="google-icon" />
            S’inscrire avec Google
          </button>
        </div>

        <p className="register-rights">
          ©2025 Lina Optic. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};

export default Register;
