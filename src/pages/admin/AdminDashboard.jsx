import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <section>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome, Admin! Here are the site stats.
      </Typography>

      <Stack direction="row" spacing={2} mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/admin/artists")}
        >
          Manage Artists
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/admin/venues")}
        >
          Manage Venues
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/admin/events")}
        >
          Manage Events
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => navigate("/admin/tickets")}
        >
          Manage Tickets
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/admin/users")}
        >
          Manage Users
        </Button>
      </Stack>
    </section>
  );
}

export default AdminDashboard;
