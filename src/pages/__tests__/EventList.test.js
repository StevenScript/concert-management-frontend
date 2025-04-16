import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import EventList from "../EventList";

jest.mock("axios");

// Disable retries in tests
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const renderWithProviders = (ui) =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  );

describe("EventList page", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  test("shows heading, then loading, then data", async () => {
    const dummy = [
      { id: 1, name: "Event A" },
      { id: 2, name: "Event B" },
    ];
    axios.get.mockImplementation(
      () => new Promise((res) => setTimeout(() => res({ data: dummy }), 50))
    );

    renderWithProviders(<EventList />);

    // static heading
    expect(
      screen.getByRole("heading", { name: /events/i })
    ).toBeInTheDocument();

    // spinner
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

    // items appear
    await waitFor(() =>
      expect(screen.getByText("Event A")).toBeInTheDocument()
    );
    expect(screen.getByText("Event B")).toBeInTheDocument();
  });

  test("shows error message if fetch fails", async () => {
    const errMsg = "Network Error";
    axios.get.mockRejectedValueOnce(new Error(errMsg));

    renderWithProviders(<EventList />);

    expect(
      screen.getByRole("heading", { name: /events/i })
    ).toBeInTheDocument();

    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByTestId("error-message")).toBeInTheDocument()
    );
    expect(screen.getByTestId("error-message").textContent).toEqual(errMsg);
  });
});
