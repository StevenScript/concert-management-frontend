import React from "react";
import {
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import useFetchData from "../hooks/useFetchData";
import {
  PageContainer,
  SectionWrapper,
  Title,
} from "../utils/StyledComponents";

export default function VenueList() {
  const {
    data = [],
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
          {data.map((v) => (
            <Paper key={v.id} elevation={2} style={{ marginBottom: "1rem" }}>
              <ListItem data-testid={`venue-${v.id}`}>
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
