// src/redux/features/wishlist/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "linaoptic_wishlist_v1";

// Helper: read from localStorage safely
const loadWishlist = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// Helper: write to localStorage safely
const saveWishlist = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore write errors */
  }
};

// 🧡 Wishlist slice to manage user's favorite products
const wishlistSlice = createSlice({
  name: "wishlist",

  // 🌟 Initial state loads from localStorage
  initialState: {
    wishlistItems: loadWishlist(),
  },

  reducers: {
    // ➕ Add a product to the wishlist (only if not already present)
    addToWishlist: (state, action) => {
      const exists = state.wishlistItems.find(
        (item) => item._id === action.payload._id
      );
      if (!exists) {
        state.wishlistItems.push(action.payload);
        saveWishlist(state.wishlistItems);
      }
    },

    // ❌ Remove a product from the wishlist by ID
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== action.payload
      );
      saveWishlist(state.wishlistItems);
    },

    // 🔁 Optional: rehydrate manually if you ever need to
    setWishlistFromStorage: (state, action) => {
      state.wishlistItems = Array.isArray(action.payload) ? action.payload : [];
      saveWishlist(state.wishlistItems);
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishlistFromStorage } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
