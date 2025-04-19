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
} from "@mui/material";
import useFetchData from "../../hooks/useFetchData";
import { createArtist, updateArtist } from "../../api/artists";

export default function ManageArtists() {
  const {
    data: artists,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchData("http://localhost:8080/artists");

  const [form, setForm] = useState({
    stageName: "",
    genre: "",
    homeCity: "",
    membersCount: 1,
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "membersCount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateArtist(editingId, form);
    } else {
      await createArtist(form);
    }
    setForm({ stageName: "", genre: "", homeCity: "", membersCount: 1 });
    setEditingId(null);
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

  if (isLoading) {
    return <CircularProgress />;
  }
  if (isError) {
    return <Typography color="error">{error.message}</Typography>;
  }

  return (
    <Paper style={{ padding: "1rem" }}>
      <Typography variant="h4" gutterBottom>
        Manage Artists
      </Typography>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <TextField
          label="Stage Name"
          name="stageName"
          value={form.stageName}
          onChange={handleChange}
          required
          style={{ marginRight: "1rem" }}
        />
        <TextField
          label="Genre"
          name="genre"
          value={form.genre}
          onChange={handleChange}
          required
          style={{ marginRight: "1rem" }}
        />
        <TextField
          label="Home City"
          name="homeCity"
          value={form.homeCity}
          onChange={handleChange}
          required
          style={{ marginRight: "1rem" }}
        />
        <TextField
          label="Members Count"
          name="membersCount"
          type="number"
          value={form.membersCount}
          onChange={handleChange}
          required
          style={{ width: "120px", marginRight: "1rem" }}
        />
        <Button type="submit" variant="contained" color="primary">
          {editingId ? "Update Artist" : "Create Artist"}
        </Button>
      </form>

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
          {artists.map((artist) => (
            <TableRow key={artist.id}>
              <TableCell>{artist.stageName}</TableCell>
              <TableCell>{artist.genre}</TableCell>
              <TableCell>{artist.homeCity}</TableCell>
              <TableCell>{artist.membersCount}</TableCell>
              <TableCell>
                <Button size="small" onClick={() => startEdit(artist)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
