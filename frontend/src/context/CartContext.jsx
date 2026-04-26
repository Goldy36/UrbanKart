import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

const defaultCartState = {
  cart: { items: [] },
  totalAmount: 0,
  totalItems: 0
};

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cartData, setCartData] = useState(defaultCartState);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!isAuthenticated || user?.role !== "buyer") {
      setCartData(defaultCartState);
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/cart");
      setCartData(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated, user?.role]);

  const addToCart = async (productId, quantity = 1) => {
    const { data } = await axiosInstance.post("/cart/add", { productId, quantity });
    setCartData(data);
    return data;
  };

  const updateCartItem = async (productId, quantity) => {
    const { data } = await axiosInstance.put("/cart/update", { productId, quantity });
    setCartData(data);
    return data;
  };

  const removeCartItem = async (productId) => {
    const { data } = await axiosInstance.delete(`/cart/remove/${productId}`);
    setCartData(data);
    return data;
  };

  const clearCart = async () => {
    const { data } = await axiosInstance.delete("/cart/clear");
    setCartData(data);
    return data;
  };

  const value = useMemo(
    () => ({
      cartData,
      loading,
      fetchCart,
      addToCart,
      updateCartItem,
      removeCartItem,
      clearCart
    }),
    [cartData, loading]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
