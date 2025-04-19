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

export default function EventList() {
  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useFetchData("http://localhost:8080/events");

  return (
    <PageContainer>
      <SectionWrapper>
        <Title>Events</Title>

        {isLoading && <CircularProgress data-testid="loading-indicator" />}

        {isError && (
          <Typography color="error" data-testid="error-message">
            {error.message}
          </Typography>
        )}

        {!isLoading && !isError && Array.isArray(events) && (
          <List>
            {events.map((event) => (
              <Paper
                key={event.id}
                elevation={2}
                style={{ marginBottom: "1rem" }}
              >
                <ListItem>
                  <ListItemText primary={event.name || `${event.eventDate}`} />
                </ListItem>
              </Paper>
            ))}
          </List>
        )}
      </SectionWrapper>
    </PageContainer>
  );
}
