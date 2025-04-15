import React from "react";
import { render, screen } from "@testing-library/react";
import ManageVenues from "../admin/ManageVenues";

describe("ManageVenues Page", () => {
  test('renders "Manage Venues" heading', () => {
    render(<ManageVenues />);
    const heading = screen.getByRole("heading", { name: /manage venues/i });
    expect(heading).toBeInTheDocument();
  });

  test("renders a placeholder for venue data", () => {
    render(<ManageVenues />);
    const placeholder = screen.getByText(/table of venues goes here/i);
    expect(placeholder).toBeInTheDocument();
  });
});
