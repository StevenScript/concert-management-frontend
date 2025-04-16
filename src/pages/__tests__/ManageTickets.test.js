import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import ManageTickets from "../admin/ManageTickets";

jest.mock("axios");

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const renderWithClient = (ui) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

describe("ManageTickets Page", () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  test("renders loading indicator then table of tickets", async () => {
    const dummyTickets = [
      {
        id: 1,
        buyer_name: "Alice",
        seat_number: "A1",
        ticket_type: "VIP",
        event_id: 10,
      },
      {
        id: 2,
        buyer_name: "Bob",
        seat_number: "B2",
        ticket_type: "General",
        event_id: 11,
      },
    ];

    // simulate network delay
    axios.get.mockImplementation(
      () =>
        new Promise((res) => setTimeout(() => res({ data: dummyTickets }), 50))
    );

    renderWithClient(<ManageTickets />);

    // initial loading spinner
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

    // then the rows should appear
    await waitFor(() => screen.getByTestId("ticket-1"));
    expect(screen.getByTestId("ticket-1")).toHaveTextContent("Alice");
    expect(screen.getByTestId("ticket-2")).toHaveTextContent("Bob");
  });

  test("renders error message on fetch failure", async () => {
    const errorMsg = "Network Error";
    axios.get.mockRejectedValueOnce(new Error(errorMsg));

    renderWithClient(<ManageTickets />);

    // wait for error to appear
    await waitFor(() => screen.getByTestId("error-message"));
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });
});
