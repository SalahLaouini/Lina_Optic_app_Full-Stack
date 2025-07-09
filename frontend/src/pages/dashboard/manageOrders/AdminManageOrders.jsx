import React, { useState } from "react";
import {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from "../../../redux/features/orders/ordersApi.js";
import Swal from "sweetalert2";
import { getImgUrl } from "../../../utils/getImgUrl";
import "../../../Styles/StylesAdminManageOrders.css";
import { useTranslation } from "react-i18next";

const AdminManageOrders = () => {
  // 🌐 Setup translations
  const { i18n } = useTranslation();

  // 📦 Fetch all orders with auto-polling and refetching settings
  const { data: orders = [], isLoading, error, refetch } = useGetAllOrdersQuery(undefined, {
    pollingInterval: 5000,               // Refresh every 5s
    refetchOnMountOrArgChange: true,    // Refresh on mount or arg change
    refetchOnReconnect: true            // Refresh on network reconnect
  });

  // ⚙️ RTK Query mutations for update and delete operations
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  // ✏️ Track which order is currently being edited
  const [editingOrder, setEditingOrder] = useState(null);

  // 📋 Store edited values (isPaid, isDelivered)
  const [updatedValues, setUpdatedValues] = useState({});

  // 🔍 Search input state for filtering orders by their ID
const [searchQuery, setSearchQuery] = useState("");

  // ✅ Handle saving an edited order
  const handleEdit = async (orderId, order) => {
    try {
      await updateOrder({
        orderId,
        isPaid: updatedValues.isPaid !== undefined ? updatedValues.isPaid : order.isPaid,
        isDelivered: updatedValues.isDelivered !== undefined ? updatedValues.isDelivered : order.isDelivered,
      }).unwrap();

      Swal.fire("Succès", "Commande mise à jour avec succès !", "success");
      setEditingOrder(null);         // Reset edit mode
      setUpdatedValues({});          // Clear changes
      refetch();                     // Refetch updated data
    } catch (error) {
      Swal.fire("Erreur", "Échec de la mise à jour de la commande. Veuillez réessayer.", "error");
    }
  };

  // 📝 Handle dropdown changes for "isPaid" or "isDelivered"
  const handleChange = (field, value) => {
    setUpdatedValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 🔓 Enable editing mode for a specific order
  const startEditingOrder = (order) => {
    setEditingOrder(order._id);
    setUpdatedValues({
      isPaid: order.isPaid,
      isDelivered: order.isDelivered,
    });
  };

  // ❌ Handle deleting an order with confirmation
  const handleDelete = async (orderId) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimez-le !",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteOrder({ orderId }).unwrap();
          Swal.fire("Supprimé !", "La commande a été supprimée.", "success");
          refetch(); // Refresh the orders list
        } catch (error) {
          Swal.fire("Erreur", "Échec de la suppression de la commande. Veuillez réessayer.", "error");
        }
      }
    });
  };

  // ⏳ Show loading message
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">Chargement des commandes...</p>
      </div>
    );
  }

  // 🔎 Filter orders to only show those matching the search query (case-insensitive)
const filteredOrders = orders.filter((order) =>
  order._id.toLowerCase().includes(searchQuery.toLowerCase())
);

  // ❗ Show error message if fetch fails
  if (error) return <p style={{ color: "red" }}>{error.message}</p>;



 return (
  // Section wrapper with padding and background
  <section className="py-1 bg-blueGray-50">
    <div className="w-full max-w-7xl mx-auto px-6 mt-24">
    
      {/* Main container for the orders table */}
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      
       {/* 🧾 Header with search bar */}
<div className="rounded-t px-4 py-3 border-b bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  {/* Title */}
  <h3 className="font-semibold text-base text-blueGray-700">
    Toutes les Commandes
  </h3>

  {/* 🔍 Search input for Order ID */}
  <input
    type="text"
    placeholder="Rechercher par ID Commande..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

        {/* Table content scrollable */}
        <div className="block w-full overflow-x-auto">
          <table className="items-center bg-transparent w-full border-collapse">
            
            {/* Table header row */}
            <thead>
              <tr className="border-b border-gray-300 text-left text-md font-semibold text-gray-800">
                <th className="px-6 py-3 border">#</th>
                <th className="px-6 py-3 border">ID Commande</th>
                <th className="px-6 py-3 border">Produits</th>
                <th className="px-6 py-3 border">Client</th>
                <th className="px-6 py-3 border">Mail</th>
                <th className="px-6 py-3 border">Téléphone</th>
                <th className="px-6 py-3 border">Adresse</th>
                <th className="px-6 py-3 border">Date Création</th>
                <th className="px-6 py-3 border">Prix Total</th>
                <th className="px-6 py-3 border">Payé</th>
                <th className="px-6 py-3 border">Livré</th>
                <th className="px-6 py-3 border">Actions</th>
              </tr>
            </thead>

            {/* Table body containing order rows */}
            <tbody className="text-sm font-medium text-gray-600">
              {filteredOrders.map((order, index) => (
                <tr key={`${order._id}-${index}`} className="border-b hover:bg-gray-100 transition">
                  
                  {/* Order number */}
                  <td className="px-6 py-3 border">{index + 1}</td>
                  
                  {/* Order ID (truncated) */}
                  <td className="px-6 py-3 border">{order._id.slice(0, 8)}...</td>
                  
                  {/* Products list for this order */}
                  <td className="px-6 py-3 border">
                    {order.products.map((prod, idx) => (
                      <div key={`${prod.productId?._id || prod.productId}-${idx}`} className="mb-4">

                        {/* Product title */}
                        <div>
                          <strong>Produit:</strong> {prod.productId?.title || "N/A"}
                        </div>

                        {/* Product ID */}
                        <div>
                          <strong>ID:</strong> {prod.productId?._id?.slice(0, 8) || "N/A"}
                        </div>

                        {/* Quantity ordered */}
                        <div>
                          <strong>Qté:</strong> {prod.quantity}
                        </div>

                        {/* Product color name and image */}
                        {prod.color && (
                          <div className="mt-1">
                            <strong>Couleur:</strong>{" "}
                            {typeof prod.color.colorName === "object"
                              ? prod.color.colorName[i18n.language] ||
                                prod.color.colorName.en ||
                                "Original"
                              : prod.color.colorName || "Original"}

                            <div className="mt-2">
                              {prod.color.image ? (
                                <img
                                  src={getImgUrl(prod.color.image)}
                                  alt={
                                    typeof prod.color.colorName === "object"
                                      ? prod.color.colorName[i18n.language] ||
                                        prod.color.colorName.en ||
                                        "Couleur"
                                      : prod.color.colorName
                                  }
                                  className="w-16 h-16 rounded border"
                                  style={{ objectFit: "cover" }}
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-16 h-16 bg-gray-200 rounded border flex items-center justify-center">
                                  <span className="text-xs text-gray-500">Pas d'image</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </td>

                  {/* Client name */}
                  <td className="px-6 py-3 border">{order.name}</td>

                  {/* Client email */}
                  <td className="px-6 py-3 border">{order.email}</td>

                  {/* Client phone number */}
                  <td className="px-6 py-3 border">{order.phone}</td>

                  {/* Address */}
                  <td className="px-6 py-3 border">
                    {order.address.city}, {order.address.street}
                  </td>

                  {/* Creation date */}
                  <td className="px-6 py-3 border">
                    {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>

                  {/* Total price */}
                  <td className="px-6 py-3 border">{order.totalPrice} TND</td>

                  {/* Dropdown: Paid status */}
                  <td className="px-4 py-3 border">
                    <div className="min-w-[90px]">
                      <select
                        value={editingOrder === order._id ? updatedValues.isPaid ?? order.isPaid : order.isPaid}
                        onChange={(e) => handleChange("isPaid", e.target.value === "true")}
                        disabled={editingOrder !== order._id}
                        className="w-full px-2 py-1 rounded-md border text-xs sm:text-sm"
                      >
                        <option value="true">Oui</option>
                        <option value="false">Non</option>
                      </select>
                    </div>
                  </td>

                  {/* Dropdown: Delivered status */}
                  <td className="px-4 py-3 border">
                    <div className="min-w-[90px]">
                      <select
                        value={editingOrder === order._id ? updatedValues.isDelivered ?? order.isDelivered : order.isDelivered}
                        onChange={(e) => handleChange("isDelivered", e.target.value === "true")}
                        disabled={editingOrder !== order._id}
                        className="w-full px-2 py-1 rounded-md border text-xs sm:text-sm"
                      >
                        <option value="true">Oui</option>
                        <option value="false">Non</option>
                      </select>
                    </div>
                  </td>

                  {/* Action buttons: Edit / Save / Delete */}
                  <td className="px-6 py-3 border">
                    <div className="flex justify-center items-center gap-4">
                      {editingOrder !== order._id ? (
                        <button
                          onClick={() => startEditingOrder(order)}
                          className="bg-yellow-500 py-2 px-4 min-w-[100px] rounded-full text-white text-sm hover:bg-yellow-600 transition"
                        >
                          Modifier
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(order._id, order)}
                          className="bg-blue-500 py-2 px-4 min-w-[100px] rounded-full text-white text-sm hover:bg-blue-600 transition"
                        >
                          Enregistrer
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="bg-red-500 py-2 px-4 min-w-[100px] rounded-full text-white text-sm hover:bg-red-600 transition"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  </section>
);



};

export default AdminManageOrders;
