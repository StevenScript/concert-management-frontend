import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

export default function EventCard({ event, venueName }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const dateFmt = new Intl.DateTimeFormat("en-CA").format(
    new Date(event.eventDate)
  );

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
        borderRadius: 4,
        cursor: "pointer",
        overflow: "visible",
        background: isLight
          ? "linear-gradient(145deg,#f1f5f9 0%,#ffffff 100%)"
          : "linear-gradient(145deg,#1e293b 0%,#334155 100%)",
        backdropFilter: "blur(8px)",
      }}
      onClick={() => navigate(`/events/${event.id}`)}
    >
      <CardHeader
        title={event.name}
        subheader={dateFmt}
        sx={{ pb: 0 }}
        titleTypographyProps={{
          fontWeight: 600,
          color: theme.palette.text.primary,
        }}
      />

      <CardContent sx={{ pt: 1 }}>
        <Typography
          variant="body2"
          color={isLight ? "text.secondary" : "grey.300"}
        >
          {venueName} · ${event.ticketPrice.toFixed(2)}
        </Typography>

        <Box sx={{ mt: 1 }}>
          <Typography
            variant="caption"
            sx={{ color: isLight ? "primary.main" : "#93c5fd" }}
          >
            {event.availableTickets} tickets left
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
