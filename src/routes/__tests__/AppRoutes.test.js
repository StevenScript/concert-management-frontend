import React from "react";
import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import AppRoutes from "../AppRoutes";

describe("AppRoutes", () => {
  test("renders Home page on /", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    const homeHeading = screen.getByRole("heading", {
      name: /welcome to the concert site/i,
    });
    expect(homeHeading).toBeInTheDocument();
  });

  test("renders ArtistList on /artists", () => {
    render(
      <MemoryRouter initialEntries={["/artists"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    const artistHeading = screen.getByRole("heading", { name: /artists/i });
    expect(artistHeading).toBeInTheDocument();
  });

  //TODO: Add more route tests as needed for /venues, /login, /admin, etc.
});
