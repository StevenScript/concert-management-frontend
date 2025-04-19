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
  const { data, isLoading, isError, error } = useFetchData("/artists");

  if (isLoading) {
    // wrap in a div with the test‑id
    return (
      <div data-testid="loading-indicator">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    // similarly wrap the error message
    return (
      <div data-testid="error-message">
        <Typography color="error">{error.message}</Typography>
      </div>
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
