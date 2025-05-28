import React from "react";
import { Typography, CircularProgress, Box, Container } from "@mui/material";
import useFetchData from "../hooks/useFetchData";
import {
  PageContainer,
  SectionWrapper,
  Title,
} from "../utils/StyledComponents";
import ArtistCard from "../components/cards/ArtistCard";

export default function ArtistList() {
  const {
    data: artists = [],
    isLoading,
    isError,
    error,
  } = useFetchData("http://localhost:8080/artists");

  /* ---- alpha sort once data arrives ---- */
  const sorted = [...artists].sort((a, b) =>
    a.stageName.toLowerCase().localeCompare(b.stageName.toLowerCase(), "en", {
      sensitivity: "base",
    })
  );

  return (
    <PageContainer>
      <SectionWrapper>
        <Title>Artists</Title>

        {isLoading && <CircularProgress data-testid="loading-indicator" />}

        {isError && (
          <Typography color="error" data-testid="error-message">
            {error.message}
          </Typography>
        )}

        {!isLoading && !isError && (
          <Container
            /* the outer container just keeps everything centred */
            sx={{ maxWidth: 1600, px: { xs: 1, md: 0 }, mx: "auto" }}
          >
            <Box
              sx={{
                display: "grid",
                gap: { xs: 2, md: 3 },
                /* one rule that works for every width */
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              }}
            >
              {sorted.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  sx={{
                    height: "100%", // 💡 card fills its grid cell
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
