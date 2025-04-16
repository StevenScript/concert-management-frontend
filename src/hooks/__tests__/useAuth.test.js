import axios from "axios";
import React from "react";
import { renderHook, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../contexts/AuthContext";

jest.mock("axios");

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe("useAuth hook", () => {
  test("should set the user on login and reset on logout", async () => {
    // 1) Mock the login response
    axios.post.mockResolvedValue({
      data: {
        user: { username: "testuser", role: "user" },
        token: "abc123",
      },
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    // initial state: no user
    expect(result.current.user).toBeNull();

    // perform login (async)
    await act(async () => {
      await result.current.login("testuser", "password");
    });

    // user should now include username, role, and token
    expect(result.current.user).toEqual({
      username: "testuser",
      role: "user",
      token: "abc123",
    });

    // perform logout
    act(() => {
      result.current.logout();
    });

    // user should be cleared
    expect(result.current.user).toBeNull();
  });
});
