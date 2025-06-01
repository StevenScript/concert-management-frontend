import React, { useState } from "react";
import {
  Typography,
  CircularProgress,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useFetchData from "../hooks/useFetchData";
import { updateUserSelf } from "../api/users";
import api from "../api/apiClient"; // use the preconfigured axios instance
import {
  PageContainer,
  SectionWrapper,
  Title,
} from "../utils/StyledComponents";

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Derive base URL from env, fallback to localhost
  const BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

  /* ---- tickets query ---- */
  const {
    data: tickets,
    isLoading,
    isError,
    error,
  } = useFetchData(`${BASE}/tickets/buyer/${encodeURIComponent(user.email)}`);

  /* ---- edit mode state ---- */
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    username: user.username,
    email: user.email,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const saveChanges = async () => {
    const payload = { ...form };
    if (!payload.password) delete payload.password; // ignore empty pwd
    await updateUserSelf(user.id, payload);
    // force logout – a real app would refresh token instead
    logout();
    navigate("/login");
  };

  /* ---- guards ---- */
  if (isLoading) {
    return (
      <PageContainer>
        <CircularProgress />
      </PageContainer>
    );
  }
  if (isError) {
    return (
      <PageContainer>
        <Typography color="error">{error.message}</Typography>
      </PageContainer>
    );
  }

  /* ---- render ---- */
  return (
    <PageContainer>
      <SectionWrapper>
        <Title>My Account</Title>

        <Paper sx={{ p: 2, mb: 4 }}>
          {edit ? (
            <Stack spacing={2}>
              <TextField
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              <TextField
                label="New Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
              />
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={saveChanges}>
                  Save
                </Button>
                <Button onClick={() => setEdit(false)}>Cancel</Button>
              </Stack>
            </Stack>
          ) : (
            <Stack spacing={1}>
              <Typography>
                <strong>Username:</strong> {user.username}
              </Typography>
              <Typography>
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography>
                <strong>Role:</strong> {user.role}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                <Button variant="outlined" onClick={() => setEdit(true)}>
                  Edit Info
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  Logout
                </Button>
              </Stack>
            </Stack>
          )}
        </Paper>

        {/* ---- tickets ---- */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            My Tickets
          </Typography>
          {tickets.length === 0 ? (
            <Typography>You haven’t purchased any tickets yet.</Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Venue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.id}</TableCell>
                    <TableCell>{t.eventName}</TableCell>
                    <TableCell>
                      {new Intl.DateTimeFormat("en-CA").format(
                        new Date(t.eventDate)
                      )}
                    </TableCell>
                    <TableCell>{t.venueName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      </SectionWrapper>
    </PageContainer>
  );
}
