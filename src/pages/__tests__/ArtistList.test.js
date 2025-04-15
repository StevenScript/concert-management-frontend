import React from "react";
import { render, screen } from "@testing-library/react";
import ArtistList from "../ArtistList"; // Doesn't exist yet

describe("ArtistList Page", () => {
  test('renders a heading "Artists"', () => {
    render(<ArtistList />);
    const headingElement = screen.getByRole("heading", { name: /artists/i });
    expect(headingElement).toBeInTheDocument();
  });
});
