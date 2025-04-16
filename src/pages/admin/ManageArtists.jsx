import React from "react";
import {
  Typography,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import useFetchData from "../../hooks/useFetchData";

export default function ManageArtists() {
  const { data, isLoading, isError, error } = useFetchData(
    "http://example.com/api/artists"
  );

  if (isLoading) {
    return <CircularProgress data-testid="loading-indicator" />;
  }

  if (isError) {
    return (
      <Typography color="error" data-testid="error-message">
        {error.message}
      </Typography>
    );
  }

  return (
    <section>
      <Typography variant="h4" component="h1">
        Manage Artists
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Home City</TableCell>
            <TableCell>Members</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((artist) => (
            <TableRow key={artist.id} data-testid={`artist-${artist.id}`}>
              <TableCell>{artist.stage_name}</TableCell>
              <TableCell>{artist.genre}</TableCell>
              <TableCell>{artist.home_city}</TableCell>
              <TableCell>{artist.members_count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
