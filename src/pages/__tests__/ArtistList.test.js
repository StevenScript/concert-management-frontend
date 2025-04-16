import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import ArtistList from "../ArtistList";

jest.mock("axios");

// 1) Test-only QueryClient: disable retries
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

// 2) Wrapper for both React Query and Router
const renderWithProviders = (ui) =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  );

describe("ArtistList page", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  test("shows heading, then loading, then data", async () => {
    const dummy = [
      { id: 1, name: "Artist 1" },
      { id: 2, name: "Artist 2" },
    ];

    // simulate a brief network delay
    axios.get.mockImplementation(
      () => new Promise((res) => setTimeout(() => res({ data: dummy }), 50))
    );

    renderWithProviders(<ArtistList />);

    // the H1 is immediately there
    expect(
      screen.getByRole("heading", { name: /artists/i })
    ).toBeInTheDocument();

    // spinner next
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

    // wait for the two names to appear
    await waitFor(() =>
      expect(screen.getByText("Artist 1")).toBeInTheDocument()
    );
    expect(screen.getByText("Artist 2")).toBeInTheDocument();
  });

  test("shows error message if fetch fails", async () => {
    const errMsg = "Network Error";

    axios.get.mockRejectedValueOnce(new Error(errMsg));

    renderWithProviders(<ArtistList />);

    // heading always there
    expect(
      screen.getByRole("heading", { name: /artists/i })
    ).toBeInTheDocument();

    // spinner shows up first
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

    // then the error
    await waitFor(() =>
      expect(screen.getByTestId("error-message")).toBeInTheDocument()
    );
    expect(screen.getByTestId("error-message").textContent).toEqual(errMsg);
  });
});
