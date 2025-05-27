import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

export default function ArtistCard({ artist }) {
  const navigate = useNavigate();

  return (
    <Card
      component={motion.div}
      whileHover={{
        y: -6,
        boxShadow: "0 12px 25px rgba(0,0,0,.15)",
        rotate: -1, // ← same tilt
      }}
      transition={{ type: "spring", stiffness: 250 }}
      sx={{
        borderRadius: 4,
        background:
          "linear-gradient(145deg, rgba(255,255,255,.6) 0%, rgba(255,255,255,.9) 100%)",
        backdropFilter: "blur(8px)",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/artists/${artist.id}`)}
    >
      <CardHeader
        title={artist.stageName}
        subheader={artist.genre}
        titleTypographyProps={{ fontWeight: 600 }}
      />
      <CardContent sx={{ pt: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          {artist.membersCount} members · {artist.homeCity}
        </Typography>
      </CardContent>
    </Card>
  );
}
