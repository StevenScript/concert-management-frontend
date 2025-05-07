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
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import useFetchData from "../../hooks/useFetchData";
import {
  fetchAllTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../../api/tickets";

export default function ManageTickets() {
  /* ---------- fetch ---------- */
  const {
    data: tickets,
    isLoading: loadingTickets,
    isError: errTickets,
    error: ticketsErr,
    refetch: refetchTickets,
  } = useFetchData("http://localhost:8080/tickets");

  const {
    data: events,
    isLoading: loadingEvents,
    isError: errEvents,
    error: eventsErr,
  } = useFetchData("http://localhost:8080/events");

  /* ---------- form state ---------- */
  const [form, setForm] = useState({
    eventId: "",
    buyerEmail: "",
  });
  const [editingId, setEditingId] = useState(null);

  /* ---------- delete dialog ---------- */
  const [deleteTarget, setDeleteTarget] = useState(null);

  /* ---------- handlers ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const resetForm = () => {
    setForm({ eventId: "", buyerEmail: "" });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateTicket(editingId, form);
    } else {
      await createTicket(form);
    }
    resetForm();
    refetchTickets();
  };

  const startEdit = (t) => {
    setEditingId(t.id);
    setForm({
      eventId: events.find((e) => e.name === t.eventName)?.id || "",
      buyerEmail: t.buyerEmail,
    });
  };

  const confirmDelete = async () => {
    await deleteTicket(deleteTarget.id);
    setDeleteTarget(null);
    refetchTickets();
  };

  /* ---------- loading / error ---------- */
  if (loadingTickets || loadingEvents) {
    return <CircularProgress data-testid="loading-indicator" />;
  }
  if (errTickets || errEvents) {
    return (
      <Typography color="error" data-testid="error-message">
        {ticketsErr?.message || eventsErr?.message}
      </Typography>
    );
  }

  /* ---------- helper map ---------- */
  const eventMap = Object.fromEntries(events.map((e) => [e.id, e.name]));

  /* ---------- render ---------- */
  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Manage Tickets
        </Typography>

        {/* ---- form ---- */}
        <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <FormControl sx={{ minWidth: 220 }}>
              <InputLabel id="event-select-label">Event</InputLabel>
              <Select
                labelId="event-select-label"
                name="eventId"
                value={form.eventId}
                label="Event"
                onChange={handleChange}
                required
              >
                {events.map((e) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Buyer Email"
              name="buyerEmail"
              type="email"
              value={form.buyerEmail}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ alignSelf: "center" }}
            >
              {editingId ? "Update Ticket" : "Create Ticket"}
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
              <TableCell>ID</TableCell>
              <TableCell>Event</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Buyer Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((t) => (
              <TableRow key={t.id} data-testid={`ticket-${t.id}`}>
                <TableCell>{t.id}</TableCell>
                <TableCell>{t.eventName}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("en-CA").format(
                    new Date(t.eventDate)
                  )}
                </TableCell>
                <TableCell>{t.venueName}</TableCell>
                <TableCell>{t.buyerEmail}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => startEdit(t)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => setDeleteTarget(t)}
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
          aria-labelledby="delete-ticket-dialog"
        >
          <DialogTitle id="delete-ticket-dialog">Delete Ticket</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Delete ticket #{deleteTarget.id} for “{deleteTarget.eventName}”?
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
