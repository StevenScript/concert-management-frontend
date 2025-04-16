import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MainApp from "./MainApp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 1) Create a test‐only QueryClient with retries OFF
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

// 2) Helper to wrap both Router and QueryClientProvider
const renderWithProviders = (ui, { route = "/" } = {}) =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </QueryClientProvider>
  );

describe("App Integration", () => {
  test("renders Header and Footer on any page", () => {
    renderWithProviders(<MainApp />, { route: "/" });
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  test("renders Home page by default route", () => {
    renderWithProviders(<MainApp />, { route: "/" });
    expect(
      screen.getByText(/welcome to the concert site/i)
    ).toBeInTheDocument();
  });

  test("navigates to /artists and shows ArtistList page", () => {
    renderWithProviders(<MainApp />, { route: "/artists" });
    const artistPageHeading = screen.getByRole("heading", {
      name: /^artists$/i,
    });
    expect(artistPageHeading).toBeInTheDocument();
  });
});
