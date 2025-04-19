import React from "react";
import { Typography, CircularProgress, List, ListItem } from "@mui/material";
import useFetchData from "../hooks/useFetchData";

function ArtistList() {
  const {
    data: artists,
    isLoading,
    isError,
    error,
  } = useFetchData("http://localhost:8080/api/artists");

  return (
    <section>
      {/* this H1 is always rendered */}
      <Typography variant="h4" component="h1">
        Artists
      </Typography>

      {isLoading && <CircularProgress data-testid="loading-indicator" />}

      {isError && (
        <Typography variant="body1" color="error" data-testid="error-message">
          {error.message}
        </Typography>
      )}

      {artists && (
        <List>
          {artists.map((a) => (
            <ListItem key={a.id}>
              <Typography>{a.name}</Typography>
            </ListItem>
          ))}
        </List>
      )}
    </section>
  );
}

export default ArtistList;
