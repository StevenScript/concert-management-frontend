import React from "react";
import { Link } from "react-router";
import {
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Grid,
} from "@mui/material";
import useFetchData from "../hooks/useFetchData";
import {
  PageContainer,
  SectionWrapper,
  Title,
} from "../utils/StyledComponents";
import ArtistCard from "../components/cards/ArtistCard";

export default function ArtistList() {
  const {
    data: artists,
    isLoading,
    isError,
    error,
  } = useFetchData("http://localhost:8080/artists");

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

        {!isLoading && !isError && Array.isArray(artists) && (
          <Grid container spacing={3}>
            {artists.map((a) => (
              <Grid key={a.id} item xs={12} sm={6} md={4}>
                <ArtistCard artist={a} />
              </Grid>
            ))}
          </Grid>
        )}
      </SectionWrapper>
    </PageContainer>
  );
}
