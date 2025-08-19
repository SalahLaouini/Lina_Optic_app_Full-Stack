// AdminRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * 🔐 AdminRoute protects admin pages by checking for a valid token in localStorage.
 * If no token is found, it redirects to the admin login page (/admin).
 * If a token exists, it renders the child components or the nested route via <Outlet />.
 */
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // 🔍 Check for auth token (e.g. from login)

  // 🚫 If no token found, redirect to admin login
  if (!token) {
    return <Navigate to="/admin" />;
  }

  // ✅ If token exists, render the intended component or nested route
  return children ? children : <Outlet />;
};

export default AdminRoute;
