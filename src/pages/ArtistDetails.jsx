import React from "react";
import { useParams } from "react-router";
import { Typography, CircularProgress } from "@mui/material";
import useFetchData from "../hooks/useFetchData";

function ArtistDetails() {
  const { artistId } = useParams();

  // Call our custom hook to fetch artist details. Make sure your endpoint URL reflects your backend.
  const { data, isLoading, isError, error } = useFetchData(
    `http://example.com/api/artists/${artistId}`
  );

  if (isLoading) {
    // Render a loading indicator with a data-testid for testing.
    return <CircularProgress data-testid="loading-indicator" />;
  }

  if (isError) {
    // Render the error message in a Typography component with data-testid.
    return (
      <Typography variant="h6" color="error" data-testid="error-message">
        {error.message}
      </Typography>
    );
  }

  return (
    <section>
      <Typography variant="h4" component="h1">
        Artist Details
      </Typography>
      <Typography variant="body1">Name: {data.name}</Typography>
      <Typography variant="body1">Genre: {data.genre}</Typography>
      <Typography variant="body1">Home City: {data.home_city}</Typography>
    </section>
  );
}

export default ArtistDetails;
