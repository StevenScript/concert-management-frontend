// src/pages/admin/ManageVenues.jsx

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
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import useFetchData from "../../hooks/useFetchData";
import { createVenue, updateVenue, deleteVenue } from "../../api/venues";
import {
  PageContainer,
  SectionWrapper,
  Title,
} from "../../utils/StyledComponents";

// Pull BASE from env (falls back to localhost)
const BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

export default function ManageVenues() {
  // ── 1) Load all venues via our hook ─────────────────────────────────
  const {
    data: venues = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchData(`${BASE}/venues`);

  // ── 2) Local state for the “Create new” form ──────────────────────────
  const [newVenue, setNewVenue] = useState({
    name: "",
    location: "",
    capacity: "",
  });

  // ── 3) Track which row (if any) is currently in “edit” mode ───────────
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    location: "",
    capacity: "",
  });

  // ── 4) Track which venue is pending deletion ─────────────────────────
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ── Handler: Create a brand‐new venue ────────────────────────────────
  const handleCreate = async () => {
    try {
      const created = await createVenue({
        name: newVenue.name,
        location: newVenue.location,
        capacity: parseInt(newVenue.capacity, 10),
      });
      // After we successfully create, clear the “new” inputs and refresh list:
      setNewVenue({ name: "", location: "", capacity: "" });
      refetch();
    } catch (e) {
      console.error("Failed to create venue:", e);
      // You could set local error state here if you want to show a message
    }
  };

  // ── Begin editing an existing venue ──────────────────────────────────
  const startEdit = (v) => {
    setEditId(v.id);
    setEditData({
      name: v.name,
      location: v.location,
      capacity: v.capacity.toString(),
    });
  };

  // ── Handler: Save changes to an existing venue ────────────────────────
  const handleUpdate = async (id) => {
    try {
      const updated = await updateVenue(id, {
        name: editData.name,
        location: editData.location,
        capacity: parseInt(editData.capacity, 10),
      });
      // After successful update, exit edit mode and refresh:
      setEditId(null);
      refetch();
    } catch (e) {
      console.error("Failed to update venue:", e);
    }
  };

  // ── Confirm & execute delete ─────────────────────────────────────────
  const confirmDelete = async () => {
    try {
      await deleteVenue(deleteTarget.id);
      setDeleteTarget(null);
      refetch();
    } catch (e) {
      console.error("Failed to delete venue:", e);
    }
  };

  // ── Show a loader or error if needed ────────────────────────────────
  if (isLoading) return <CircularProgress data-testid="loading-indicator" />;
  if (isError)
    return (
      <Typography color="error" data-testid="error-message">
        {error.message}
      </Typography>
    );

  return (
    <PageContainer>
      <SectionWrapper>
        <Title>Manage Venues</Title>

        {/* ── “Create new” form ──────────────────────────────────────────── */}
        <Paper sx={{ p: 2, mb: 4 }}>
          <Typography variant="h6">Add New Venue</Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 1 }}>
            <TextField
              label="Name"
              value={newVenue.name}
              onChange={(e) =>
                setNewVenue((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
            <TextField
              label="Location"
              value={newVenue.location}
              onChange={(e) =>
                setNewVenue((prev) => ({ ...prev, location: e.target.value }))
              }
              required
            />
            <TextField
              label="Capacity"
              type="number"
              value={newVenue.capacity}
              onChange={(e) =>
                setNewVenue((prev) => ({ ...prev, capacity: e.target.value }))
              }
              required
              sx={{ width: 120 }}
            />
            <Button variant="contained" onClick={handleCreate}>
              Create Venue
            </Button>
          </Box>
        </Paper>

        {/* ── Venues table (with inline editing) ─────────────────────────── */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {venues.map((v) => (
              <TableRow key={v.id} data-testid={`venue-${v.id}`}>
                {/* ─ Name ─ */}
                <TableCell>
                  {editId === v.id ? (
                    <TextField
                      value={editData.name}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    v.name
                  )}
                </TableCell>

                {/* ─ Location ─ */}
                <TableCell>
                  {editId === v.id ? (
                    <TextField
                      value={editData.location}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    v.location
                  )}
                </TableCell>

                {/* ─ Capacity ─ */}
                <TableCell>
                  {editId === v.id ? (
                    <TextField
                      type="number"
                      value={editData.capacity}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          capacity: e.target.value,
                        }))
                      }
                      sx={{ width: 100 }}
                    />
                  ) : (
                    v.capacity
                  )}
                </TableCell>

                {/* ─ Actions ─ */}
                <TableCell>
                  {editId === v.id ? (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleUpdate(v.id)}
                    >
                      Save
                    </Button>
                  ) : (
                    <>
                      <Button size="small" onClick={() => startEdit(v)}>
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => setDeleteTarget(v)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionWrapper>

      {/* ── Delete Confirmation Dialog ──────────────────────────────────── */}
      {deleteTarget && (
        <Dialog
          open
          onClose={() => setDeleteTarget(null)}
          aria-labelledby="delete-venue-dialog"
        >
          <DialogTitle id="delete-venue-dialog">Delete Venue</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Delete venue “{deleteTarget.name}”?
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
    </PageContainer>
  );
}
