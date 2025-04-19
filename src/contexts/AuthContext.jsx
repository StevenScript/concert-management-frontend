import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // ← use axios here for login/register
import api from "../api/apiClient"; // ← still use your axios instance for the rest

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user?.token) {
      api.defaults.headers.common.Authorization = `Bearer ${user.token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [user]);

  const saveUser = (u) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    delete api.defaults.headers.common.Authorization;
  };

  const login = async (username, password) => {
    // ← use axios.post so your tests' `jest.mock("axios")` kicks in
    const { data } = await axios.post("/api/login", { username, password });
    // data may be { user: {...}, token } or { username, role, token }
    const userObj = data.user
      ? { ...data.user, token: data.token }
      : { username: data.username, role: data.role, token: data.token };
    saveUser(userObj);
  };

  const register = async (username, email, password, role) => {
    const { data } = await axios.post("/api/register", {
      username,
      email,
      password,
      role,
    });
    const userObj = data.user
      ? { ...data.user, token: data.token }
      : { username: data.username, role: data.role, token: data.token };
    saveUser(userObj);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout: clearUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
