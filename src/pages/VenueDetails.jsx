import React from "react";
import { useParams } from "react-router";
import { Typography, CircularProgress } from "@mui/material";
import useFetchData from "../hooks/useFetchData";
import {
  PageContainer,
  SectionWrapper,
  Title,
} from "../utils/StyledComponents";

export default function VenueDetails() {
  const { venueId } = useParams();

  const { data, isLoading, isError, error } = useFetchData(
    `http://localhost:8080/venues/${venueId}`
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
        <Typography color="error" data-testid="error-message">
          {error.message}
        </Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SectionWrapper>
        <Title>Venue Details</Title>
        <Typography>
          <strong>ID:</strong> {data.id}
        </Typography>
        <Typography>
          <strong>Name:</strong> {data.name}
        </Typography>
        <Typography>
          <strong>Location:</strong> {data.location}
        </Typography>
        <Typography>
          <strong>Capacity:</strong> {data.capacity}
        </Typography>
      </SectionWrapper>
    </PageContainer>
  );
}
