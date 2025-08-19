// src/redux/store.js

// 🔧 Redux Toolkit core utilities
import { configureStore, combineReducers } from '@reduxjs/toolkit';

// 🧩 Slice reducers
import cartReducer from './features/cart/cartSlice';
import productEventsReducer from './features/products/productEventsSlice';
import wishlistReducer from './features/wishlist/wishlistSlice';

// 🔁 API slices (RTK Query)
import productsApi from './features/products/productsApi';
import ordersApi from './features/orders/ordersApi';

// 💾 Redux Persist utilities
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// 🔐 Special action types to ignore in middleware checks
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// 💾 Configuration for persisting the cart slice only
const cartPersistConfig = {
  key: 'cart',
  storage,
};

// 🧠 Root reducer combining all feature slices and API reducers
const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer), // 🛒 Persisted cart state
  wishlist: wishlistReducer,                             // 💖 Wishlist (not persisted)
  productEvents: productEventsReducer,                   // 🔁 Product refresh triggers
  [productsApi.reducerPath]: productsApi.reducer,        // 📦 Products API (RTK Query)
  [ordersApi.reducerPath]: ordersApi.reducer,            // 📬 Orders API (RTK Query)
});

// 🏗️ Create the Redux store with middleware and serializable checks
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // 🚫 Skip non-serializable checks for persist actions
      },
    }).concat(productsApi.middleware, ordersApi.middleware), // 🔁 Include RTK Query middlewares
});

// 💾 Persistor to use with PersistGate in index.js (for rehydrating state)
export const persistor = persistStore(store);
