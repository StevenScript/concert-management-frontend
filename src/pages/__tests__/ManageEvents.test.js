import React from "react";
import { render, screen } from "@testing-library/react";
import ManageEvents from "../admin/ManageEvents";

describe("ManageEvents Page", () => {
  test('renders "Manage Events" heading', () => {
    render(<ManageEvents />);
    const heading = screen.getByRole("heading", { name: /manage events/i });
    expect(heading).toBeInTheDocument();
  });

  test("renders a placeholder for events table", () => {
    render(<ManageEvents />);
    const placeholder = screen.getByText(/table of events goes here/i);
    expect(placeholder).toBeInTheDocument();
  });
});
