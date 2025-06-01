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
  Checkbox,
  ListItemText,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import useFetchData from "../../hooks/useFetchData";
import { createEvent, updateEvent, deleteEvent } from "../../api/events";

const BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

export default function ManageEvents() {
  /* ---------- fetch lists ---------- */
  const {
    data: events,
    isLoading: loadingEvents,
    isError: errEvents,
    error: eventsErr,
    refetch: refetchEvents,
  } = useFetchData(`${BASE}/events`);

  const {
    data: venues,
    isLoading: loadingVenues,
    isError: errVenues,
    error: venuesErr,
  } = useFetchData(`${BASE}/venues`);

  const {
    data: artists,
    isLoading: loadingArtists,
    isError: errArtists,
    error: artistsErr,
  } = useFetchData(`${BASE}/artists`);

  /* ---------- form state ---------- */
  const [form, setForm] = useState({
    name: "",
    eventDate: "",
    ticketPrice: "",
    availableTickets: "",
    venueId: "",
    artistIds: [],
  });
  const [editingId, setEditingId] = useState(null);

  /* ---------- delete dialog ---------- */
  const [deleteTarget, setDeleteTarget] = useState(null);
  const confirmDelete = async () => {
    await deleteEvent(deleteTarget.id);
    setDeleteTarget(null);
    refetchEvents();
  };

  /* ---------- handlers ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      ticketPrice: Number(form.ticketPrice),
      availableTickets: Number(form.availableTickets),
    };

    if (editingId) {
      await updateEvent(editingId, payload);
    } else {
      await createEvent(payload);
    }
    resetForm();
    refetchEvents();
  };

  const startEdit = (ev) => {
    setEditingId(ev.id);
    setForm({
      name: ev.name ?? "",
      eventDate: ev.eventDate ?? "",
      ticketPrice: ev.ticketPrice ?? "",
      availableTickets: ev.availableTickets ?? "",
      venueId: ev.venueId ?? "",
      artistIds: ev.artistIds ?? [],
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      eventDate: "",
      ticketPrice: "",
      availableTickets: "",
      venueId: "",
      artistIds: [],
    });
    setEditingId(null);
  };

  /* ---------- loading / error gates ---------- */
  if (loadingEvents || loadingVenues || loadingArtists) {
    return <CircularProgress data-testid="loading-indicator" />;
  }
  if (errEvents || errVenues || errArtists) {
    const msg =
      eventsErr?.message ||
      venuesErr?.message ||
      artistsErr?.message ||
      "Error";
    return (
      <Typography color="error" data-testid="error-message">
        {msg}
      </Typography>
    );
  }

  /* ---------- helper maps ---------- */
  const venueMap = Object.fromEntries(venues.map((v) => [v.id, v.name]));

  /* ---------- render ---------- */
  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Manage Events
        </Typography>

        {/* ---- form ---- */}
        <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <TextField
              label="Event Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Date"
              name="eventDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.eventDate}
              onChange={handleChange}
              required
            />
            <TextField
              label="Ticket Price"
              name="ticketPrice"
              type="number"
              value={form.ticketPrice}
              onChange={handleChange}
              required
              sx={{ width: 140 }}
            />
            <TextField
              label="Available Tickets"
              name="availableTickets"
              type="number"
              value={form.availableTickets}
              onChange={handleChange}
              required
              sx={{ width: 150 }}
            />

            <FormControl sx={{ minWidth: 160 }}>
              <InputLabel id="venue-select-label">Venue</InputLabel>
              <Select
                labelId="venue-select-label"
                name="venueId"
                value={form.venueId}
                label="Venue"
                onChange={handleChange}
                required
              >
                {venues.map((v) => (
                  <MenuItem key={v.id} value={v.id}>
                    {v.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 220 }}>
              <InputLabel id="artist-select-label">Artists</InputLabel>
              <Select
                labelId="artist-select-label"
                multiple
                name="artistIds"
                value={form.artistIds}
                onChange={(e) =>
                  setForm((f) => ({ ...f, artistIds: e.target.value }))
                }
                renderValue={(selected) =>
                  selected
                    .map(
                      (id) => artists.find((a) => a.id === id)?.stageName || id
                    )
                    .join(", ")
                }
              >
                {artists.map((a) => (
                  <MenuItem key={a.id} value={a.id}>
                    <Checkbox checked={form.artistIds.includes(a.id)} />
                    <ListItemText primary={a.stageName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ alignSelf: "center" }}
            >
              {editingId ? "Update Event" : "Create Event"}
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
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Tickets Left</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((ev) => (
              <TableRow key={ev.id} data-testid={`event-${ev.id}`}>
                <TableCell>{ev.name}</TableCell>
                <TableCell>
                  {ev.eventDate
                    ? new Intl.DateTimeFormat("en-CA").format(
                        new Date(ev.eventDate)
                      )
                    : "—"}
                </TableCell>
                <TableCell>
                  {venueMap[ev.venueId] || ev.venueId || "—"}
                </TableCell>
                <TableCell>
                  {ev.ticketPrice != null
                    ? `$${ev.ticketPrice.toFixed(2)}`
                    : "—"}
                </TableCell>
                <TableCell>
                  {ev.availableTickets != null ? ev.availableTickets : "—"}
                </TableCell>
                <TableCell>
                  <Button size="small" onClick={() => startEdit(ev)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => setDeleteTarget(ev)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* ---- delete confirmation dialog ---- */}
      {deleteTarget && (
        <Dialog
          open
          onClose={() => setDeleteTarget(null)}
          aria-labelledby="delete-event-dialog"
        >
          <DialogTitle id="delete-event-dialog">Delete Event</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete “{deleteTarget.name}”?
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
