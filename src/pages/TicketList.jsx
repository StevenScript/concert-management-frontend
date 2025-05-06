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
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import useFetchData from "../hooks/useFetchData";
import {
  PageContainer,
  SectionWrapper,
  Title,
} from "../utils/StyledComponents";

export default function TicketList() {
  const { user } = useAuth(); // ProtectedRoute guarantees presence
  const navigate = useNavigate();

  const {
    data: tickets,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchData(
    `http://localhost:8080/tickets/buyer/${encodeURIComponent(user.email)}`
  );

  /* ---------- loading & error states ---------- */
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
  const hasTickets = Array.isArray(tickets) && tickets.length > 0;

  return (
    <PageContainer>
      <SectionWrapper>
        <Title>My Tickets</Title>

        {hasTickets ? (
          <Paper sx={{ p: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ticket ID</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Venue</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        ) : (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <Stack spacing={2} alignItems="center">
              <Typography variant="h6">
                You haven&rsquo;t purchased any tickets yet.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/events")}
              >
                Browse Events
              </Button>
            </Stack>
          </Paper>
        )}
      </SectionWrapper>
    </PageContainer>
  );
}
