import React, { useState } from "react";
import {
  Typography,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack,
} from "@mui/material";

import useFetchData from "../../hooks/useFetchData";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../api/users";

const BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

export default function ManageUsers() {
  /* ---------- fetch ---------- */
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchData(`${BASE}/users`);

  /* ---------- form ---------- */
  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "USER",
    password: "",
  });
  const [editingId, setEditingId] = useState(null);

  /* ---------- delete dialog ---------- */
  const [deleteTarget, setDeleteTarget] = useState(null);
  const confirmDelete = async () => {
    await deleteUser(deleteTarget.id);
    setDeleteTarget(null);
    refetch();
  };

  /* ---------- handlers ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const resetForm = () => {
    setForm({ username: "", email: "", role: "USER", password: "" });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (!payload.password) delete payload.password; // don't send empty pwd

    if (editingId) {
      await updateUser(editingId, payload);
    } else {
      await createUser(payload);
    }
    resetForm();
    refetch();
  };

  const startEdit = (u) => {
    setEditingId(u.id);
    setForm({
      username: u.username,
      email: u.email,
      role: u.role,
      password: "",
    });
  };

  /* ---------- loading / error ---------- */
  if (isLoading) return <CircularProgress data-testid="loading-indicator" />;
  if (isError)
    return (
      <Typography color="error" data-testid="error-message">
        {error.message}
      </Typography>
    );

  /* ---------- render ---------- */
  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Manage Users
        </Typography>

        {/* ---- form ---- */}
        <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <TextField
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <FormControl sx={{ minWidth: 140 }}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                name="role"
                value={form.role}
                label="Role"
                onChange={handleChange}
              >
                <MenuItem value="USER">USER</MenuItem>
                <MenuItem value="ADMIN">ADMIN</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label={editingId ? "New Password" : "Password"}
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required={!editingId}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ alignSelf: "center" }}
            >
              {editingId ? "Update User" : "Create User"}
            </Button>
            {editingId && (
              <Button onClick={resetForm} sx={{ alignSelf: "center" }}>
                Cancel
              </Button>
            )}
          </Stack>
        </form>

        {/* ---- table ---- */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id} data-testid={`user-${u.id}`}>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => startEdit(u)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => setDeleteTarget(u)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* ---- delete dialog ---- */}
      {deleteTarget && (
        <Dialog
          open
          onClose={() => setDeleteTarget(null)}
          aria-labelledby="delete-user-dialog"
        >
          <DialogTitle id="delete-user-dialog">Delete User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Delete user “{deleteTarget.username}”?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button color="error" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
