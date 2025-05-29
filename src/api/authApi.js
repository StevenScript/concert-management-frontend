// src/api/authAPI.js
import axios from "axios";
const BASE = process.env.REACT_APP_API_URL || "http://localhost:8080";

/**
 * @typedef {Object} AuthResponse
 * @property {string} accessToken
 * @property {string} refreshToken
 * @property {Object} user       // { id, username, email, role }
 */

/**
 * Register a new user. Returns { accessToken, refreshToken, user }.
 */
export function registerUser({ username, email, password, role }) {
  return axios
    .post(`${BASE}/api/register`, { username, email, password, role })
    .then((r) => r.data);
}

/**
 * Log in. Returns { accessToken, refreshToken, user }.
 */
export function loginUser({ username, password }) {
  return axios
    .post(`${BASE}/api/login`, { username, password })
    .then((r) => r.data);
}
