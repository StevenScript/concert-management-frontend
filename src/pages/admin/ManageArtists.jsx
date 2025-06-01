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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import useFetchData from "../../hooks/useFetchData";
import { createArtist, updateArtist, deleteArtist } from "../../api/artists";

const BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

export default function ManageArtists() {
  const {
    data: artists,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchData(`${BASE}/artists`);

  /* ---------- form state ---------- */
  const [form, setForm] = useState({
    stageName: "",
    genre: "",
    homeCity: "",
    membersCount: 1,
  });
  const [editingId, setEditingId] = useState(null);

  /* ---------- delete dialog ---------- */
  const [deleteTarget, setDeleteTarget] = useState(null);
  const confirmDelete = async () => {
    await deleteArtist(deleteTarget.id);
    setDeleteTarget(null);
    refetch();
  };

  /* ---------- handlers ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "membersCount" ? Number(value) : value,
    }));
  };

  const resetForm = () => {
    setForm({ stageName: "", genre: "", homeCity: "", membersCount: 1 });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateArtist(editingId, form);
    } else {
      await createArtist(form);
    }
    resetForm();
    refetch();
  };

  const startEdit = (artist) => {
    setEditingId(artist.id);
    setForm({
      stageName: artist.stageName,
      genre: artist.genre,
      homeCity: artist.homeCity,
      membersCount: artist.membersCount,
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
          Manage Artists
        </Typography>

        {/* ---- form ---- */}
        <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
          <TextField
            label="Stage Name"
            name="stageName"
            value={form.stageName}
            onChange={handleChange}
            required
            sx={{ mr: 2 }}
          />
          <TextField
            label="Genre"
            name="genre"
            value={form.genre}
            onChange={handleChange}
            required
            sx={{ mr: 2 }}
          />
          <TextField
            label="Home City"
            name="homeCity"
            value={form.homeCity}
            onChange={handleChange}
            required
            sx={{ mr: 2 }}
          />
          <TextField
            label="Members"
            name="membersCount"
            type="number"
            value={form.membersCount}
            onChange={handleChange}
            required
            sx={{ width: 120, mr: 2 }}
          />
          <Button type="submit" variant="contained">
            {editingId ? "Update Artist" : "Create Artist"}
          </Button>
          {editingId && (
            <Button onClick={resetForm} sx={{ ml: 1 }}>
              Cancel
            </Button>
          )}
        </form>

        {/* ---- table ---- */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Home City</TableCell>
              <TableCell>Members</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {artists.map((a) => (
              <TableRow key={a.id} data-testid={`artist-${a.id}`}>
                <TableCell>{a.stageName}</TableCell>
                <TableCell>{a.genre}</TableCell>
                <TableCell>{a.homeCity}</TableCell>
                <TableCell>{a.membersCount}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => startEdit(a)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => setDeleteTarget(a)}
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
          aria-labelledby="delete-artist-dialog"
        >
          <DialogTitle id="delete-artist-dialog">Delete Artist</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Delete artist “{deleteTarget.stageName}”?
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
