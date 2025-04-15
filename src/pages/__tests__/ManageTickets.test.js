import React from "react";
import { render, screen } from "@testing-library/react";
import ManageTickets from "../admin/ManageTickets";

describe("ManageTickets Page", () => {
  test('renders "Manage Tickets" heading', () => {
    render(<ManageTickets />);
    const heading = screen.getByRole("heading", { name: /manage tickets/i });
    expect(heading).toBeInTheDocument();
  });

  test("renders a placeholder for tickets data", () => {
    render(<ManageTickets />);
    const placeholder = screen.getByText(/table of tickets goes here/i);
    expect(placeholder).toBeInTheDocument();
  });
});
