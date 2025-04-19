import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

let api;

// Create an Axios instance with the base URL, falling back to default if creation fails
if (typeof axios.create === "function") {
  try {
    const instance = axios.create({ baseURL: BASE_URL });
    api = instance || axios;
  } catch {
    api = axios;
  }
} else {
  api = axios;
}

// Ensure baseURL is set even on the default instance
if (api && api.defaults) {
  api.defaults.baseURL = BASE_URL;
}

// Attach an Authorization header to each request when a token is present
if (
  api &&
  api.interceptors &&
  api.interceptors.request &&
  typeof api.interceptors.request.use === "function"
) {
  api.interceptors.request.use((config) => {
    let token;
    try {
      token = localStorage.getItem("authToken");
    } catch {
      // localStorage may be unavailable (e.g. in tests)
    }
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

export default api;
