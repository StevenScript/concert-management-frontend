import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Badge,
  IconButton,
  Tooltip,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/Brightness4";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useColorMode } from "../contexts/ColorModeContext";

export default function NavBar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const { mode, toggleColorMode } = useColorMode();

  /* Helper: case-insensitive role check */
  const isAdmin =
    user?.role && user.role.toString().toUpperCase().includes("ADMIN");

  /* Dynamic colours for *this* bar */
  const bg =
    mode === "light"
      ? "rgba(255,255,255,.8)" // frosted white
      : "rgba(15,23,42,.72)"; // frosted slate-900
  const divider = mode === "light" ? "divider" : "rgba(255,255,255,.08)";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor:
          mode === "light" ? "rgba(175, 49, 224, 0.9)" : "rgba(15,23,42,.82)",
        borderBottom: "1px solid",
        borderColor:
          mode === "light" ? "rgba(0,0,0,.06)" : "rgba(255,255,255,.08)",
        color: mode === "light" ? "text.primary" : "text.secondary", // <—
      }}
    >
      <Toolbar>
        {/* ---- left public links ---- */}
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

        {/* ---- centered brand ---- */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textAlign: "center", fontWeight: 700 }}
        >
          Concert&nbsp;Management
        </Typography>

        {/* ---- right auth/admin/toggle ---- */}
        <Stack direction="row" spacing={1} alignItems="center">
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

          {/* ---- dark-mode toggle ---- */}
          <Tooltip title="Toggle dark / light">
            <IconButton onClick={toggleColorMode} sx={{ ml: 0.5 }}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
