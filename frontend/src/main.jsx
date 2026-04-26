import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { DiscoveryProvider } from "./context/DiscoveryContext";
import { ThemeProvider } from "./context/ThemeContext";
import runRuntimeChecks from "./config/runtimeChecks";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

runRuntimeChecks();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <DiscoveryProvider>
            <WishlistProvider>
              <CartProvider>
                <App />
                <ToastContainer position="top-right" autoClose={2500} />
              </CartProvider>
            </WishlistProvider>
          </DiscoveryProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
