import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../Home";

describe("Home Page", () => {
  test('renders a heading saying "Welcome to the Concert Site"', () => {
    render(<Home />);
    const heading = screen.getByRole("heading", {
      name: /welcome to the concert site/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
