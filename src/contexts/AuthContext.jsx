import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // used only for login/register hits
import api from "../api/apiClient"; // configured axios instance for the rest

const AuthContext = createContext();

/** Provides authentication state and auth helpers to the tree. */
export function AuthProvider({ children }) {
  /* ---------- state ---------- */
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  /* ---------- sync Authorization header ---------- */
  useEffect(() => {
    if (user?.token) {
      api.defaults.headers.common.Authorization = `Bearer ${user.token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [user]);

  /* ---------- helpers ---------- */
  const saveUser = (u) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    delete api.defaults.headers.common.Authorization;
  };

  /* ---------- login ---------- */
  const login = async (username, password) => {
    const { data } = await axios.post("http://localhost:8080/api/login", {
      username,
      password,
    });

    // data = { username, email, role, token }
    const userObj = {
      id: data.id,
      username: data.username,
      email: data.email,
      role: data.role,
      token: data.token,
    };
    saveUser(userObj);
  };

  /* ---------- register ---------- */
  const register = async (username, email, password, role) => {
    const { data } = await axios.post("http://localhost:8080/api/register", {
      id: data.id,
      username,
      email,
      password,
      role,
    });

    // data = { username, email, role, token }
    const userObj = {
      id: data.id,
      username: data.username,
      email: data.email,
      role: data.role,
      token: data.token,
    };
    saveUser(userObj);
  };

  /* ---------- context ---------- */
  return (
    <AuthContext.Provider value={{ user, login, register, logout: clearUser }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Hook to access { user, login, register, logout } */
export function useAuth() {
  return useContext(AuthContext);
}
