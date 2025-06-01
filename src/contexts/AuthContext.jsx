// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // for login/register/refresh
import api from "../api/apiClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  // Whenever "user" changes, ensure api has the correct Authorization header
  useEffect(() => {
    const token = user?.accessToken;
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [user]);

  // Helper to save everything (user info + tokens) to state + localStorage
  const saveAll = (
    { id, username, email, role },
    { accessToken, refreshToken }
  ) => {
    const u = { id, username, email, role, accessToken, refreshToken };
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    delete api.defaults.headers.common.Authorization;
  };

  // Call this to get a fresh access token
  const refresh = async () => {
    const rt = localStorage.getItem("refreshToken");
    const base = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
    const { data } = await axios.post(`${base}/api/refresh`, {
      refreshToken: rt,
    });
    const { accessToken: newA, refreshToken: newR } = data;
    const { id, username, email, role } = user;
    saveAll(
      { id, username, email, role },
      { accessToken: newA, refreshToken: newR }
    );
    return newA;
  };

  // Set up interceptors once (depends on "user")
  useEffect(() => {
    const reqI = api.interceptors.request.use((cfg) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        cfg.headers = { ...cfg.headers, Authorization: `Bearer ${token}` };
      }
      return cfg;
    });

    const resI = api.interceptors.response.use(
      (res) => res,
      async (err) => {
        const original = err.config;
        if (
          err.response?.status === 401 &&
          !original._retry &&
          !original.url.includes("/api/refresh")
        ) {
          original._retry = true;
          try {
            const newToken = await refresh();
            original.headers.Authorization = `Bearer ${newToken}`;
            return api.request(original);
          } catch {
            logout();
            return Promise.reject(err);
          }
        }
        return Promise.reject(err);
      }
    );

    return () => {
      api.interceptors.request.eject(reqI);
      api.interceptors.response.eject(resI);
    };
  }, [user]);

  const login = async (username, password) => {
    const base = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
    const { data } = await axios.post(`${base}/api/login`, {
      username,
      password,
    });
    const { id, username: u, email, role, accessToken, refreshToken } = data;
    saveAll({ id, username: u, email, role }, { accessToken, refreshToken });
  };

  const register = async (username, email, password, role) => {
    const base = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
    const { data } = await axios.post(`${base}/api/register`, {
      username,
      email,
      password,
      role,
    });
    const {
      id,
      username: u,
      email: e,
      role: r,
      accessToken,
      refreshToken,
    } = data;
    saveAll(
      { id, username: u, email: e, role: r },
      { accessToken, refreshToken }
    );
  };

  return (
    <AuthContext.Provider value={{ user, login, register, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
