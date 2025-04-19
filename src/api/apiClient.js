import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

let api;

// Try to get a real axios instance…
if (typeof axios.create === "function") {
  try {
    const instance = axios.create({ baseURL: BASE_URL });
    api = instance || axios; // fall back if create() returned undefined
  } catch {
    api = axios; // fall back if create throws
  }
} else {
  api = axios; // no create() support, use default
}

// Ensure we never read `defaults` off of an undefined `api`
if (api && api.defaults) {
  api.defaults.baseURL = BASE_URL;
}

// Safely wire up an Authorization interceptor
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
      // no localStorage in Jest or non-browser environments
    }
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

export default api;
