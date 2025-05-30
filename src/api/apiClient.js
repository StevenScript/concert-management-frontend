import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const api = axios.create({ baseURL: BASE_URL });

// ── Attach access token on every request ───────────────────────────────────
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ── Automatic refresh on 401 ────────────────────────────────────────────────
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (
      err.response?.status === 401 &&
      !original._retry &&
      original.url !== "/api/refresh"
    ) {
      original._retry = true;
      try {
        // call your back-end refresh endpoint
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await axios.post(`${BASE_URL}/api/refresh`, {
          refreshToken,
        });
        const { accessToken: newAccess, refreshToken: newRefresh } = data;

        // save new tokens
        localStorage.setItem("accessToken", newAccess);
        localStorage.setItem("refreshToken", newRefresh);
        api.defaults.headers.common.Authorization = `Bearer ${newAccess}`;

        // retry the original request
        original.headers.Authorization = `Bearer ${newAccess}`;
        return api(original);
      } catch (refreshErr) {
        // refresh failed → force logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
