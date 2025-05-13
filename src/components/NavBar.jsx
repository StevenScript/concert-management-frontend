import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Badge,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { items } = useCart();

  /* Helper: case-insensitive role check */
  const isAdmin = user?.role && user.role.toUpperCase().includes("ADMIN");

  return (
    <AppBar position="static">
      <Toolbar>
        {/* ---- left‑side public links ---- */}
        <Stack direction="row" spacing={1}>
          <Button color="inherit" component={Link} to="/artists">
            Artists
          </Button>
          <Button color="inherit" component={Link} to="/events">
            Events
          </Button>
          <Button color="inherit" component={Link} to="/venues">
            Venues
          </Button>
          {user && (
            <>
              <Button color="inherit" component={Link} to="/tickets">
                Tickets
              </Button>
              <Button color="inherit" component={Link} to="/account">
                My&nbsp;Account
              </Button>
            </>
          )}
        </Stack>

        {/* ---- title ---- */}
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
          Concert&nbsp;Management
        </Typography>

        {/* ---- right‑side auth / admin ---- */}
        <Stack direction="row" spacing={1}>
          {!user && (
            <>
              <Button color="inherit" component={Link} to="/register">
                Sign&nbsp;Up
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </>
          )}

          {user && (
            <Button color="inherit" component={Link} to="/checkout">
              <Badge badgeContent={items.length} color="secondary">
                Cart
              </Badge>
            </Button>
          )}

          {user && (
            <Button
              color="inherit"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          )}

          {isAdmin && (
            <Button color="inherit" component={Link} to="/admin/dashboard">
              Admin
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
