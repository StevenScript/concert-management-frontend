import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import ManageVenues from "../admin/ManageVenues";

jest.mock("axios");

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const renderWithClient = (ui) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

describe("ManageVenues Page", () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  test("renders loading indicator then table of venues", async () => {
    const dummyVenues = [
      { id: 1, name: "Stadium A", location: "New York", capacity: 5000 },
      { id: 2, name: "Arena B", location: "Los Angeles", capacity: 8000 },
    ];

    axios.get.mockImplementation(
      () =>
        new Promise((res) => setTimeout(() => res({ data: dummyVenues }), 50))
    );

    renderWithClient(<ManageVenues />);

    // initial loading spinner
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

    // then the rows should appear
    await waitFor(() => screen.getByTestId("venue-1"));
    expect(screen.getByTestId("venue-1")).toHaveTextContent("Stadium A");
    expect(screen.getByTestId("venue-1")).toHaveTextContent("New York");
    expect(screen.getByTestId("venue-2")).toHaveTextContent("Arena B");
    expect(screen.getByTestId("venue-2")).toHaveTextContent("Los Angeles");
  });

  test("renders error message on fetch failure", async () => {
    const errorMsg = "Network Error";
    axios.get.mockRejectedValueOnce(new Error(errorMsg));

    renderWithClient(<ManageVenues />);

    // wait for error to appear
    await waitFor(() => screen.getByTestId("error-message"));
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });
});
