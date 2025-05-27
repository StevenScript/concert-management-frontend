import { Box, Button, Typography, Stack, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroBanner() {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        py: { xs: 8, md: 12 },
        textAlign: "center",
        background: isLight
          ? "linear-gradient(135deg,#dbeafe 0%,#e0e7ff 50%,#ffffff 100%)"
          : "linear-gradient(135deg,#0f172a 0%,#1e293b 100%)",
        color: "text.primary",
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
        Find your next&nbsp;concert
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, maxWidth: 600, mx: "auto" }}>
        Browse upcoming events, grab tickets, and manage your gigs&nbsp;— all in
        one modern interface.
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        useFlexGap
        flexWrap="wrap"
      >
        <Button
          component={Link}
          to="/events"
          size="large"
          variant="contained"
          sx={{ px: 4 }}
        >
          Browse Events
        </Button>
        <Button
          component={Link}
          to="/artists"
          size="large"
          variant="outlined"
          sx={{ px: 4 }}
        >
          Discover Artists
        </Button>
      </Stack>
    </Box>
  );
}
