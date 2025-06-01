import api from "./apiClient"; // <-- centralised axios instance ✅

/**
 * @typedef {Object} AuthResponse
 * @property {string} accessToken
 * @property {string} refreshToken
 * @property {Object} user          // { id, username, email, role }
 */

/**
 * Register a new user – returns { accessToken, refreshToken, user }.
 * @param {{ username:string, email:string, password:string, role:string }} body
 * @returns {Promise<AuthResponse>}
 */
export function registerUser(body) {
  // /api/register is relative to the baseURL already set in apiClient
  return api.post("/api/register", body).then((res) => res.data);
}

/**
 * Log in – returns { accessToken, refreshToken, user }.
 * @param {{ username:string, password:string }} body
 * @returns {Promise<AuthResponse>}
 */
export function loginUser(body) {
  return api.post("/api/login", body).then((res) => res.data);
}
