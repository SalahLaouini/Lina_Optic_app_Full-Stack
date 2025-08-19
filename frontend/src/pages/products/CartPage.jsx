import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl"; // 🖼️ Utility to get full image URL
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../redux/features/cart/cartSlice"; // 🛒 Redux actions for cart
import Swal from "sweetalert2"; // 🔔 SweetAlert for stock warning

const CartPage = () => {
  // 🛒 Get cart items from Redux state
  const cartItems = useSelector((state) => state.cart.cartItems);

  // 🔁 Dispatch function for Redux actions
  const dispatch = useDispatch();

  // 💰 Calculate total price of all items in the cart
  const totalPrice = cartItems
    .reduce((acc, item) => acc + (item.newPrice || 0) * (item.quantity || 0), 0)
    .toFixed(2);

  // ❌ Remove a specific product from cart
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  // 🗑️ Clear the entire cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // 🔁 Handle quantity change with stock validation
  const handleQuantityChange = (product, quantity) => {
    const maxStock = product.color?.stock ?? 0;

    // ❗ Prevent setting quantity beyond available stock
    if (quantity > maxStock) {
      Swal.fire({
        icon: "warning",
        title: "Stock insuffisant",
        text: `Quantité maximale disponible: ${maxStock}`,
        confirmButtonColor: "#1c3b58",
      });
      return;
    }

    // ✅ Update quantity if valid
    if (quantity > 0) {
      dispatch(
        updateQuantity({
          _id: product._id,
          color: product.color,
          quantity,
        })
      );
    }
  };


   return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#f0f6fc] py-10 px-4 sm:px-10">
      <div className="max-w-5xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-[#c4d4e3]">

        {/* ✅ Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-[#1c3b58] text-center sm:text-left">
            Panier
          </h2>

          {/* 🧹 Clear Cart Button */}
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition font-medium"
            >
              Vider le panier
            </button>
          )}
        </div>

        {/* 🛒 Cart Items Section */}
        {cartItems.length > 0 ? (
          <div className="space-y-6">
            {cartItems.map((product) => (
              <div
                key={`${product._id}-${product.color?.colorName?.en}`}
                className="group flex flex-col md:flex-row gap-4 bg-[#f8fafc] border border-[#cddfea] p-4 rounded-xl shadow-sm hover:shadow-md transition w-full"
              >
                {/* 📸 Product Image */}
                <div className="w-28 h-28 md:w-32 md:h-32 flex-shrink-0 rounded-xl bg-white border border-[#a3bddb] shadow grid place-items-center overflow-hidden">
  <img
    src={getImgUrl(product.color?.image || product.coverImage)}
    alt={product.title || "Produit"}
    loading="lazy"
    className="max-w-full max-h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
  />
</div>

                {/* 📄 Product Details */}
                <div className="flex-1 space-y-2">
                  {/* 🧾 Title & Price */}
                  <div className="flex justify-between items-start md:items-center gap-2">
                    <h3 className="text-lg font-semibold text-[#1c3b58]">
                      <a
                        href={`/products/${product._id}`}
                        className="hover:underline hover:text-[#4f77a7] transition"
                      >
                        {product.title || "Produit inconnu"}
                      </a>
                    </h3>
                    <p className="text-[#4f77a7] font-semibold text-lg">
                      {(product.newPrice * product.quantity || 0).toFixed(2)} TND
                    </p>
                  </div>

                  <p className="text-sm text-gray-600">
                    Catégorie: {product.mainCategory || "inconnue"}
                  </p>

                  <p className="text-sm text-gray-600">
                    Couleur: {product.color?.colorName?.fr || "Original"}
                  </p>

                  {/* 🔢 Quantity Input & ❌ Remove Button */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mt-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">
                        Qté:
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) =>
                          handleQuantityChange(product, Number(e.target.value))
                        }
                        className="w-20 sm:w-16 border rounded-md px-2 py-1 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f77a7] transition"
                      />
                    </div>

                    <button
                      onClick={() => handleRemoveFromCart(product)}
                      className="px-4 py-1.5 rounded-lg text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 transition text-sm font-medium"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // 🛑 If cart is empty
          <p className="text-center text-gray-500 text-lg mt-8">
            Votre panier est vide.
          </p>
        )}

        {/* 📦 Order Summary Section */}
        {cartItems.length > 0 && (
          <div className="border-t pt-6 mt-10 space-y-4 px-2 sm:px-0">
            <div className="flex justify-between text-lg font-semibold">
              <p>Sous-total</p>
              <p className="text-[#1c3b58]">{totalPrice} TND</p>
            </div>

            <Link
              to="/checkout"
              className="block w-full text-center bg-[#1c3b58] text-white py-3 rounded-lg font-semibold hover:bg-[#285d88] transition"
            >
              Passer à la caisse
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
