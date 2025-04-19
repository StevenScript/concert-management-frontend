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
              <Paper
                key={artist.id}
                elevation={2}
                style={{ marginBottom: "1rem" }}
              >
                <ListItem>
                  <ListItemText
                    primary={artist.stageName || artist.username || artist.name}
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
