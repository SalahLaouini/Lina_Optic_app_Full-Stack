import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateOrderMutation } from "../../../redux/features/orders/ordersApi"; // 🧩 RTK Query mutation hook
import Swal from "sweetalert2"; // 🔔 For success and error popups

const AddOrder = () => {
  // 📝 useForm hook for handling form state
  const { register, handleSubmit, reset } = useForm();

  // 🔄 Mutation function to create a new order
  const [createOrder] = useCreateOrderMutation();

  // 📤 Submit handler for the form
  const onSubmit = async (data) => {
    try {
      // 🚀 Send order data to the backend
      await createOrder(data).unwrap();

      // ✅ Show success alert and reset form
      Swal.fire("Success!", "Order added successfully!", "success");
      reset();
    } catch (error) {
      // ❌ Show error alert if submission fails
      Swal.fire("Error!", "Failed to add order.", "error");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800">
      <h2 className="text-2xl font-bold text-center text-[#A67C52] mb-4">Add New Order</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Customer Name */}
        <input
          {...register("name")}
          className="w-full p-2 border rounded"
          placeholder="Customer Name"
          required
        />

        {/* Customer Email */}
        <input
          {...register("email")}
          type="email"
          className="w-full p-2 border rounded"
          placeholder="Customer Email"
          required
        />

        {/* Address */}
        <textarea
          {...register("address")}
          className="w-full p-2 border rounded"
          placeholder="Customer Address"
          required
        />

        {/* Phone Number */}
        <input
          {...register("phone")}
          type="number"
          className="w-full p-2 border rounded"
          placeholder="Phone Number"
          required
        />

        {/* Product IDs - comma separated */}
        <input
          {...register("productIds")}
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Product IDs (comma separated)"
          required
        />

        {/* Total Price */}
        <input
          {...register("totalPrice")}
          type="number"
          className="w-full p-2 border rounded"
          placeholder="Total Price"
          required
        />

        {/* Payment Status */}
        <select {...register("isPaid")} className="w-full p-2 border rounded" required>
          <option value="">Select Payment Status</option>
          <option value={true}>Paid</option>
          <option value={false}>Not Paid</option>
        </select>

        {/* Delivery Status */}
        <select {...register("isDelivered")} className="w-full p-2 border rounded" required>
          <option value="">Select Delivery Status</option>
          <option value={true}>Delivered</option>
          <option value={false}>Not Delivered</option>
        </select>

        {/* Completion Percentage */}
        <input
          {...register("completionPercentage")}
          type="number"
          min="0"
          max="100"
          className="w-full p-2 border rounded"
          placeholder="Completion Percentage"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-[#A67C52] text-white rounded-md hover:bg-[#8a5d3b] transition"
        >
          Add Order
        </button>
      </form>
    </div>
  );
};

export default AddOrder;
