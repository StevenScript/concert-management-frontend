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
  const { data: events, isLoading, isError, error } = useFetchData("/events");

  return (
    <section>
      {/* Heading is always rendered */}
      <Typography variant="h4" component="h1">
        Events
      </Typography>

      {/* Inline loading indicator */}
      {isLoading && <CircularProgress data-testid="loading-indicator" />}

      {/* Inline error message */}
      {isError && (
        <Typography color="error" data-testid="error-message">
          {error.message}
        </Typography>
      )}

      {/* Render list only when not loading or error */}
      {!isLoading && !isError && Array.isArray(events) && (
        <List>
          {events.map((event) => (
            <ListItem key={event.id}>
              <ListItemText
                primary={event.name || `${event.eventDate}`} // adjust to your dto
              />
            </ListItem>
          ))}
        </List>
      )}
    </section>
  );
}
