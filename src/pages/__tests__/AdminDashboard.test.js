import React from "react";
import { render, screen } from "@testing-library/react";
import AdminDashboard from "../admin/AdminDashboard";

describe("AdminDashboard", () => {
  test('renders heading "Admin Dashboard"', () => {
    render(<AdminDashboard />);
    expect(
      screen.getByRole("heading", { name: /admin dashboard/i })
    ).toBeInTheDocument();
  });
});
