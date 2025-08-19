// ✅ Entry point of the React application

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// ✅ Main App component
import App from './App.jsx';

// ✅ Global CSS styles
import './index.css';

// ✅ React Router for route management
import { RouterProvider } from 'react-router-dom';
import router from './routers/router.jsx'; // 🚦 Custom route config

// ✅ SweetAlert2 for alert modals
import 'sweetalert2/dist/sweetalert2.js';

// ✅ Bootstrap for additional styling support
import 'bootstrap/dist/css/bootstrap.min.css';

// ✅ Multilingual translation setup
import './i18n.js';

// ✅ Redux store for state management
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js';

// ✅ For managing SEO/meta tags
import { HelmetProvider } from 'react-helmet-async';

// ✅ Custom Language context (used for UI language settings)
import { LanguageProvider } from "./contextLanguage/LanguageContext";

// ✅ To persist Redux state between refreshes
import { PersistGate } from 'redux-persist/integration/react';

// ✅ Render the React app inside the root DOM node
createRoot(document.getElementById('root')).render(
  <Provider store={store}> {/* 🔄 Redux state provider */}
    <PersistGate loading={null} persistor={persistor}> {/* 💾 Enables persisted state */}
      <HelmetProvider> {/* 🧢 Provides dynamic head (title/meta) support */}
        <LanguageProvider> {/* 🌐 Manages app language preferences */}
          <RouterProvider router={router} /> {/* 🧭 Handles route navigation */}
        </LanguageProvider>
      </HelmetProvider>
    </PersistGate>
  </Provider>
);
