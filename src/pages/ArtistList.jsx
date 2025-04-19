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
  const { data: artists, isLoading, isError, error } = useFetchData("/artists");

  return (
    <section>
      {/* Heading is always rendered */}
      <Typography variant="h4" component="h1">
        Artists
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
      {!isLoading && !isError && Array.isArray(artists) && (
        <List>
          {artists.map((artist) => (
            <ListItem key={artist.id}>
              <ListItemText
                primary={artist.stageName || artist.username || artist.name}
              />
            </ListItem>
          ))}
        </List>
      )}
    </section>
  );
}
