import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import ProtectedRoute from "../ProtectedRoute";
import { useAuth } from "../../contexts/AuthContext";

// Mock our auth hook
jest.mock("../../contexts/AuthContext");

describe("ProtectedRoute", () => {
  afterEach(() => jest.resetAllMocks());

  test("unauthenticated users are redirected to /login", () => {
    useAuth.mockReturnValue({ user: null });

    render(
      <MemoryRouter initialEntries={["/admin/dashboard"]}>
        <Routes>
          <Route
            path="/login"
            element={<div data-testid="login-page">Login</div>}
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <div data-testid="secret">Admin Dashboard</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("login-page")).toBeInTheDocument();
    expect(screen.queryByTestId("secret")).toBeNull();
  });

  test("non-admin users are redirected to /login", () => {
    useAuth.mockReturnValue({
      user: { username: "jane", role: "user", token: "..." },
    });

    render(
      <MemoryRouter initialEntries={["/admin/artists"]}>
        <Routes>
          <Route
            path="/login"
            element={<div data-testid="login-page">Login</div>}
          />
          <Route
            path="/admin/artists"
            element={
              <ProtectedRoute requiredRole="admin">
                <div data-testid="manage-artists">Manage Artists</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("login-page")).toBeInTheDocument();
    expect(screen.queryByTestId("manage-artists")).toBeNull();
  });

  test("admin users see the protected content", () => {
    useAuth.mockReturnValue({
      user: { username: "admin", role: "admin", token: "..." },
    });

    render(
      <MemoryRouter initialEntries={["/admin/tickets"]}>
        <Routes>
          <Route
            path="/admin/tickets"
            element={
              <ProtectedRoute requiredRole="admin">
                <div data-testid="manage-tickets">Manage Tickets</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("manage-tickets")).toBeInTheDocument();
  });
});
