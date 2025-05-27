import React from "react";
import { Routes, Route } from "react-router";
import ProtectedRoute from "./ProtectedRoute";

/* ---- layout ---- */
import AppLayout from "../layouts/AppLayout";

/* ---- public pages ---- */
import Home from "../pages/Home";
import ArtistList from "../pages/ArtistList";
import ArtistDetails from "../pages/ArtistDetails";
import EventList from "../pages/EventList";
import EventDetails from "../pages/EventDetails";
import VenueList from "../pages/VenueList";
import VenueDetails from "../pages/VenueDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Account from "../pages/Account";
import TicketList from "../pages/TicketList";
import Checkout from "../pages/Checkout";

/* ---- admin pages ---- */
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageArtists from "../pages/admin/ManageArtists";
import ManageEvents from "../pages/admin/ManageEvents";
import ManageVenues from "../pages/admin/ManageVenues";
import ManageTickets from "../pages/admin/ManageTickets";
import ManageUsers from "../pages/admin/ManageUsers";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ---------- layout wrapper ---------- */}
      <Route element={<AppLayout />}>
        {/* -------- PUBLIC -------- */}
        <Route index element={<Home />} />
        <Route path="artists" element={<ArtistList />} />
        <Route path="artists/:artistId" element={<ArtistDetails />} />
        <Route path="events" element={<EventList />} />
        <Route path="events/:eventId" element={<EventDetails />} />
        <Route path="venues" element={<VenueList />} />
        <Route path="venues/:venueId" element={<VenueDetails />} />

        {/* -------- AUTH -------- */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* -------- USER -------- */}
        <Route
          path="account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="tickets"
          element={
            <ProtectedRoute>
              <TicketList />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/* -------- ADMIN -------- */}
        <Route
          path="admin/dashboard"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/artists"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <ManageArtists />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/events"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <ManageEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/venues"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <ManageVenues />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/tickets"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <ManageTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/users"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <ManageUsers />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
