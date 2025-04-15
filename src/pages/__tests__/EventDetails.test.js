import React from "react";
import { render, screen } from "@testing-library/react";
import EventDetails from "../EventDetails";

describe("EventDetails Page", () => {
  test('renders heading "Event Details"', () => {
    render(<EventDetails />);
    const heading = screen.getByRole("heading", { name: /event details/i });
    expect(heading).toBeInTheDocument();
  });
});
