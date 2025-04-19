import api from "./apiClient";

/**
 * Register a new user and save JWT to localStorage.
 * @param {RegisterRequest} data
 * @returns {Promise<AuthResponse>}
 */
export const registerUser = (data) =>
  api.post("/api/register", data).then((r) => {
    localStorage.setItem("authToken", r.data.token);
    return r.data;
  });

/**
 * Log in a user and save JWT to localStorage.
 * @param {LoginRequest} data
 * @returns {Promise<AuthResponse>}
 */
export const loginUser = (data) =>
  api.post("/api/login", data).then((r) => {
    localStorage.setItem("authToken", r.data.token);
    return r.data;
  });

/**
 * Remove JWT from localStorage to log out the user.
 */
export const logout = () => {
  localStorage.removeItem("authToken");
};
