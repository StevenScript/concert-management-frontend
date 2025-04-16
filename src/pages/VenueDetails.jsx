import React from "react";
import { useParams } from "react-router"; // ← same as EventDetails
import { Typography, CircularProgress } from "@mui/material";
import useFetchData from "../hooks/useFetchData";

export default function VenueDetails() {
  const { venueId } = useParams();

  const { data, isLoading, isError, error } = useFetchData(
    `http://example.com/api/venues/${venueId}`
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
        Venue Details
      </Typography>
      <Typography>Venue ID: {data.id}</Typography>
      <Typography>Name: {data.name}</Typography>
      <Typography>Location: {data.location}</Typography>
      <Typography>Capacity: {data.capacity}</Typography>
    </section>
  );
}
