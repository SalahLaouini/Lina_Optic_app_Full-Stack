// 📦 baseUrl.js — Utility to determine the correct backend URL based on environment

// 🌐 Function to get the appropriate base URL for API calls
const getBaseUrl = () => {
  // ✅ If in development mode (local), return the local backend server URL
  if (import.meta.env.MODE === 'development') {
    return 'http://localhost:5000';
  }

  // 🚀 If in production mode, return the deployed backend URL (e.g., on Vercel)
  return 'https://lina-optic-app-backend-two.vercel.app';
};

// 🚀 Export the function so it can be used across the project
export default getBaseUrl;
