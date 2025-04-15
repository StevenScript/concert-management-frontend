import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

import useFetchData from "../useFetchData";

// Mock axios to avoid actual HTTP calls
jest.mock("axios");

// Create a fresh QueryClient for each test suite
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries in test environment
      },
    },
  });

// Provide the QueryClient context via QueryClientProvider
const wrapper = ({ children }) => {
  const testQueryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe("useFetchData hook", () => {
  it("should return data after loading", async () => {
    const dummyData = [{ id: 1, name: "Artist 1" }];

    // Mock axios.get to resolve with dummyData
    axios.get.mockResolvedValueOnce({ data: dummyData });

    // Render the hook
    const { result } = renderHook(
      () => useFetchData("http://example.com/api/artists"),
      { wrapper }
    );

    // Immediately after render, query is in the loading state
    expect(result.current.isLoading).toBe(true);

    // Wait for the hook to receive data
    await waitFor(() => {
      expect(result.current.data).toEqual(dummyData);
    });

    // At this point, isLoading should be false
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("should return error state when axios fails", async () => {
    const errorMessage = "Network Error";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(
      () => useFetchData("http://example.com/api/artists"),
      { wrapper }
    );

    // Wait until the hook sets isError to true
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    // The error object should match the mock error
    expect(result.current.error).toBeDefined();
    expect(result.current.error.message).toBe(errorMessage);
  });
});
