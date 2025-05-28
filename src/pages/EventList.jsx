import React from "react";
import {
  Typography,
  CircularProgress,
  Alert,
  Box,
  Container,
} from "@mui/material";
import useFetchData from "../hooks/useFetchData";
import EventCard from "../components/cards/EventCard";
import {
  PageContainer,
  SectionWrapper,
  Title,
} from "../utils/StyledComponents";

const API = "http://localhost:8080";

export default function EventList() {
  /* ---- upcoming events (already date-sorted by backend) ---- */
  const {
    data: events = [],
    isLoading,
    isError,
    error,
  } = useFetchData(`${API}/events/upcoming`);

  /* ---- venue map for nicer labels ---- */
  const { data: venues = [] } = useFetchData(`${API}/venues`);
  const venueMap = Object.fromEntries(venues.map((v) => [v.id, v.name]));

  return (
    <PageContainer>
      <SectionWrapper>
        <Title>Upcoming Events</Title>

        {isLoading && <CircularProgress data-testid="loading-indicator" />}

        {isError && <Alert severity="error">{error.message}</Alert>}

        {!isLoading && !isError && (
          <Container sx={{ maxWidth: 1600, px: { xs: 1, md: 0 }, mx: "auto" }}>
            <Box
              sx={{
                display: "grid",
                gap: { xs: 2, md: 3 },
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              }}
            >
              {events.map((ev) => (
                <EventCard
                  key={ev.id}
                  event={ev}
                  venueName={venueMap[ev.venueId]}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                />
              ))}
            </Box>
          </Container>
        )}
      </SectionWrapper>
    </PageContainer>
  );
}
