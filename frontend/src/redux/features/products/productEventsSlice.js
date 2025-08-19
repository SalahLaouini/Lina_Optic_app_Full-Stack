// 🛠️ Redux slice to manage product-related events such as triggering refetches
import { createSlice } from "@reduxjs/toolkit";

// 🧱 Initial state
const initialState = {
  shouldRefetch: false, // Flag to indicate if products should be refetched
};

// 🧩 Slice definition
const productEventsSlice = createSlice({
  name: "productEvents", // 🔖 Slice name
  initialState,
  reducers: {
    // 🔁 Trigger product refetch (used after add/update/delete operations)
    triggerRefetch: (state) => {
      state.shouldRefetch = true;
    },

    // 🔄 Reset the refetch trigger flag
    resetTrigger: (state) => {
      state.shouldRefetch = false;
    },
  },
});

// 🚀 Export actions and reducer
export const { triggerRefetch, resetTrigger } = productEventsSlice.actions;
export default productEventsSlice.reducer;
