import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function EventCard({ event, venueName }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  /* ---------- derived values ---------- */
  const dateFmt = new Intl.DateTimeFormat("en-CA").format(
    new Date(event.eventDate)
  );

  // Prefer the new field; fall back to legacy availableTickets
  const ticketsLeft =
    event.ticketsLeft != null ? event.ticketsLeft : event.availableTickets;

  const soldOut = ticketsLeft === 0;
  const lowInventory = ticketsLeft > 0 && ticketsLeft <= 10; // tweak as you like
  const chipsColor = soldOut
    ? "error.main"
    : lowInventory
    ? "warning.main"
    : "primary.main";
  const chipsLabel = soldOut ? "Sold Out" : `${ticketsLeft} tickets left`;

  /* ---------- render ---------- */
  return (
    <Card
      component={motion.div}
      whileHover={{
        y: -6,
        rotate: -1,
        boxShadow: isLight
          ? "0 12px 25px rgba(0,0,0,.15)"
          : "0 12px 25px rgba(0,0,0,.35)",
      }}
      transition={{ type: "spring", stiffness: 250 }}
      sx={{
        cursor: "pointer",
        borderRadius: 4,
        overflow: "visible",
        background: isLight
          ? "linear-gradient(145deg,#f1f5f9 0%,#ffffff 100%)"
          : "linear-gradient(145deg,#1e293b 0%,#334155 100%)",
        backdropFilter: "blur(8px)",
      }}
      onClick={() => navigate(`/events/${event.id}`)}
    >
      {/* ---------- header ---------- */}
      <CardHeader
        title={event.name}
        subheader={dateFmt}
        sx={{ pb: 0 }}
        titleTypographyProps={{ fontWeight: 600, color: "text.primary" }}
      />

      {/* ---------- body ---------- */}
      <CardContent sx={{ pt: 1 }}>
        <Typography
          variant="body2"
          color={isLight ? "text.secondary" : "grey.300"}
        >
          {venueName ?? " "} · ${event.ticketPrice.toFixed(2)}
        </Typography>

        <Box sx={{ mt: 1 }}>
          <Typography
            variant="caption"
            sx={{ color: chipsColor, fontWeight: 600 }}
          >
            {chipsLabel}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
