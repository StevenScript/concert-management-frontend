import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
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
    refetch,
  } = useFetchData("http://localhost:8080/events/upcoming"); // ← backend already returns soonest→latest

  return (
    <PageContainer>
      <SectionWrapper>
        <Title>Upcoming Events</Title>

        {isLoading && <CircularProgress data-testid="loading-indicator" />}
        {isError && (
          <Typography color="error" data-testid="error-message">
            {error.message} &nbsp;
            <span onClick={refetch} style={{ cursor: "pointer" }}>
              (retry)
            </span>
          </Typography>
        )}

        {!isLoading && !isError && Array.isArray(events) && (
          <List>
            {events.map((e) => (
              <Paper key={e.id} elevation={2} sx={{ mb: 2 }}>
                <ListItem
                  component={Link}
                  to={`/events/${e.id}`}
                  sx={{ textDecoration: "none" }}
                >
                  <ListItemText
                    primary={e.name}
                    secondary={`${new Intl.DateTimeFormat("en-CA").format(
                      new Date(e.eventDate)
                    )}  •  $${e.ticketPrice.toFixed(2)} Per Ticket •  ${
                      e.availableTickets
                    } Tickets`}
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        )}
      </SectionWrapper>
    </PageContainer>
  );
}
