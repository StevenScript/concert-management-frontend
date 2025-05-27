import React from "react";
import {
  Typography,
  CircularProgress,
  List,
  Paper,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import {
  PageContainer,
  SectionWrapper,
  Title,
} from "../utils/StyledComponents";
import VenueCard from "../components/cards/VenueCard";

export default function VenueList() {
  const {
    data: venues = [],
    isLoading,
    isError,
    error,
  } = useFetchData("http://localhost:8080/venues");

  if (isLoading) {
    return (
      <PageContainer>
        <CircularProgress data-testid="loading-indicator" />
      </PageContainer>
    );
  }

  if (isError) {
    return (
      <PageContainer>
        <Typography color="error" data-testid="error-message">
          {error.message}
        </Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SectionWrapper>
        <Title>Venues</Title>
        <Grid container spacing={3}>
          {venues.map((a) => (
            <Grid key={a.id} item xs={12} sm={6} md={4}>
              <VenueCard venue={a} />
            </Grid>
          ))}
        </Grid>
      </SectionWrapper>
    </PageContainer>
  );
}
