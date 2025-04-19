import React from "react";
import {
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import useFetchData from "../hooks/useFetchData";

export default function VenueList() {
  // ensure data is always an array
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useFetchData("http://localhost:8080/venues");

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
        Venues
      </Typography>
      <List>
        {data.map((v) => (
          <ListItem key={v.id} data-testid={`venue-${v.id}`}>
            <ListItemText
              primary={v.name}
              secondary={`${v.location} — capacity ${v.capacity}`}
            />
          </ListItem>
        ))}
      </List>
    </section>
  );
}
