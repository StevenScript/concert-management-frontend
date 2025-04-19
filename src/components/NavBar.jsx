import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router"; // <-- Changed from "react-router" to "react-router-dom"

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/artists">
          Artists
        </Button>
        <Button color="inherit" component={Link} to="/events">
          Events
        </Button>
        <Button color="inherit" component={Link} to="/venues">
          Venues
        </Button>
        <Button color="inherit" component={Link} to="/tickets">
          Tickets
        </Button>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Concert Management
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/register">
          Sign up!
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/admin/dashboard">
          Admin
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
