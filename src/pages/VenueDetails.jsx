import React from "react";
import { useParams } from "react-router";
import {
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import useFetchData from "../hooks/useFetchData";
import {
  PageContainer,
  SectionWrapper,
  Title,
} from "../utils/StyledComponents";

const API = "http://localhost:8080";

export default function VenueDetails() {
  const { venueId } = useParams();

  /* ---------- venue ---------- */
  const {
    data: venue,
    isLoading: loadingVenue,
    isError: venueErr,
    error: venueError,
  } = useFetchData(`${API}/venues/${venueId}`);

  /* ---------- upcoming events ---------- */
  const { data: events = [], isLoading: loadingEvents } = useFetchData(
    `${API}/venues/${venueId}/upcoming-events`
  );

  /* ---------- artists ---------- */
  const { data: artists = [], isLoading: loadingArtists } = useFetchData(
    `${API}/venues/${venueId}/artists`
  );

  /* ---------- guards ---------- */
  if (loadingVenue) {
    return (
      <PageContainer>
        <CircularProgress data-testid="loading-indicator" />
      </PageContainer>
    );
  }

  if (venueErr) {
    return (
      <PageContainer>
        <Typography color="error" data-testid="error-message">
          {venueError.message}
        </Typography>
      </PageContainer>
    );
  }

  const fmtDate = (iso) =>
    new Intl.DateTimeFormat("en-CA").format(new Date(iso));

  /* ---------- render ---------- */
  return (
    <PageContainer>
      <SectionWrapper>
        <Title>Venue Details</Title>

        <Typography>
          <strong>Name:</strong> {venue.name}
        </Typography>
        <Typography>
          <strong>Location:</strong> {venue.location}
        </Typography>
        <Typography>
          <strong>Capacity:</strong> {venue.capacity}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* ---- events ---- */}
        <Typography variant="h6">Upcoming Events</Typography>
        {loadingEvents ? (
          <CircularProgress size={24} />
        ) : events.length === 0 ? (
          <Typography>No upcoming events.</Typography>
        ) : (
          <List data-testid="events-list">
            {events.map((e) => (
              <ListItem key={e.id}>
                <ListItemText
                  primary={e.name ?? `Event #${e.id}`}
                  secondary={fmtDate(e.eventDate)}
                />
              </ListItem>
            ))}
          </List>
        )}

        <Divider sx={{ my: 2 }} />

        {/* ---- artists ---- */}
        <Typography variant="h6">Booked Artists</Typography>
        {loadingArtists ? (
          <CircularProgress size={24} />
        ) : artists.length === 0 ? (
          <Typography>No artists booked yet.</Typography>
        ) : (
          <List data-testid="artists-list">
            {artists.map((a) => (
              <ListItem key={a.id}>
                <ListItemText primary={a.stageName} secondary={a.genre} />
              </ListItem>
            ))}
          </List>
        )}
      </SectionWrapper>
    </PageContainer>
  );
}
