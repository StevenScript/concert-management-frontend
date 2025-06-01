import React, { useState, useEffect } from "react";
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

// Derive base URL from CRA env var or fallback to localhost
const BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

export default function ArtistDetails() {
  const { artistId } = useParams();

  /* ---------- artist ---------- */
  const {
    data: artist,
    isLoading: loadingArtist,
    isError: artistError,
    error: artistErr,
  } = useFetchData(`${BASE}/artists/${artistId}`);

  /* ---------- events ---------- */
  const {
    data: events = [],
    isLoading: loadingEvents,
    isError: eventsError,
  } = useFetchData(`${BASE}/artists/${artistId}/events`);

  /* ---------- tickets-left map {eventId: left} ---------- */
  const [leftMap, setLeftMap] = useState({});
  const [loadingLeft, setLoadingLeft] = useState(true);

  useEffect(() => {
    if (events.length === 0) {
      setLoadingLeft(false);
      return;
    }
    const fetchAll = async () => {
      const entries = await Promise.all(
        events.map(async (e) => {
          const res = await fetch(`${BASE}/events/${e.id}/tickets-left`);
          const left = await res.json();
          return [e.id, left];
        })
      );
      setLeftMap(Object.fromEntries(entries));
      setLoadingLeft(false);
    };
    fetchAll();
  }, [events]);

  /* ---------- guards ---------- */
  if (loadingArtist) {
    return (
      <PageContainer>
        <CircularProgress data-testid="loading-indicator" />
      </PageContainer>
    );
  }

  if (artistError || eventsError) {
    const msg = artistErr?.message || "Failed to load data";
    return (
      <PageContainer>
        <Typography color="error" data-testid="error-message">
          {msg}
        </Typography>
      </PageContainer>
    );
  }

  /* ---------- derive unique venues ---------- */
  const venues = events
    .map((e) => e.venue)
    .filter(Boolean)
    .reduce((acc, v) => {
      if (!acc.some((x) => x.id === v.id)) acc.push(v);
      return acc;
    }, []);

  const fmtDate = (iso) =>
    new Intl.DateTimeFormat("en-CA").format(new Date(iso));

  /* ---------- render ---------- */
  return (
    <PageContainer>
      <SectionWrapper>
        <Title>Artist Details</Title>

        <Typography>
          <strong>Name:</strong> {artist.stageName || artist.name}
        </Typography>
        <Typography>
          <strong>Genre:</strong> {artist.genre}
        </Typography>
        <Typography>
          <strong>Home City:</strong> {artist.homeCity ?? artist.home_city}
        </Typography>
        <Typography>
          <strong>Members:</strong>{" "}
          {artist.membersCount ?? artist.members_count}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* ---- events ---- */}
        <Typography variant="h6">Upcoming Events</Typography>
        {loadingEvents || loadingLeft ? (
          <CircularProgress size={24} />
        ) : events.length === 0 ? (
          <Typography>No upcoming events.</Typography>
        ) : (
          <List data-testid="events-list">
            {events.map((e) => (
              <ListItem key={e.id}>
                <ListItemText
                  primary={e.name ?? `Event #${e.id}`}
                  secondary={`${fmtDate(e.eventDate)} — Tickets left: ${
                    leftMap[e.id] ?? "N/A"
                  }`}
                />
              </ListItem>
            ))}
          </List>
        )}

        <Divider sx={{ my: 2 }} />

        {/* ---- venues ---- */}
        <Typography variant="h6">Venues</Typography>
        {loadingEvents ? (
          <CircularProgress size={24} />
        ) : venues.length === 0 ? (
          <Typography>No venues linked yet.</Typography>
        ) : (
          <List data-testid="venues-list">
            {venues.map((v) => (
              <ListItem key={v.id}>
                <ListItemText primary={v.name} secondary={v.location} />
              </ListItem>
            ))}
          </List>
        )}
      </SectionWrapper>
    </PageContainer>
  );
}
