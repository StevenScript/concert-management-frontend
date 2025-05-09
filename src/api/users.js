import api from "./apiClient";

/* ----- read ----- */
export const fetchUsers = () => api.get("/users").then((r) => r.data);

/* ----- create ----- */
export const createUser = (data) =>
  api.post("/users", data).then((r) => r.data);

/* ----- update ----- */
export const updateUser = (id, data) =>
  api.put(`/users/${id}`, data).then((r) => r.data);

export const updateUserSelf = (id, payload) =>
  api.put(`/users/${id}`, payload).then((r) => r.data);

/* ----- delete ----- */
export const deleteUser = (id) =>
  api.delete(`/users/${id}`).then((r) => r.status);
