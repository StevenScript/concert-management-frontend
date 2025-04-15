import React from "react";
import { render, screen } from "@testing-library/react";
import Register from "../Register";

describe("Register Page", () => {
  test('renders heading "Register"', () => {
    render(<Register />);
    const heading = screen.getByRole("heading", { name: /register/i });
    expect(heading).toBeInTheDocument();
  });
});
