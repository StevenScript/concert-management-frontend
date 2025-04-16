import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import ManageEvents from "../admin/ManageEvents";

jest.mock("axios");

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const renderWithClient = (ui) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

describe("ManageEvents Page", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  test("renders loading indicator then table of events", async () => {
    const dummyEvents = [
      {
        id: 1,
        event_date: "2025-01-01",
        ticket_price: 100,
        available_tickets: 50,
        venue_id: 2,
      },
      {
        id: 2,
        event_date: "2025-02-02",
        ticket_price: 150,
        available_tickets: 75,
        venue_id: 3,
      },
    ];

    axios.get.mockImplementation(
      () =>
        new Promise((res) => setTimeout(() => res({ data: dummyEvents }), 50))
    );

    renderWithClient(<ManageEvents />);

    // loading spinner first
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

    // then rows show up
    await waitFor(() => screen.getByTestId("event-1"));
    expect(screen.getByTestId("event-1")).toHaveTextContent("2025-01-01");
    expect(screen.getByTestId("event-2")).toHaveTextContent("2025-02-02");
  });

  test("renders error message on fetch failure", async () => {
    const errorMsg = "Network Error";
    axios.get.mockRejectedValueOnce(new Error(errorMsg));

    renderWithClient(<ManageEvents />);

    await waitFor(() => screen.getByTestId("error-message"));
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });
});
