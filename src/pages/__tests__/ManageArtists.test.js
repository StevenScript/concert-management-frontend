import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import ManageArtists from "../admin/ManageArtists";

jest.mock("axios");

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const renderWithClient = (ui) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

describe("ManageArtists Page", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  test("renders loading indicator then table of artists", async () => {
    const dummy = [
      {
        id: 1,
        stage_name: "Alice",
        genre: "Pop",
        home_city: "LA",
        members_count: 1,
      },
      {
        id: 2,
        stage_name: "The Rockets",
        genre: "Rock",
        home_city: "NYC",
        members_count: 4,
      },
    ];
    axios.get.mockImplementation(
      () => new Promise((res) => setTimeout(() => res({ data: dummy }), 50))
    );

    renderWithClient(<ManageArtists />);

    // loading spinner
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

    // then rows
    await waitFor(() => screen.getByTestId("artist-1"));
    expect(screen.getByTestId("artist-1")).toHaveTextContent("Alice");
    expect(screen.getByTestId("artist-2")).toHaveTextContent("The Rockets");
  });

  test("renders error message on fetch failure", async () => {
    const msg = "Network Error";
    axios.get.mockRejectedValueOnce(new Error(msg));

    renderWithClient(<ManageArtists />);
    await waitFor(() => screen.getByTestId("error-message"));
    expect(screen.getByText(msg)).toBeInTheDocument();
  });
});
