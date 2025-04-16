import React from "react";
import { Typography, CircularProgress, List, ListItem } from "@mui/material";
import useFetchData from "../hooks/useFetchData";

function EventList() {
  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useFetchData("http://example.com/api/events");

  return (
    <section>
      <Typography variant="h4" component="h1">
        Events
      </Typography>

      {isLoading && <CircularProgress data-testid="loading-indicator" />}

      {isError && (
        <Typography variant="body1" color="error" data-testid="error-message">
          {error.message}
        </Typography>
      )}

      {events && (
        <List>
          {events.map((e) => (
            <ListItem key={e.id}>
              <Typography>{e.name}</Typography>
            </ListItem>
          ))}
        </List>
      )}
    </section>
  );
}

export default EventList;
