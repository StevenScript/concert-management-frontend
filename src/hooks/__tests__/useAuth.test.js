import React from "react";
import { renderHook, act } from "@testing-library/react"; // Use React 18 version
import { AuthProvider, useAuth } from "../../contexts/AuthContext";

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe("useAuth hook", () => {
  test("should set the user on login and reset on logout", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    // Initial state check
    expect(result.current.user).toBeNull();

    // Simulate login
    act(() => {
      result.current.login("testuser", "password");
    });

    // Validate user after login
    expect(result.current.user).toEqual({
      username: "testuser",
      role: "user",
      token: "abc123",
    });

    // Simulate logout
    act(() => {
      result.current.logout();
    });

    // Validate user after logout
    expect(result.current.user).toBeNull();
  });
});
