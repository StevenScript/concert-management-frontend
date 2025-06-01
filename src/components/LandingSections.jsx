import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Container, Box, Typography, Skeleton } from "@mui/material";
import { motion } from "framer-motion";

import api from "../api/apiClient";
import EventCard from "./cards/EventCard";
import ArtistCard from "./cards/ArtistCard";
import VenueCard from "./cards/VenueCard";

/* ---------- animated section shell ---------- */
const Section = ({ title, children }) => (
  <Box
    component={motion.section}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true, amount: 0.3 }}
    sx={{ py: { xs: 8, md: 10 } }}
  >
    <Typography
      variant="h4"
      sx={{ fontWeight: 700, mb: 4, textAlign: "center" }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

/* ---------- main landing component ---------- */
export default function LandingSections({ limit = 8 }) {
  /* fetch once – no auth required */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["landingStats", limit],
    queryFn: () =>
      api
        .get("/stats/landing", { params: { limit } })
        .then((response) => response.data),
  });

  /* graceful loader */
  if (isLoading)
    return (
      <Container sx={{ py: 8 }}>
        <Skeleton variant="rectangular" height={260} />
      </Container>
    );
  if (isError || !data) return null; // fail silently on home page

  /* safe-guard destructure */
  const {
    topEvents = [],
    upcomingEvents = [],
    newestEvents = [],
    topArtists = [],
    hotVenues = [],
  } = data;

  /* ---------- helper that always renders ≤8 cards in 2×4 grid ---------- */
  const renderGrid = (items, CardComp, mapProps) => (
    <Container disableGutters maxWidth="lg">
      <Box
        sx={{
          mx: "auto",
          px: { xs: 1, md: 0 },
          display: "grid",
          gap: { xs: 2, md: 3 },
          /* desktop 4-cols · tablet 2-cols · mobile 1-col */
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
        }}
      >
        {items.slice(0, 8).map((it) => (
          <CardComp key={it.id} {...mapProps(it)} />
        ))}
      </Box>
    </Container>
  );

  /* ---------- five sections ---------- */
  return (
    <>
      <Section title="Top Events">
        {renderGrid(topEvents, EventCard, (e) => ({
          event: e,
          venueName: e.venue?.name,
        }))}
      </Section>

      <Section title="Upcoming (next 7 days)">
        {renderGrid(upcomingEvents, EventCard, (e) => ({
          event: e,
          venueName: e.venue?.name,
        }))}
      </Section>

      <Section title="Newest Events">
        {renderGrid(newestEvents, EventCard, (e) => ({
          event: e,
          venueName: e.venue?.name,
        }))}
      </Section>

      <Section title="Top Artists">
        {renderGrid(topArtists, ArtistCard, (a) => ({ artist: a }))}
      </Section>

      <Section title="Hottest Venues">
        {renderGrid(hotVenues, VenueCard, (v) => ({ venue: v }))}
      </Section>
    </>
  );
}
