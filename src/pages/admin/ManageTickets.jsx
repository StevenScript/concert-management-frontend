import React from "react";
import {
  Typography,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import useFetchData from "../../hooks/useFetchData";

export default function ManageTickets() {
  const { data, isLoading, isError, error } = useFetchData(
    "http://localhost:8080/api/tickets"
  );

  if (isLoading) {
    return <CircularProgress data-testid="loading-indicator" />;
  }

  if (isError) {
    return (
      <Typography color="error" data-testid="error-message">
        {error.message}
      </Typography>
    );
  }

  return (
    <section>
      <Typography variant="h4" component="h1">
        Manage Tickets
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Buyer Name</TableCell>
            <TableCell>Seat Number</TableCell>
            <TableCell>Ticket Type</TableCell>
            <TableCell>Event ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((ticket) => (
            <TableRow key={ticket.id} data-testid={`ticket-${ticket.id}`}>
              <TableCell>{ticket.buyer_name}</TableCell>
              <TableCell>{ticket.seat_number}</TableCell>
              <TableCell>{ticket.ticket_type}</TableCell>
              <TableCell>{ticket.event_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
