import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router"; // ← v6-style router bindings
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import VenueDetails from "../VenueDetails";

jest.mock("axios");

// disable retries so errors surface immediately
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const renderWithProviders = (ui, { route = "/venues/42" } = {}) =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/venues/:venueId" element={ui} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );

describe("VenueDetails page", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  test("shows loading then venue details on success", async () => {
    const dummyVenue = {
      id: 42,
      name: "Grand Hall",
      location: "Downtown",
      capacity: 5000,
    };
    axios.get.mockImplementation(
      () =>
        new Promise((res) => setTimeout(() => res({ data: dummyVenue }), 50))
    );

    renderWithProviders(<VenueDetails />);

    // loading
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

    // then details
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /venue details/i })
      ).toBeInTheDocument()
    );
    expect(screen.getByText(/Venue ID: 42/i)).toBeInTheDocument();
    expect(screen.getByText(/Name: Grand Hall/i)).toBeInTheDocument();
    expect(screen.getByText(/Location: Downtown/i)).toBeInTheDocument();
    expect(screen.getByText(/Capacity: 5000/i)).toBeInTheDocument();
  });

  test("shows error message on failure", async () => {
    const msg = "Network Error";
    axios.get.mockRejectedValueOnce(new Error(msg));

    renderWithProviders(<VenueDetails />);

    await waitFor(() =>
      expect(screen.getByTestId("error-message")).toBeInTheDocument()
    );
    expect(screen.getByText(msg)).toBeInTheDocument();
  });
});
