import React from "react";
import {
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import useFetchData from "../hooks/useFetchData";

export default function EventList() {
  // default events to [] so events.map can't fail
  const {
    data: events = [],
    isLoading,
    isError,
    error,
  } = useFetchData("http://localhost:8080/events");

  if (isLoading) {
    return <CircularProgress data-testid="loading-indicator" />;
  }
  if (isError) {
    return (
      <Typography variant="body1" color="error" data-testid="error-message">
        {error.message}
      </Typography>
    );
  }

  return (
    <section>
      <Typography variant="h4" component="h1">
        Events
      </Typography>
      <List>
        {events.map((e) => (
          <ListItem key={e.id} data-testid={`event-${e.id}`}>
            <ListItemText
              primary={e.eventDate}
              secondary={`$${e.ticketPrice} — ${e.availableTickets} tickets left`}
            />
          </ListItem>
        ))}
      </List>
    </section>
  );
}
