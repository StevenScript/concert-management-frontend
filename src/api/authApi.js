import api from "./apiClient";

export const registerUser = (data) =>
  api.post("/api/register", data).then((r) => {
    localStorage.setItem("authToken", r.data.token);
    return r.data;
  });

export const loginUser = (data) =>
  api.post("/api/login", data).then((r) => {
    localStorage.setItem("authToken", r.data.token);
    return r.data;
  });

export const logout = () => {
  localStorage.removeItem("authToken");
};
