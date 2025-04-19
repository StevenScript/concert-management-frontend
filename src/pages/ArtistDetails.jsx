import React from "react";
import { useParams } from "react-router";
import { Typography, CircularProgress } from "@mui/material";
import useFetchData from "../hooks/useFetchData";
import {
  PageContainer,
  SectionWrapper,
  Title,
} from "../utils/StyledComponents";

function ArtistDetails() {
  const { artistId } = useParams();

  const { data, isLoading, isError, error } = useFetchData(
    `http://localhost:8080/artists/${artistId}`
  );

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
        <Typography variant="h6" color="error" data-testid="error-message">
          {error.message}
        </Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SectionWrapper>
        <Title>Artist Details</Title>
        <Typography>
          <strong>Name:</strong> {data.name}
        </Typography>
        <Typography>
          <strong>Genre:</strong> {data.genre}
        </Typography>
        <Typography>
          <strong>Home City:</strong> {data.home_city}
        </Typography>
      </SectionWrapper>
    </PageContainer>
  );
}

export default ArtistDetails;
