import React from "react";
import { render, screen } from "@testing-library/react";
import ArtistDetails from "../ArtistDetails";

describe("ArtistDetails Page", () => {
  test('renders an "Artist Details" heading', () => {
    render(<ArtistDetails />);
    const heading = screen.getByRole("heading", { name: /artist details/i });
    expect(heading).toBeInTheDocument();
  });
});
