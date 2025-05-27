import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function HeroSection() {
  return (
    <ParallaxProvider>
      <Box
        sx={{
          height: { xs: "70vh", md: "85vh" },
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #ec4899 100%)",
        }}
      >
        {/* headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", color: "#fff", zIndex: 2 }}
        >
          <Typography variant="h2" fontWeight={800}>
            Find&nbsp;Your&nbsp;Next Concert
          </Typography>
          <Typography sx={{ mt: 1, mb: 3, opacity: 0.9 }}>
            Browse events · Discover artists · Secure tickets
          </Typography>
          <Button
            component={Link}
            to="/events"
            variant="contained"
            size="large"
            sx={{
              px: 4,
              background: "linear-gradient(90deg,#f97316 0%,#facc15 100%)",
            }}
          >
            Browse Events
          </Button>
        </motion.div>
      </Box>
    </ParallaxProvider>
  );
}
