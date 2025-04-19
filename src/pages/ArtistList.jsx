import React from "react";
import {
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import useFetchData from "../hooks/useFetchData";

export default function ArtistList() {
  // default artists to [] so artists.map can't fail
  const {
    data: artists = [],
    isLoading,
    isError,
    error,
  } = useFetchData("http://localhost:8080/artists");

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
        Artists
      </Typography>
      <List>
        {artists.map((a) => (
          <ListItem key={a.id} data-testid={`artist-${a.id}`}>
            <ListItemText
              primary={a.stageName}
              secondary={`${a.genre} — ${a.membersCount} member(s) from ${a.homeCity}`}
            />
          </ListItem>
        ))}
      </List>
    </section>
  );
}
