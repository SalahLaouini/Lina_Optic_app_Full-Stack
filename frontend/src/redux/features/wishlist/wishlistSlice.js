import { createSlice } from "@reduxjs/toolkit";

// 🧡 Wishlist slice to manage user's favorite products
const wishlistSlice = createSlice({
  name: "wishlist",

  // 🌟 Initial state: an empty wishlist
  initialState: {
    wishlistItems: [],
  },

  // 📦 Reducers to handle wishlist actions
  reducers: {
    // ➕ Add a product to the wishlist (only if not already present)
    addToWishlist: (state, action) => {
      const exists = state.wishlistItems.find(
        (item) => item._id === action.payload._id
      );
      if (!exists) {
        state.wishlistItems.push(action.payload);
      }
    },

    // ❌ Remove a product from the wishlist by ID
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

// 🚀 Export actions and reducer
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
