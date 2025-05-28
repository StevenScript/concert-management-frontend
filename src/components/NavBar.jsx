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
import HomeIcon from "@mui/icons-material/Home";
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

  /* role helper */
  const isAdmin =
    user?.role && user.role.toString().toUpperCase().includes("ADMIN");

  /* dynamic background */
  const appBarBg =
    mode === "light"
      ? "rgba(175, 49, 224, 0.9)" // violet-500 glass
      : "rgba(15,23,42,.82)"; // slate-900 glass

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor: appBarBg,
        borderBottom: "1px solid",
        borderColor:
          mode === "light" ? "rgba(0,0,0,.06)" : "rgba(255,255,255,.08)",
        color: mode === "light" ? "text.primary" : "text.secondary",
      }}
    >
      <Toolbar>
        {/* ---------- LEFT: Home + public links ---------- */}
        <Stack direction="row" spacing={1} alignItems="center">
          {/* NEW – Home icon */}
          <IconButton
            color="inherit"
            component={Link}
            to="/"
            sx={{ mr: 0.5 }}
            size="large"
          >
            <HomeIcon fontSize="inherit" />
          </IconButton>

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

        {/* ---------- CENTRE: clickable brand ---------- */}
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontWeight: 700,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Concert&nbsp;Management
        </Typography>

        {/* ---------- RIGHT: cart / auth / admin / dark-mode ---------- */}
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

          {/* Dark-mode toggle */}
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
