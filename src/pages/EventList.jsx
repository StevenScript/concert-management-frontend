import React from "react";
import { Typography, CircularProgress, Grid, Alert } from "@mui/material";
import useFetchData from "../hooks/useFetchData";
import EventCard from "../components/cards/EventCard";
import {
  PageContainer,
  SectionWrapper,
  Title,
} from "../utils/StyledComponents";

const API = "http://localhost:8080";

export default function EventList() {
  const {
    data: events = [],
    isLoading,
    isError,
    error,
  } = useFetchData(`${API}/events/upcoming`); // already sorted by date

  /* optional: preload venue map so we can show names */
  const { data: venues = [] } = useFetchData(`${API}/venues`);

  const venueMap = Object.fromEntries(venues.map((v) => [v.id, v.name]));

  return (
    <PageContainer>
      <SectionWrapper>
        <Title>Upcoming Events</Title>

        {isLoading && <CircularProgress data-testid="loading-indicator" />}

        {isError && <Alert severity="error">{error.message}</Alert>}

        {!isLoading && !isError && (
          <Grid container spacing={3}>
            {events.map((ev) => (
              <Grid key={ev.id} item xs={12} sm={6} md={4}>
                <EventCard event={ev} venueName={venueMap[ev.venueId]} />
              </Grid>
            ))}
          </Grid>
        )}
      </SectionWrapper>
    </PageContainer>
  );
}
