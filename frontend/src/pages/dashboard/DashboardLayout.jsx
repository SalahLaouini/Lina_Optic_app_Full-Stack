import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  FaHome, FaTachometerAlt, FaPlusCircle, FaTools, FaBars, FaSignOutAlt,
  FaSun, FaMoon, FaClipboardList
} from 'react-icons/fa';
import { MdProductionQuantityLimits } from 'react-icons/md';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 📱 State to toggle sidebar for mobile view
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🌙 Manage dark mode state using localStorage
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  // 📱 Close sidebar automatically on mobile after clicking a link
  const handleMobileNav = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  // 🌓 Apply or remove dark mode styles
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // 🚪 Handle logout confirmation and redirect
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Vous allez être déconnecté.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, déconnectez-moi",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token");
      Swal.fire({
        title: "Déconnecté",
        text: "Session fermée avec succès.",
        icon: "success",
        timer: 2000,
      });
      navigate("/");
    }
  };

  // ✅ Check if the current route is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Helmet>
        <title>Admin | Lina Optic</title>
      </Helmet>

      {/* 🧭 Sidebar Navigation Panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-56 bg-blue-100 text-gray-700 dark:bg-gray-800 dark:text-white flex flex-col items-center py-6 z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 shadow-md border-r border-blue-200 dark:border-gray-700`}
      >
        {/* ❌ Mobile Close Sidebar Button */}
        <div className="w-full flex justify-end md:hidden px-4 mb-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-blue-800 hover:text-red-500 transition-all p-1"
            title="Fermer le menu"
          >
            <FaBars className="text-xl" />
          </button>
        </div>

        {/* 🏠 Home Link */}
        <Link
          to="/"
          title="Accueil"
          onClick={handleMobileNav}
          className="mb-6 text-blue-600 hover:text-blue-800 dark:text-blue-300 transition-all duration-300 transform hover:scale-110"
        >
          <FaHome className="text-3xl" />
        </Link>

        {/* 📂 Sidebar Menu Links */}
        <nav className="flex flex-col gap-3 w-full px-4">
          {/* Dashboard */}
          <Link
            to="/dashboard"
            onClick={handleMobileNav}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              isActive('/dashboard')
                ? 'bg-blue-200 dark:bg-blue-900 font-semibold'
                : 'hover:bg-sky-200 dark:hover:bg-blue-700'
            }`}
          >
            <FaTachometerAlt />
            <span className="text-sm font-medium">Tableau</span>
          </Link>

          {/* Add New Product */}
          <Link
            to="/dashboard/add-new-product"
            onClick={handleMobileNav}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              isActive('/dashboard/add-new-product')
                ? 'bg-blue-200 dark:bg-blue-900 font-semibold'
                : 'hover:bg-sky-200 dark:hover:bg-blue-700'
            }`}
          >
            <FaPlusCircle />
            <span className="text-sm font-medium">Ajouter</span>
          </Link>

          {/* Manage Products */}
          <Link
            to="/dashboard/manage-products"
            onClick={handleMobileNav}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              isActive('/dashboard/manage-products')
                ? 'bg-blue-200 dark:bg-blue-900 font-semibold'
                : 'hover:bg-sky-200 dark:hover:bg-blue-700'
            }`}
          >
            <MdProductionQuantityLimits />
            <span className="text-sm font-medium">Produits</span>
          </Link>

          {/* Manage Orders */}
          <Link
            to="/dashboard/manage-orders"
            onClick={handleMobileNav}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              isActive('/dashboard/manage-orders')
                ? 'bg-blue-200 dark:bg-blue-900 font-semibold'
                : 'hover:bg-sky-200 dark:hover:bg-blue-700'
            }`}
          >
            <FaClipboardList />
            <span className="text-sm font-medium">Commandes</span>
          </Link>

          {/* 🔒 Logout */}
          <button
            onClick={() => {
              handleLogout();
              handleMobileNav();
            }}
            className="flex items-center gap-3 px-4 py-2 mt-auto rounded-lg hover:bg-red-100 dark:hover:bg-red-600 transition-colors text-red-500 dark:text-red-300 hover:text-red-700"
          >
            <FaSignOutAlt />
            <span className="text-sm font-medium">Déconnexion</span>
          </button>
        </nav>
      </aside>

      {/* 📱 Main Content Area */}
      <div className="flex-1 w-full flex flex-col md:ml-56">
        {/* ☰ Sidebar Toggle for Mobile */}
        <div className="md:hidden p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-blue-600 text-white p-2 rounded shadow"
          >
            <FaBars />
          </button>
        </div>

        {/* 🧾 Header */}
        <header className="w-full bg-white dark:bg-gray-800 shadow px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            Tableau de Bord
          </h1>

          {/* ➕ Header Action Buttons */}
          <div className="flex flex-col md:flex-row w-full gap-3 items-center md:justify-end">
            {/* Add Product Button */}
            <Link to="/dashboard/add-new-product">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-full shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <FaPlusCircle className="text-base" />
                Ajouter
              </button>
            </Link>

            {/* Manage Products Button */}
            <Link to="/dashboard/manage-products">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-full shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                <FaTools className="text-base" />
                Gérer
              </button>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-full shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <FaSignOutAlt className="text-base" />
              Déconnexion
            </button>
          </div>
        </header>

        {/* 🧾 Main Dashboard Content (child route will appear here) */}
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 transition-all">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
