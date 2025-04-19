import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // ← use axios here for login/register
import api from "../api/apiClient"; // ← still use your axios instance for the rest

const AuthContext = createContext();

/**
 * Provides authentication state and methods (login, register, logout)
 * to the component tree.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Sync Axios default Authorization header with current user token
  useEffect(() => {
    if (user?.token) {
      api.defaults.headers.common.Authorization = `Bearer ${user.token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [user]);

  /**
   * Save user to state and localStorage.
   * @param {Object} u - User object containing token and profile data
   */
  const saveUser = (u) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  /**
   * Clear user from state and localStorage, and remove auth header.
   */
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    delete api.defaults.headers.common.Authorization;
  };

  /**
   * Authenticate the user via API and store credentials.
   * Uses axios for mocking in tests.
   *
   * @param {string} username
   * @param {string} password
   */
  const login = async (username, password) => {
    const { data } = await axios.post("http://localhost:8080/api/login", {
      username,
      password,
    });
    const userObj = data.user
      ? { ...data.user, token: data.token }
      : { username: data.username, role: data.role, token: data.token };
    saveUser(userObj);
  };

  /**
   * Register a new user via API and store credentials.
   *
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @param {string} role
   */
  const register = async (username, email, password, role) => {
    const { data } = await axios.post("http://localhost:8080/api/register", {
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

/**
 * Custom hook to access authentication context.
 * @returns {Object} { user, login, register, logout }
 */
export function useAuth() {
  return useContext(AuthContext);
}
