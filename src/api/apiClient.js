import axios from "axios";

// Base URL for all API calls (ends up used by both front- and backend endpoints)
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

// Create your app-wide axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// On every request, inject the current accessToken if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If we get a 401, try to refresh and then retry once
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        // no refresh token → force logout
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }
      try {
        // call your refresh endpoint
        const { data } = await axios.post(`${BASE_URL}/api/refresh`, {
          refreshToken,
        });
        const { accessToken, refreshToken: newRefresh } = data;

        // persist
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefresh);

        // update header and retry
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        original.headers.Authorization = `Bearer ${accessToken}`;
        return api(original);
      } catch (e) {
        // refresh failed → logout
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
