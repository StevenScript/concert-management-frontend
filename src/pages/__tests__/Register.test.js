import React from "react";
import { render, screen } from "@testing-library/react";
import Register from "../Register";

describe("Register Page", () => {
  test('renders heading "Register"', () => {
    render(<Register />);
    const heading = screen.getByRole("heading", { name: /register/i });
    expect(heading).toBeInTheDocument();
  });

  test("renders username, email and password inputs and a sign‑up button", () => {
    render(<Register />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });
});
