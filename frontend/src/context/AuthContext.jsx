import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext(null);

const getStoredAuth = () => {
  const token = localStorage.getItem("urbankart_token");
  const user = localStorage.getItem("urbankart_user");
  return {
    token: token || "",
    user: user ? JSON.parse(user) : null
  };
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getStoredAuth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!auth.token) return;

    const validateToken = async () => {
      try {
        const { data } = await axiosInstance.get("/auth/me");
        setAuth((prev) => ({ ...prev, user: data.user }));
        localStorage.setItem("urbankart_user", JSON.stringify(data.user));
      } catch {
        localStorage.removeItem("urbankart_token");
        localStorage.removeItem("urbankart_user");
        setAuth({ token: "", user: null });
      }
    };

    validateToken();
  }, [auth.token]);

  const register = async (payload) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/register", payload);
      localStorage.setItem("urbankart_token", data.token);
      localStorage.setItem("urbankart_user", JSON.stringify(data.user));
      setAuth({ token: data.token, user: data.user });
      return data;
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/login", payload);
      localStorage.setItem("urbankart_token", data.token);
      localStorage.setItem("urbankart_user", JSON.stringify(data.user));
      setAuth({ token: data.token, user: data.user });
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("urbankart_token");
    localStorage.removeItem("urbankart_user");
    setAuth({ token: "", user: null });
  };

  const value = useMemo(
    () => ({
      user: auth.user,
      token: auth.token,
      isAuthenticated: Boolean(auth.token),
      loading,
      login,
      register,
      logout
    }),
    [auth, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
