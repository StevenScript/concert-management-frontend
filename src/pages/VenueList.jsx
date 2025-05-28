import React from "react";
import { Typography, CircularProgress, Box, Container } from "@mui/material";
import useFetchData from "../hooks/useFetchData";
import VenueCard from "../components/cards/VenueCard";
import {
  PageContainer,
  SectionWrapper,
  Title,
} from "../utils/StyledComponents";

export default function VenueList() {
  const {
    data: venues = [],
    isLoading,
    isError,
    error,
  } = useFetchData("http://localhost:8080/venues");

  /* ---- alpha sort ---- */
  const sorted = [...venues].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase(), "en", {
      sensitivity: "base",
    })
  );

  return (
    <PageContainer>
      <SectionWrapper>
        <Title>Venues</Title>

        {isLoading && <CircularProgress data-testid="loading-indicator" />}

        {isError && (
          <Typography color="error" data-testid="error-message">
            {error.message}
          </Typography>
        )}

        {!isLoading && !isError && (
          <Container sx={{ maxWidth: 1600, px: { xs: 1, md: 0 }, mx: "auto" }}>
            <Box
              sx={{
                display: "grid",
                gap: { xs: 2, md: 3 },
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              }}
            >
              {sorted.map((venue) => (
                <VenueCard
                  key={venue.id}
                  venue={venue}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                />
              ))}
            </Box>
          </Container>
        )}
      </SectionWrapper>
    </PageContainer>
  );
}
