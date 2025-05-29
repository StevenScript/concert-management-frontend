// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/apiClient";
import { loginUser, registerUser } from "../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // load from localStorage
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

  // keep axios in sync
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [user]);

  // helper to persist everything
  const saveAuth = ({ user, accessToken, refreshToken }) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  };

  // clear on logout
  const clearAuth = () => {
    setUser(null);
    localStorage.clear();
    delete api.defaults.headers.common.Authorization;
  };

  // login → call API, store tokens + user
  const login = async (username, password) => {
    const { accessToken, refreshToken, user } = await loginUser({
      username,
      password,
    });
    saveAuth({ user, accessToken, refreshToken });
  };

  // register → same shape
  const register = async (username, email, password, role) => {
    const { accessToken, refreshToken, user } = await registerUser({
      username,
      email,
      password,
      role,
    });
    saveAuth({ user, accessToken, refreshToken });
  };

  // logout
  const logout = clearAuth;

  // manual refresh helper (optional)
  const refresh = async () => {
    const rt = localStorage.getItem("refreshToken");
    if (!rt) throw new Error("No refresh token");
    const { accessToken, refreshToken: newRefresh } = (
      await api.post("/api/refresh", { refreshToken: rt })
    ).data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefresh);
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    return accessToken;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
