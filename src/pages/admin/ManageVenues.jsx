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

export default function ManageVenues() {
  const { data, isLoading, isError, error } = useFetchData(
    "http://example.com/api/venues"
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
        Manage Venues
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Capacity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((venue) => (
            <TableRow key={venue.id} data-testid={`venue-${venue.id}`}>
              <TableCell>{venue.name}</TableCell>
              <TableCell>{venue.location}</TableCell>
              <TableCell>{venue.capacity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
