import React from "react";
import {
  Typography,
  CircularProgress,
  List,
  Paper,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
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
        <List>
          {venues.map((v) => (
            <Paper key={v.id} elevation={2} sx={{ mb: 2 }}>
              <ListItem
                button
                component={Link}
                to={`/venues/${v.id}`}
                data-testid={`venue-${v.id}`}
              >
                <ListItemText
                  primary={<strong>{v.name}</strong>}
                  secondary={`${v.location} — capacity ${v.capacity}`}
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      </SectionWrapper>
    </PageContainer>
  );
}
