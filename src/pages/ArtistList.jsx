import React from "react";
import { Link } from "react-router";
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
          <List>
            {artists.map((artist) => (
              <Paper key={artist.id} elevation={2} style={{ margin: "1rem 0" }}>
                <ListItem button component={Link} to={`/artists/${artist.id}`}>
                  <ListItemText primary={artist.stageName || artist.name} />
                </ListItem>
              </Paper>
            ))}
          </List>
        )}
      </SectionWrapper>
    </PageContainer>
  );
}
