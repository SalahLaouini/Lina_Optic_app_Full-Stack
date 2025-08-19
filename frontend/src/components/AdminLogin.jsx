import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import getBaseUrl from "../utils/baseURL";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../Styles/StylesAdminLogin.css";

// ✅ AdminLogin component handles admin authentication with styled UI and multilingual support
const AdminLogin = () => {
  // 🧠 Local state to store error or system messages
  const [message, setMessage] = useState("");

  // 📝 useForm hook for form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 🔁 For redirecting after successful login
  const navigate = useNavigate();

  // 🌍 Translation setup
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar"; // Handle right-to-left layout for Arabic

  // ✅ Display success alert using SweetAlert
  const showSuccessAlert = (title, text) => {
    Swal.fire({
      title,
      text,
      icon: "success",
      confirmButtonColor: "#3b82f6",
      confirmButtonText: t("admin.enter_dashboard"),
      timer: 2000,
      showClass: { popup: "animate__animated animate__fadeInDown" },
      hideClass: { popup: "animate__animated animate__fadeOutUp" },
    });
  };

  // ❌ Display error alert using SweetAlert
  const showErrorAlert = (title, text) => {
    Swal.fire({
      title,
      text,
      icon: "error",
      confirmButtonColor: "#d33",
      confirmButtonText: t("admin.try_again"),
      showClass: { popup: "animate__animated animate__shakeX" },
      hideClass: { popup: "animate__animated animate__fadeOut" },
    });
  };

  // 🚀 Submit form to authenticate admin
  const onSubmit = async (data) => {
    try {
      // 🔐 Send login credentials to backend
      const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
        headers: { "Content-Type": "application/json" },
      });

      const auth = response.data;

      // ✅ If login successful, store token temporarily
      if (auth.token) {
        localStorage.setItem("token", auth.token);

        // ⏳ Token expires after 1 hour
        setTimeout(() => {
          localStorage.removeItem("token");
          showErrorAlert(t("admin.session_expired_title"), t("admin.session_expired_text"));
          navigate("/");
        }, 3600 * 1000);
      }

      // ✅ Show success and redirect
      showSuccessAlert(t("admin.success_title"), t("admin.success_text"));
      navigate("/dashboard");
    } catch (error) {
      // ❌ Show error alert if login fails
      showErrorAlert(t("admin.error_title"), t("admin.error_text"));
      console.error(error);
    }
  };

  return (
    <div className="admin-login-page" dir={isRTL ? "rtl" : "ltr"}>
      <div className="admin-login-box">
        {/* 🏷️ Title */}
        <h2 className="admin-login-title">{t("admin.title")}</h2>

        {/* ⚠️ Optional error message */}
        {message && <p className="admin-error">{message}</p>}

        {/* 📋 Login form */}
        <form onSubmit={handleSubmit(onSubmit)} className="admin-login-form">
          {/* 📧 Username field */}
          <div className="form-group">
            <label htmlFor="username">{t("admin.username_label")}</label>
            <input
              {...register("username", { required: true })}
              type="text"
              id="username"
              placeholder={t("admin.username_placeholder")}
            />
            {errors.username && (
              <p className="admin-error">{t("admin.username_required")}</p>
            )}
          </div>

          {/* 🔐 Password field */}
          <div className="form-group">
            <label htmlFor="password">{t("admin.password_label")}</label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              placeholder={t("admin.password_placeholder")}
            />
            {errors.password && (
              <p className="admin-error">{t("admin.password_required")}</p>
            )}
          </div>

          {/* 🔘 Submit button */}
          <button type="submit" className="admin-login-btn">
            {t("admin.login_btn")}
          </button>
        </form>

        {/* 📄 Footer note */}
        <p className="admin-login-footer">
          ©2025 Lina Optic — {t("admin.rights")}
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
