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

export default function ManageEvents() {
  const { data, isLoading, isError, error } = useFetchData(
    "http://example.com/api/events"
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
        Manage Events
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Available Tickets</TableCell>
            <TableCell>Venue ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((evt) => (
            <TableRow key={evt.id} data-testid={`event-${evt.id}`}>
              <TableCell>{evt.event_date}</TableCell>
              <TableCell>{evt.ticket_price}</TableCell>
              <TableCell>{evt.available_tickets}</TableCell>
              <TableCell>{evt.venue_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
