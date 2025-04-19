import React from "react";
import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import AppRoutes from "../AppRoutes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Test‑only client
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const renderWithProviders = (ui, { route = "/" } = {}) =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </QueryClientProvider>
  );

describe("AppRoutes", () => {
  test("renders Home page on /", () => {
    renderWithProviders(<AppRoutes />, { route: "/" });
    const homeHeading = screen.getByRole("heading", {
      name: /welcome to the concert site/i,
    });
    expect(homeHeading).toBeInTheDocument();
  });

  test("renders ArtistList on /artists", () => {
    renderWithProviders(<AppRoutes />, { route: "/artists" });
    const artistHeading = screen.getByRole("heading", { name: /artists/i });
    expect(artistHeading).toBeInTheDocument();
  });
});
