import React from "react";
import { Card, CardHeader, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

export default function EventCard({ event, venueName }) {
  const navigate = useNavigate();
  const dateFmt = new Intl.DateTimeFormat("en-CA").format(
    new Date(event.eventDate)
  );

  return (
    <Card
      component={motion.div}
      whileHover={{
        y: -6,
        boxShadow: "0 12px 25px rgba(0,0,0,.15)",
        rotate: -1,
      }}
      transition={{ type: "spring", stiffness: 250 }}
      sx={{
        borderRadius: 4,
        background:
          "linear-gradient(145deg, rgba(255,255,255,.6) 0%, rgba(255,255,255,.9) 100%)",
        backdropFilter: "blur(8px)",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/events/${event.id}`)}
    >
      <CardHeader
        title={event.name}
        subheader={dateFmt}
        sx={{ pb: 0 }}
        titleTypographyProps={{ fontWeight: 600 }}
      />
      <CardContent sx={{ pt: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {venueName} · ${event.ticketPrice.toFixed(2)}
        </Typography>

        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" color="primary">
            {event.availableTickets} tickets left
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
