import axios from "axios";

/**
 * Base URL comes from CRA env var at build-time.
 * Falls back to localhost for dev / tests.
 */
const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send/receive cookies (JWT in HttpOnly cookie, etc.)
  timeout: 10000, // 10-second network timeout
});

/* ───────────── Attach access token on every request ───────────── */
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

/* ───────────── Automatic refresh on 401 responses ─────────────── */
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (
      err.response?.status === 401 &&
      !original._retry && // avoid infinite loop
      original.url !== "/api/refresh" // don’t recurse on refresh call
    ) {
      original._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await axios.post(`${BASE_URL}/api/refresh`, {
          refreshToken,
        });

        const { accessToken: newAccess, refreshToken: newRefresh } = data;

        // persist new tokens
        localStorage.setItem("accessToken", newAccess);
        localStorage.setItem("refreshToken", newRefresh);

        // update default headers for subsequent calls
        api.defaults.headers.common.Authorization = `Bearer ${newAccess}`;

        // retry the original request with new token
        original.headers.Authorization = `Bearer ${newAccess}`;
        return api(original);
      } catch (refreshErr) {
        // refresh failed → clear state & redirect to login
        ["accessToken", "refreshToken", "user"].forEach(
          localStorage.removeItem
        );
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
