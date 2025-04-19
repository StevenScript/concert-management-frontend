import React from "react";
import { useParams } from "react-router";
import {
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import useFetchData from "../hooks/useFetchData";
import {
  PageContainer,
  SectionWrapper,
  Title,
} from "../utils/StyledComponents";

export default function ArtistDetails() {
  const { artistId } = useParams();

  const {
    data: artist,
    isLoading: loadingArtist,
    isError: artistError,
    error: artistErr,
  } = useFetchData(`http://localhost:8080/artists/${artistId}`);

  const { data: events, isLoading: loadingEvents } = useFetchData(
    `http://localhost:8080/artists/${artistId}/events`
  );

  const { data: venues, isLoading: loadingVenues } = useFetchData(
    `http://localhost:8080/artists/${artistId}/venues`
  );

  if (loadingArtist) {
    return (
      <PageContainer>
        <CircularProgress data-testid="loading-indicator" />
      </PageContainer>
    );
  }

  if (artistError) {
    return (
      <PageContainer>
        <Typography color="error" data-testid="error-message">
          {artistErr.message}
        </Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SectionWrapper>
        <Title>Artist Details</Title>

        <Typography>
          <strong>Name:</strong> {artist.stageName || artist.name}
        </Typography>
        <Typography>
          <strong>Genre:</strong> {artist.genre}
        </Typography>
        <Typography>
          <strong>Home City:</strong> {artist.homeCity || artist.home_city}
        </Typography>
        <Typography>
          <strong>Members:</strong>{" "}
          {artist.membersCount ?? artist.members_count}
        </Typography>

        <Divider style={{ margin: "1rem 0" }} />

        <Typography variant="h6">Upcoming Events</Typography>
        {loadingEvents ? (
          <CircularProgress size={24} />
        ) : (
          <List data-testid="events-list">
            {Array.isArray(events) &&
              events.map((e) => (
                <ListItem key={e.id}>
                  <ListItemText
                    primary={new Date(e.eventDate).toLocaleDateString()}
                    secondary={`Tickets: ${e.availableTickets}`}
                  />
                </ListItem>
              ))}
          </List>
        )}

        <Divider style={{ margin: "1rem 0" }} />

        <Typography variant="h6">Venues</Typography>
        {loadingVenues ? (
          <CircularProgress size={24} />
        ) : (
          <List data-testid="venues-list">
            {Array.isArray(venues) &&
              venues.map((v) => (
                <ListItem key={v.id}>
                  <ListItemText primary={v.name} secondary={v.location} />
                </ListItem>
              ))}
          </List>
        )}
      </SectionWrapper>
    </PageContainer>
  );
}
