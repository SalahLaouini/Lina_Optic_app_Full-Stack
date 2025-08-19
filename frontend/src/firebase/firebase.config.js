// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDASJtu0Dplt6282iNu5ncnvwg9-lYbdwM",
  authDomain: "lina-optic-e-commerce.firebaseapp.com",
  projectId: "lina-optic-e-commerce",
  storageBucket: "lina-optic-e-commerce.firebasestorage.app",
  messagingSenderId: "1028415884185",
  appId: "1:1028415884185:web:12c2b5fae52726eb006108"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);




