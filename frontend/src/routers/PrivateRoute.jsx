// 📦 Import core React library
import React from 'react';

// 🔐 Import authentication context to access current user
import { useAuth } from '../context/AuthContext';

// 🔁 Import navigation utility to redirect user
import { Navigate } from 'react-router-dom';

// ✅ PrivateRoute component to protect routes that require authentication
const PrivateRoute = ({ children }) => {
  // 🔍 Extract current user and loading state from Auth context
  const { currentUser, loading } = useAuth();

  // ⏳ Show loading state while checking auth status
  if (loading) {
    return <div>Loading..</div>;
  }

  // 🔓 If user is authenticated, allow access to the child components
  if (currentUser) {
    return children;
  }

  // 🔒 If not authenticated, redirect to login page
  return <Navigate to="/login" replace />;
};

// 🚀 Export component for use in route protection
export default PrivateRoute;
