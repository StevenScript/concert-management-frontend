import React from "react";
import { render, screen } from "@testing-library/react";
import VenueDetails from "../VenueDetails";

describe("VenueDetails Page", () => {
  test('renders "Venue Details" heading', () => {
    render(<VenueDetails />);
    const heading = screen.getByRole("heading", { name: /venue details/i });
    expect(heading).toBeInTheDocument();
  });
});
