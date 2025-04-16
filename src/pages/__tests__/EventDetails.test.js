import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import EventDetails from "../EventDetails";

// 1) Turn off retries so error states appear immediately:
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

jest.mock("axios");

// 2) A helper to wrap in both Router and React Query:
const renderWithProviders = (ui, { route = "/events/1" } = {}) =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/events/:eventId" element={ui} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );

describe("EventDetails page", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  test("shows loading then event details on success", async () => {
    const dummyEvent = {
      id: 1,
      name: "Rock Fest",
      event_date: "2025-07-01",
    };
    // simulate a short delay before resolve
    axios.get.mockImplementation(
      () =>
        new Promise((res) => setTimeout(() => res({ data: dummyEvent }), 50))
    );

    renderWithProviders(<EventDetails />);

    // 3) Loading spinner must show first
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

    // 4) Then the H1 and details appear
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /event details/i })
      ).toBeInTheDocument()
    );

    expect(screen.getByText(/Event ID: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Name: Rock Fest/i)).toBeInTheDocument();
    expect(screen.getByText(/Date: 2025-07-01/i)).toBeInTheDocument();
  });

  test("shows error message on failure", async () => {
    const msg = "Network Error";
    axios.get.mockRejectedValueOnce(new Error(msg));

    renderWithProviders(<EventDetails />);

    await waitFor(() =>
      expect(screen.getByTestId("error-message")).toBeInTheDocument()
    );

    expect(screen.getByText(msg)).toBeInTheDocument();
  });
});
