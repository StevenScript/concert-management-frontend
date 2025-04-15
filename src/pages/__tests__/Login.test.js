import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../Login";

describe("Login Page", () => {
  test('renders heading "Login"', () => {
    render(<Login />);
    const heading = screen.getByRole("heading", { name: /login/i });
    expect(heading).toBeInTheDocument();
  });
});
