import React from "react";
import { render, screen } from "@testing-library/react";
import VenueList from "../VenueList";

describe("VenueList Page", () => {
  test('renders the heading "Venues"', () => {
    render(<VenueList />);
    const heading = screen.getByRole("heading", { name: /venues/i });
    expect(heading).toBeInTheDocument();
  });
});
