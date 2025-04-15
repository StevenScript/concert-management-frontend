import React from "react";
import { render, screen } from "@testing-library/react";
import ManageArtists from "../admin/ManageArtists";

describe("ManageArtists Page", () => {
  test('renders "Manage Artists" heading', () => {
    render(<ManageArtists />);
    const heading = screen.getByRole("heading", { name: /manage artists/i });
    expect(heading).toBeInTheDocument();
  });

  test("renders a table or list with artist data placeholder", () => {
    render(<ManageArtists />);
    const placeholder = screen.getByText(/table of artists goes here/i);
    expect(placeholder).toBeInTheDocument();
  });
});
