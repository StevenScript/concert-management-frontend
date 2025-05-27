import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

export default function VenueCard({ venue }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

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
        background: isLight
          ? "linear-gradient(145deg,#f1f5f9 0%,#ffffff 100%)"
          : "linear-gradient(145deg,#1e293b 0%,#334155 100%)",
        backdropFilter: "blur(8px)",
      }}
      onClick={() => navigate(`/venues/${venue.id}`)}
    >
      <CardHeader
        title={venue.name}
        titleTypographyProps={{
          fontWeight: 600,
          color: theme.palette.text.primary,
        }}
      />
      <CardContent sx={{ pt: 0.5 }}>
        <Typography
          variant="body2"
          color={isLight ? "text.secondary" : "grey.300"}
        >
          {venue.location} · {venue.capacity} capacity
        </Typography>
      </CardContent>
    </Card>
  );
}
