import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Typography,
  CircularProgress,
  Button,
  Stack,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import useFetchData from "../hooks/useFetchData";
import { useCart } from "../contexts/CartContext";
import {
  PageContainer,
  SectionWrapper,
  Title,
} from "../utils/StyledComponents";

const API = "http://localhost:8080";

export default function EventDetails() {
  const { eventId } = useParams();
  const { addItem } = useCart();

  /* ---------- primary event ---------- */
  const {
    data: event,
    isLoading,
    isError,
    error,
  } = useFetchData(`${API}/events/${eventId}`);

  /* ---------- tickets left ---------- */
  const {
    data: ticketsLeft,
    isLoading: loadingLeft,
    refetch: refetchLeft,
  } = useFetchData(`${API}/events/${eventId}/tickets-left`);

  /* ---------- venue ---------- */
  const { data: venue, isLoading: loadingVenue } = useFetchData(
    event ? `${API}/venues/${event.venueId}` : null,
    {
      enabled: !!event,
    }
  );

  /* ---------- artists ---------- */
  const [artists, setArtists] = useState([]);
  const [loadingArtists, setLoadingArtists] = useState(true);

  useEffect(() => {
    if (!event) return;
    const fetchArtists = async () => {
      const list = await Promise.all(
        event.artistIds.map(async (id) => {
          const res = await fetch(`${API}/artists/${id}`);
          return res.json();
        })
      );
      setArtists(list);
      setLoadingArtists(false);
    };
    fetchArtists();
  }, [event]);

  /* ---------- guards ---------- */
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

  /* ---------- helpers ---------- */
  const ticketsRemaining =
    typeof ticketsLeft === "number" ? ticketsLeft : event.availableTickets;

  const eventDateFmt = new Intl.DateTimeFormat("en-CA", {
    dateStyle: "long",
  }).format(new Date(event.eventDate));

  /* ---------- render ---------- */
  return (
    <PageContainer>
      <SectionWrapper>
        <Title>Event Details</Title>

        {/* --- basic info --- */}
        <Typography>
          <strong>Name:</strong> {event.name}
        </Typography>
        <Typography>
          <strong>Date:</strong> {eventDateFmt}
        </Typography>
        <Typography>
          <strong>Price:</strong> ${event.ticketPrice.toFixed(2)}
        </Typography>

        {/* --- tickets left --- */}
        {loadingLeft ? (
          <CircularProgress size={18} sx={{ mt: 1 }} />
        ) : (
          <Typography sx={{ mt: 1 }}>
            <strong>Tickets left:</strong> {ticketsRemaining}
          </Typography>
        )}

        <Divider sx={{ my: 2 }} />

        {/* --- venue info --- */}
        <Typography variant="h6">Venue</Typography>
        {loadingVenue ? (
          <CircularProgress size={20} />
        ) : venue ? (
          <>
            <Typography>{venue.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {venue.location}
            </Typography>
          </>
        ) : (
          <Typography>N/A</Typography>
        )}

        <Divider sx={{ my: 2 }} />

        {/* --- artists list --- */}
        <Typography variant="h6">Artists</Typography>
        {loadingArtists ? (
          <CircularProgress size={20} />
        ) : artists.length === 0 ? (
          <Typography>No artists listed.</Typography>
        ) : (
          <List dense>
            {artists.map((a) => (
              <ListItem key={a.id}>
                <ListItemText primary={a.stageName} secondary={a.genre} />
              </ListItem>
            ))}
          </List>
        )}

        {/* --- actions --- */}
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            disabled={ticketsRemaining === 0}
            onClick={() =>
              addItem({
                id: event.id,
                name: event.name,
                date: event.eventDate,
                venueName: venue?.name ?? "",
                price: event.ticketPrice,
              })
            }
          >
            {ticketsRemaining === 0 ? "Sold Out" : "Add to Cart"}
          </Button>

          <Button
            variant="outlined"
            onClick={refetchLeft}
            disabled={loadingLeft}
          >
            Refresh Count
          </Button>
        </Stack>
      </SectionWrapper>
    </PageContainer>
  );
}
