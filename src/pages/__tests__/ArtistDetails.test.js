import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ArtistDetails from "../ArtistDetails";
import { MemoryRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

jest.mock("axios");

// Create a QueryClient instance with retries disabled for testing.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Create a render helper that wraps our component in both QueryClientProvider and a MemoryRouter.
// We define a Route that maps the URL pattern '/artists/:artistId' to our ArtistDetails component.
const renderWithProviders = (ui, { route = "/artists/1" } = {}) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/artists/:artistId" element={ui} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("ArtistDetails page", () => {
  beforeEach(() => {
    // Clear the react-query cache between tests.
    queryClient.clear();
  });

  test("displays loading indicator then renders artist details", async () => {
    const dummyArtist = {
      id: 1,
      name: "Artist 1",
      genre: "Rock",
      home_city: "New York",
    };

    // Simulate a delayed successful response by returning a promise that resolves after 100ms.
    axios.get.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ data: dummyArtist }), 100)
        )
    );

    // Render the ArtistDetails component.
    renderWithProviders(<ArtistDetails />, { route: "/artists/1" });

    // Assert the loading indicator is visible initially.
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

    // Wait until the component has loaded the data.
    await waitFor(() =>
      expect(screen.getByText(/Artist Details/i)).toBeInTheDocument()
    );

    // Verify that the dummy artist details are rendered.
    expect(screen.getByText(/Name: Artist 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Genre: Rock/i)).toBeInTheDocument();
    expect(screen.getByText(/Home City: New York/i)).toBeInTheDocument();
  });

  test("displays error message when axios request fails", async () => {
    const errorMessage = "Network Error";
    // Simulate a network error.
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    // Render the ArtistDetails component.
    renderWithProviders(<ArtistDetails />, { route: "/artists/1" });

    // Wait until the error element is rendered.
    await waitFor(() =>
      expect(screen.getByTestId("error-message")).toBeInTheDocument()
    );

    // Assert that the error message text matches the mocked error message.
    expect(screen.getByTestId("error-message").textContent).toEqual(
      errorMessage
    );
  });
});
