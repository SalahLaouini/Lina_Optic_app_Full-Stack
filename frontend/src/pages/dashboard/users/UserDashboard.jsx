import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useGetOrderByEmailQuery } from "../../../redux/features/orders/ordersApi";
import { getImgUrl } from "../../../utils/getImgUrl";
import { auth } from "../../../firebase/firebase.config";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../../../components/Loading";
import { MdEmail } from "react-icons/md"; 
import "../../../Styles/StylesUserDashboard.css";

const UserDashboard = () => {
  const { currentUser } = useAuth();

  // 🚀 Fetch user-specific orders using their email
  const { data: orders = [], isLoading } = useGetOrderByEmailQuery(currentUser?.email);

  const customerEmail = currentUser?.email || "Email inconnu";


  // 🧾 Extract customer name from order or fallback to user's name
  const customerName =
    orders.length > 0
      ? orders[0].name
      : currentUser?.username || "Client fidèle";

  // 🔽 Dropdown state and ref for click-outside logic
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const providerId = auth.currentUser?.providerData[0]?.providerId;


  // ❌ Close dropdown if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 🌀 Show loading spinner while data is being fetched
  if (isLoading) return <LoadingSpinner />;



 return (
  <div className="user-dashboard">
    {/* Helmet sets the page title */}
    <Helmet>
      <title>Tableau de bord</title>
    </Helmet>

    <div className="dashboard-content">
      {/* === Header with avatar and dropdown menu === */}
      <div className="dashboard-header-bar">
        {/* User info section with avatar and name */}
        <div className="user-info-left">
  <div className="user-avatar-circle">
    {customerName.charAt(0).toUpperCase()}
  </div>
  <div className="user-details">
    <span className="user-full-name">{customerName}</span>
    <span className="user-email">
  <MdEmail className="email-icon" /> {currentUser?.email}
</span>
  </div>
</div>

        
   


        {/* Dropdown menu toggle and content */}
       <div
  className={`dashboard-dropdown-wrapper ${isDropdownOpen ? "open" : ""}`}
  ref={dropdownRef}
>
  <button
    className="dashboard-dropdown-toggle"
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
  >
    Menu <span className="arrow">&#9662;</span>
  </button>

  <ul className="dashboard-dropdown-menu">
    <li>
      <a href="/user-dashboard">Tableau de bord</a>
    </li>
    <li>
      <a href="/orders">Mes commandes</a>
    </li>
    {auth.currentUser?.providerData[0]?.providerId === "password" && (
      <li>
        <a href="/change-password">Changer le mot de passe</a>
      </li>
    )}
    <li>
      <button onClick={() => window.location.href = "/login"}>
        Déconnexion
      </button>
    </li>
  </ul>
</div>

      </div>

      {/* Welcome title */}
      <h1 className="dashboard-title">Bienvenue, {customerName}</h1>

      {/* Subtitle showing account owner */}
      <p className="dashboard-subtitle">
        Compte de : <strong>{customerName}</strong>
      </p>

      {/* === Orders Section === */}
      <div className="orders-section">
        <h2 className="orders-title">
          Vos commandes
          <span className="orders-underline"></span>
        </h2>

        {/* If user has orders, show list of order cards */}
        {orders.length > 0 ? (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                {/* Order header with ID and date */}
                <div className="order-header">
                  <p className="order-id">
                    <strong>ID commande :</strong>{" "}
                    <span dir="ltr">{order._id.slice(0, 8)}...</span>
                  </p>
                  <p className="order-date">
                    {new Date(order?.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Total price */}
                <p className="order-total">
                  Total : <span className="highlight">{order.totalPrice}TND</span>
                </p>

                {/* Title for list of ordered products */}
                <h3 className="order-products-title">Produits commandés</h3>

                {/* List of product items */}
                <ul className="product-list">
                  {order.products.map((product, index) => {
                    if (!product.productId) return null;

                    const colorName =
                      product.color?.colorName?.fr || "Couleur originale";

                    return (
                      <li
                        key={`${product.productId._id}-${index}`}
                        className="product-item"
                      >
                        {/* Product image */}
                        <img
                          src={
                            product.color?.image
                              ? getImgUrl(product.color.image)
                              : getImgUrl(product.productId.coverImage)
                          }
                          alt={product.productId.title || "Sans titre"}
                          className="product-img"
                        />

                        {/* Product info */}
                        <div className="product-info">
                          <p className="product-title">
                            {product.productId.title || "Sans titre"}
                          </p>
                          <p>Quantité : {product.quantity}</p>
                          <p>Couleur : {colorName}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div> 
            ))}
          </div>
        ) : (
          // If no orders
          <p className="no-orders">Vous n'avez pas encore de commandes.</p>
        )}
      </div>
    </div>
  </div>
);



     };

export default UserDashboard;
