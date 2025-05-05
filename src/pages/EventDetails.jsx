import React from "react";
import { useParams } from "react-router";
import { Typography, CircularProgress, Button, Stack } from "@mui/material";
import useFetchData from "../hooks/useFetchData";
import {
  PageContainer,
  SectionWrapper,
  Title,
} from "../utils/StyledComponents";

export default function EventDetails() {
  const { eventId } = useParams();

  /* -------- primary event fetch -------- */
  const {
    data: event,
    isLoading,
    isError,
    error,
  } = useFetchData(`http://localhost:8080/events/${eventId}`);

  /* -------- live ticket count -------- */
  const {
    data: liveCount,
    isLoading: countLoading,
    refetch: refetchCount,
  } = useFetchData(`http://localhost:8080/events/${eventId}/ticket-count`);

  /* -------- loading / error states (same layout as VenueDetails) -------- */
  if (isLoading) {
    return (
      <PageContainer>
        <CircularProgress data-testid="loading-indicator" />
      </PageContainer>
    );
  }

  if (isError) {
    return (
      <PageContainer>
        <Typography color="error" data-testid="error-message">
          {error.message}
        </Typography>
      </PageContainer>
    );
  }

  /* -------- helper values -------- */
  const ticketsLeft =
    typeof liveCount === "number" ? liveCount : event.availableTickets;
  const eventDateFmt = new Intl.DateTimeFormat("en-CA", {
    dateStyle: "long",
  }).format(new Date(event.eventDate));

  return (
    <PageContainer>
      <SectionWrapper>
        <Title>Event Details</Title>

        <Typography>
          <strong>ID:</strong> {event.id}
        </Typography>
        <Typography>
          <strong>Name:</strong> {event.name}
        </Typography>
        <Typography>
          <strong>Date:</strong> {eventDateFmt}
        </Typography>
        <Typography>
          <strong>Price:</strong> ${event.ticketPrice.toFixed(2)}
        </Typography>

        {countLoading ? (
          <CircularProgress size={18} sx={{ mt: 1 }} />
        ) : (
          <Typography sx={{ mt: 1 }}>
            <strong>Tickets left:</strong> {ticketsLeft}
          </Typography>
        )}

        {/* ---- placeholder; purchase flow next slice ---- */}
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            disabled={ticketsLeft === 0}
            onClick={refetchCount} // temporary refresh
          >
            {ticketsLeft === 0 ? "Sold Out" : "Buy Ticket"}
          </Button>
          <Button
            variant="outlined"
            onClick={refetchCount}
            disabled={countLoading}
          >
            Refresh Count
          </Button>
        </Stack>
      </SectionWrapper>
    </PageContainer>
  );
}
