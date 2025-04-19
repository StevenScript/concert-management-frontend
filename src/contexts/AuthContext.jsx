import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/apiClient"; // ← your axios.create() instance

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 1) Hydrate from localStorage (if you’ve already logged in before)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // 2) Any time `user` (and its .token) changes, set the Authorization header
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

  // 3) Login against your Spring Boot `/api/login`
  const login = async (username, password) => {
    const { data } = await api.post("/api/login", { username, password });
    // data === { username, email, role, token }
    const { username: uname, email, role, token } = data;
    const userObj = { username: uname, email, role, token };
    saveUser(userObj);
    // useEffect will wire up api.defaults.Authorization
  };

  // 4) Register against `/api/register`
  const register = async (username, email, password, role) => {
    const { data } = await api.post("/api/register", {
      username,
      email,
      password,
      role,
    });
    const { username: uname, email: em, role: ro, token } = data;
    const userObj = { username: uname, email: em, role: ro, token };
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
