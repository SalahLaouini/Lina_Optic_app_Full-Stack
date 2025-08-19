import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../../../firebase/firebase.config"; // 🔐 Firebase auth instance
import "../../../Styles/StylesLogin.css"; // 🎨 Custom styles for login forms
import { Helmet } from "react-helmet"; // 📄 For setting page title in browser tab
import Swal from "sweetalert2"; // 🔔 For styled alert messages

const ChangePassword = () => {
  // 📦 State variables for form fields
  const [currentPassword, setCurrentPassword] = useState("");   // Current password entered by the user
  const [newPassword, setNewPassword] = useState("");           // New password entered
  const [confirmPassword, setConfirmPassword] = useState("");   // Confirmation of the new password
  const [loading, setLoading] = useState(false);                // Loading state while processing

  const navigate = useNavigate(); // 🔁 For redirecting after successful password change

  // 🔄 Handles password update logic
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ❌ New password and confirmation must match
    if (newPassword !== confirmPassword) {
      alert("❌ Les nouveaux mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      // 🔐 Get the current user
      const user = auth.currentUser;

      // ✅ Reauthenticate the user using their current credentials
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // 🔁 Update the password
      await updatePassword(user, newPassword);

      // ✅ Success feedback and redirect
      alert("✅ Votre mot de passe a été changé avec succès.");
      navigate("/user-dashboard");
    } catch (error) {
      console.error("Erreur :", error);

      // ❗ Handle incorrect current password
      if (error.code === "auth/wrong-password") {
        Swal.fire({
          icon: "error",
          title: "Mot de passe incorrect",
          text: "❌ Le mot de passe actuel est incorrect.",
          confirmButtonColor: "#d33",
        });
      } else {
        alert("❌ Une erreur est survenue lors du changement de mot de passe.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* 🧠 Set page title in browser tab */}
      <Helmet>
        <title>Changer le mot de passe</title>
      </Helmet>

      <div className="login-container">
        <h2 className="login-title">Changer le mot de passe</h2>

        {/* 🔐 Password change form */}
        <form onSubmit={handleChangePassword} className="login-form">
          {/* Current Password */}
          <div className="form-group">
            <label>Mot de passe actuel</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          {/* New Password */}
          <div className="form-group">
            <label>Nouveau mot de passe</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm New Password */}
          <div className="form-group">
            <label>Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Mise à jour..." : "Mettre à jour le mot de passe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
