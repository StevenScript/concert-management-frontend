import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { fetchVenues, createVenue, updateVenue } from "../../api/venues";
import {
  PageContainer,
  SectionWrapper,
  Title,
} from "../../utils/StyledComponents";

export default function ManageVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newVenue, setNewVenue] = useState({
    name: "",
    location: "",
    capacity: "",
  });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    location: "",
    capacity: "",
  });

  // Load all venues
  const loadVenues = async () => {
    try {
      setLoading(true);
      const data = await fetchVenues();
      setVenues(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVenues();
  }, []);

  // Create handler
  const handleCreate = async () => {
    try {
      const created = await createVenue({
        name: newVenue.name,
        location: newVenue.location,
        capacity: parseInt(newVenue.capacity, 10),
      });
      setVenues((prev) => [...prev, created]);
      setNewVenue({ name: "", location: "", capacity: "" });
    } catch (e) {
      setError(e);
    }
  };

  // Kick off editing a given row
  const startEdit = (venue) => {
    setEditId(venue.id);
    setEditData({
      name: venue.name,
      location: venue.location,
      capacity: venue.capacity.toString(),
    });
  };

  // Save update
  const handleUpdate = async (id) => {
    try {
      const updated = await updateVenue(id, {
        name: editData.name,
        location: editData.location,
        capacity: parseInt(editData.capacity, 10),
      });
      setVenues((prev) => prev.map((v) => (v.id === id ? updated : v)));
      setEditId(null);
    } catch (e) {
      setError(e);
    }
  };

  if (loading) return <CircularProgress data-testid="loading-indicator" />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <PageContainer>
      <SectionWrapper>
        <Title>Manage Venues</Title>

        {/* New Venue Form */}
        <Paper sx={{ p: 2, mb: 4 }}>
          <Typography variant="h6">Add New Venue</Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 1 }}>
            <TextField
              label="Name"
              value={newVenue.name}
              onChange={(e) =>
                setNewVenue({ ...newVenue, name: e.target.value })
              }
            />
            <TextField
              label="Location"
              value={newVenue.location}
              onChange={(e) =>
                setNewVenue({ ...newVenue, location: e.target.value })
              }
            />
            <TextField
              label="Capacity"
              type="number"
              value={newVenue.capacity}
              onChange={(e) =>
                setNewVenue({ ...newVenue, capacity: e.target.value })
              }
            />
            <Button variant="contained" onClick={handleCreate}>
              Create Venue
            </Button>
          </Box>
        </Paper>

        {/* Venues Table */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {venues.map((v) => (
              <TableRow key={v.id} data-testid={`venue-${v.id}`}>
                {/* Name */}
                <TableCell>
                  {editId === v.id ? (
                    <TextField
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  ) : (
                    v.name
                  )}
                </TableCell>

                {/* Location */}
                <TableCell>
                  {editId === v.id ? (
                    <TextField
                      value={editData.location}
                      onChange={(e) =>
                        setEditData({ ...editData, location: e.target.value })
                      }
                    />
                  ) : (
                    v.location
                  )}
                </TableCell>

                {/* Capacity */}
                <TableCell>
                  {editId === v.id ? (
                    <TextField
                      type="number"
                      value={editData.capacity}
                      onChange={(e) =>
                        setEditData({ ...editData, capacity: e.target.value })
                      }
                    />
                  ) : (
                    v.capacity
                  )}
                </TableCell>

                {/* Actions */}
                <TableCell align="right">
                  {editId === v.id ? (
                    <Button size="small" onClick={() => handleUpdate(v.id)}>
                      Save
                    </Button>
                  ) : (
                    <Button size="small" onClick={() => startEdit(v)}>
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionWrapper>
    </PageContainer>
  );
}
