import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import VenueList from "../VenueList";

jest.mock("axios");

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const renderWithClient = (ui) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

describe("VenueList page", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  test("shows loading then a list of venues", async () => {
    const dummy = [
      { id: 1, name: "Hall A" },
      { id: 2, name: "Arena B" },
    ];
    axios.get.mockImplementation(
      () => new Promise((res) => setTimeout(() => res({ data: dummy }), 50))
    );

    renderWithClient(<VenueList />);
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

    await waitFor(() => screen.getByTestId("venue-1"));
    expect(screen.getByTestId("venue-1")).toHaveTextContent("Hall A");
    expect(screen.getByTestId("venue-2")).toHaveTextContent("Arena B");
  });

  test("shows error message on fetch failure", async () => {
    const msg = "Network Error";
    axios.get.mockRejectedValueOnce(new Error(msg));

    renderWithClient(<VenueList />);
    await waitFor(() => screen.getByTestId("error-message"));
    expect(screen.getByText(msg)).toBeInTheDocument();
  });
});
