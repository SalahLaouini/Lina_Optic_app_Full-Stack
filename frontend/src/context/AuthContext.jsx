import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

// 🌐 Create context for authentication state and actions
const AuthContext = createContext();

// ✅ Hook to use the AuthContext in child components
export const useAuth = () => {
  return useContext(AuthContext);
};

// 🔐 Google provider for popup authentication
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // 🧑‍💻 Currently logged-in user
  const [loading, setLoading] = useState(true);         // ⏳ Loading state while checking auth
  const { t, i18n } = useTranslation();                  // 🌍 For multilingual alerts

  // 🔐 Register a user with email and password
  const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  // 🔐 Login a user with email and password
  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // 🔐 Login with Google account
  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  // 🚪 Logout function with multilingual SweetAlert confirmation
  const logout = async () => {
    const result = await Swal.fire({
      title:
        i18n.language === "ar"
          ? "هل أنت متأكد؟"
          : i18n.language === "fr"
          ? "Êtes-vous sûr(e) ?"
          : "Are you sure?",
      text:
        i18n.language === "ar"
          ? "سيتم تسجيل خروجك من الحساب."
          : i18n.language === "fr"
          ? "Vous serez déconnecté(e) de votre compte."
          : "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8B5C3E",
      cancelButtonColor: "#d33",
      confirmButtonText:
        i18n.language === "ar"
          ? "نعم، تسجيل الخروج!"
          : i18n.language === "fr"
          ? "Oui, déconnectez-moi !"
          : "Yes, Logout!",
    });

    if (result.isConfirmed) {
      await signOut(auth); // 🔄 Sign the user out
      Swal.fire({
        title:
          i18n.language === "ar"
            ? "تم تسجيل الخروج!"
            : i18n.language === "fr"
            ? "Déconnecté(e) !"
            : "Logged Out!",
        text:
          i18n.language === "ar"
            ? "لقد تم تسجيل خروجك بنجاح."
            : i18n.language === "fr"
            ? "Vous avez été déconnecté(e) avec succès."
            : "You have been successfully logged out.",
        icon: "success",
        confirmButtonColor: "#8B5C3E",
        timer: 2000,
      });
    }
  };

  // 🧭 Track authentication state on initial load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // 🔁 Clean up listener on unmount
  }, []);

  // 📦 Values to be shared through the context
  const value = {
    currentUser,
    loading,
    registerUser,
    loginUser,
    signInWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
