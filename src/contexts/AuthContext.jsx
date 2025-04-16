import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const saveUser = (u) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const login = async (username, password) => {
    const { data } = await axios.post("http://your-backend/api/login", {
      username,
      password,
    });
    // data: { user: {...}, token: "..." }
    const userWithToken = { ...data.user, token: data.token };
    axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    saveUser(userWithToken);
  };

  const register = async (username, password) => {
    const { data } = await axios.post("http://your-backend/api/register", {
      username,
      password,
    });
    const userWithToken = { ...data.user, token: data.token };
    axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    saveUser(userWithToken);
  };

  const logout = () => {
    delete axios.defaults.headers.common.Authorization;
    clearUser();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
