import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";
import NavBar from "../components/NavBar";

export default function AppLayout() {
  return (
    <>
      {/* page body */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Box component="main">
          {/* >>> this is where the routed page mounts <<< */}
          <Outlet />
        </Box>
      </Container>
    </>
  );
}
