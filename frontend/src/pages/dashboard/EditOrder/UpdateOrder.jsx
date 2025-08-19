import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from "../../../redux/features/orders/ordersApi"; // ✅ RTK Query hooks for fetching and updating orders
import Swal from "sweetalert2";
import Loading from "../../../components/Loading"; // ⏳ Reusable loading spinner component

const UpdateOrder = () => {
  // 🔎 Get the order ID from the route parameters
  const { id } = useParams();

  // 🔁 Hook to navigate after successful update
  const navigate = useNavigate();

  // 📥 Fetch the specific order by ID using RTK Query
  const {
    data: orderData,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(id);

  // 🔄 Hook for updating order
  const [updateOrder] = useUpdateOrderMutation();

  // 📝 React Hook Form for handling form data
  const { register, handleSubmit, setValue } = useForm();

  // 🧠 Pre-fill the form once order data is fetched
  useEffect(() => {
    if (orderData) {
      setValue("name", orderData.name);
      setValue("email", orderData.email);
      setValue("address", orderData.address);
      setValue("phone", orderData.phone);
      setValue("productIds", orderData.productIds.join(", ")); // 📦 Convert array to comma-separated string
      setValue("totalPrice", orderData.totalPrice);
      setValue("isPaid", orderData.isPaid);
      setValue("isDelivered", orderData.isDelivered);
      setValue("completionPercentage", orderData.completionPercentage);
    }
  }, [orderData, setValue]);

  // 📤 Handle form submission to update the order
  const onSubmit = async (data) => {
    // Convert product IDs string back to an array
    const updatedOrderData = {
      ...data,
      productIds: data.productIds.split(", "),
    };

    try {
      // 🔄 Trigger update request to backend
      await updateOrder({ orderId: id, ...updatedOrderData }).unwrap();

      // ✅ Show success message
      Swal.fire("Success", "Order updated successfully!", "success");

      // 🔁 Redirect to the orders management page
      navigate("/dashboard/manage-orders");
    } catch (error) {
      // ❌ Show error message
      Swal.fire("Error", "Failed to update order. Please try again.", "error");
    }
  };

  // 🔄 Show loading or error messages before form
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-center text-red-500">
        Error fetching order data.
      </div>
    );

  // ✅ Main component UI rendering
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800">
      <h2 className="text-2xl font-bold text-center text-[#A67C52] mb-4">
        Update Order
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 👤 Customer Name */}
        <input
          {...register("name")}
          className="w-full p-2 border rounded"
          placeholder="Customer Name"
          required
        />

        {/* 📧 Customer Email */}
        <input
          {...register("email")}
          type="email"
          className="w-full p-2 border rounded"
          placeholder="Customer Email"
          required
        />

        {/* 🏠 Address */}
        <textarea
          {...register("address")}
          className="w-full p-2 border rounded"
          placeholder="Customer Address"
          required
        />

        {/* 📞 Phone Number */}
        <input
          {...register("phone")}
          type="number"
          className="w-full p-2 border rounded"
          placeholder="Phone Number"
          required
        />

        {/* 🛍️ Product IDs (comma-separated) */}
        <input
          {...register("productIds")}
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Product IDs (comma separated)"
          required
        />

        {/* 💰 Total Price */}
        <input
          {...register("totalPrice")}
          type="number"
          className="w-full p-2 border rounded"
          placeholder="Total Price"
          required
        />

        {/* 💳 Payment Status */}
        <select
          {...register("isPaid")}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Payment Status</option>
          <option value={true}>Paid</option>
          <option value={false}>Not Paid</option>
        </select>

        {/* 📦 Delivery Status */}
        <select
          {...register("isDelivered")}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Delivery Status</option>
          <option value={true}>Delivered</option>
          <option value={false}>Not Delivered</option>
        </select>

        {/* ✅ Completion Percentage */}
        <input
          {...register("completionPercentage")}
          type="number"
          min="0"
          max="100"
          className="w-full p-2 border rounded"
          placeholder="Completion Percentage"
          required
        />

        {/* 🔘 Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-[#A67C52] text-white rounded-md hover:bg-[#8a5d3b] transition"
        >
          Update Order
        </button>
      </form>
    </div>
  );
};

export default UpdateOrder;
