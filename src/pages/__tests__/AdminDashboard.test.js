import React from "react";
import { render, screen } from "@testing-library/react";
import AdminDashboard from "../admin/AdminDashboard";

describe("AdminDashboard", () => {
  test('renders heading "Admin Dashboard"', () => {
    render(<AdminDashboard />);
    const heading = screen.getByRole("heading", { name: /admin dashboard/i });
    expect(heading).toBeInTheDocument();
  });
});
