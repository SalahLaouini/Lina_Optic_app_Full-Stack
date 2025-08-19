import React from "react";
import AdminManageOrders from "../manageOrders/AdminManageOrders.jsx";
import AdminOrdersProgress from "./AdminOrdersProgress.jsx";
import "../../../Styles/StylesAdminManageOrders.css"; // ✅ add your css here

const ManageOrders = () => {
  return (
    <div className="manage-orders-wrapper">
      {/* Manage Orders Section */}
      <section className="orders-section">
        <h2 className="orders-title">Gérer les commandes</h2>
        <AdminManageOrders />
      </section>

      {/* Orders Progress Section */}
      <section className="orders-section">
        <h2 className="orders-title">Progression des ordres</h2>
        <AdminOrdersProgress />
      </section>
    </div>
  );
};

export default ManageOrders;

