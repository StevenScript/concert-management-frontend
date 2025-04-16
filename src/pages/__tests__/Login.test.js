import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../Login";

describe("Login Page", () => {
  test('renders heading "Login"', () => {
    render(<Login />);
    const heading = screen.getByRole("heading", { name: /login/i });
    expect(heading).toBeInTheDocument();
  });

  test("renders username and password inputs and a submit button", () => {
    render(<Login />);
    // labels ↔ inputs
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    // button
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });
});
