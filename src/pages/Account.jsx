import React from "react";
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
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useFetchData from "../hooks/useFetchData";
import {
  PageContainer,
  SectionWrapper,
  Title,
} from "../utils/StyledComponents";

const API = "http://localhost:8080";

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const {
    data: tickets,
    isLoading,
    isError,
    error,
  } = useFetchData(`${API}/tickets/buyer/${encodeURIComponent(user.email)}`);

  /* ---------- loading / error ---------- */
  if (isLoading) {
    return (
      <PageContainer>
        <CircularProgress data-testid="loading-indicator" />
      </PageContainer>
    );
  }
  if (isError) {
    return (
      <PageContainer>
        <Typography color="error" data-testid="error-message">
          {error.message}
        </Typography>
      </PageContainer>
    );
  }

  /* ---------- render ---------- */
  return (
    <PageContainer>
      <SectionWrapper>
        <Title>My Account</Title>

        <Paper sx={{ p: 2, mb: 4 }}>
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
            <Button
              variant="outlined"
              color="error"
              sx={{ mt: 1, alignSelf: "flex-start" }}
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </Stack>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            My Tickets
          </Typography>

          {tickets.length === 0 ? (
            <Typography>
              You haven&rsquo;t purchased any tickets yet.
            </Typography>
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
