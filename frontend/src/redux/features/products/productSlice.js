// 🛒 Redux slice for managing product data and UI-driven refetching
import { createSlice } from "@reduxjs/toolkit";

// 🧱 Initial state
const initialState = {
  products: [],         // List of all products in the app
  shouldRefetch: false, // Flag to trigger refetch (used by UI after add/edit/delete)
};

// 🧩 Slice definition
const productSlice = createSlice({
  name: "product",       // 🔖 Slice name
  initialState,
  reducers: {
    // 📥 Set the list of products (e.g., after fetching from API)
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    // 🔁 Trigger refetch (used to refresh product list after changes)
    triggerRefetch: (state) => {
      state.shouldRefetch = true;
    },

    // 🔄 Reset the refetch flag
    resetRefetch: (state) => {
      state.shouldRefetch = false;
    },
  },
});

// 🚀 Export actions and reducer
export const { setProducts, triggerRefetch, resetRefetch } = productSlice.actions;
export default productSlice.reducer;
