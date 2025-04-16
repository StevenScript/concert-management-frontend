import React from "react";
import { Routes, Route } from "react-router";

// Public Pages
import Home from "../pages/Home";
import ArtistList from "../pages/ArtistList";
import ArtistDetails from "../pages/ArtistDetails";
import EventList from "../pages/EventList";
import EventDetails from "../pages/EventDetails";
import VenueList from "../pages/VenueList";
import VenueDetails from "../pages/VenueDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageArtists from "../pages/admin/ManageArtists";
import ManageEvents from "../pages/admin/ManageEvents";
import ManageVenues from "../pages/admin/ManageVenues";
import ManageTickets from "../pages/admin/ManageTickets";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* ---------------- PUBLIC ROUTES ---------------- */}
      <Route path="/" element={<Home />} />
      <Route path="/artists" element={<ArtistList />} />
      <Route path="/artists/:artistId" element={<ArtistDetails />} />
      <Route path="/events" element={<EventList />} />
      <Route path="/events/:eventId" element={<EventDetails />} />
      <Route path="/venues" element={<VenueList />} />
      <Route path="/venues/:venueId" element={<VenueDetails />} />

      {/* Auth-Related */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ---------------- ADMIN ROUTES ---------------- */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/artists"
        element={
          <ProtectedRoute requiredRole="admin">
            <ManageArtists />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/events"
        element={
          <ProtectedRoute requiredRole="admin">
            <ManageEvents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/venues"
        element={
          <ProtectedRoute requiredRole="admin">
            <ManageVenues />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/tickets"
        element={
          <ProtectedRoute requiredRole="admin">
            <ManageTickets />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
