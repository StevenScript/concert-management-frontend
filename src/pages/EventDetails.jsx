import React from "react";
import { useParams } from "react-router";
import { Typography, CircularProgress } from "@mui/material";
import useFetchData from "../hooks/useFetchData";

export default function EventDetails() {
  const { eventId } = useParams();

  // Fetch from your real backend; tests will mock axios.get
  const { data, isLoading, isError, error } = useFetchData(
    `http://localhost:8080/api/events/${eventId}`
  );

  if (isLoading) {
    return <CircularProgress data-testid="loading-indicator" />;
  }

  if (isError) {
    return (
      <Typography data-testid="error-message" color="error" variant="h6">
        {error.message}
      </Typography>
    );
  }

  return (
    <section>
      <Typography variant="h4" component="h1">
        Event Details
      </Typography>
      <Typography>Event ID: {data.id}</Typography>
      <Typography>Name: {data.name}</Typography>
      <Typography>Date: {data.event_date}</Typography>
      {/* add any other fields you need */}
    </section>
  );
}
