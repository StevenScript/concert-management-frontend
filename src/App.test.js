import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MainApp from "./MainApp";

describe("App Integration", () => {
  test("renders Header and Footer on any page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MainApp />
      </MemoryRouter>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  test("renders Home page by default route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MainApp />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/welcome to the concert site/i)
    ).toBeInTheDocument();
  });

  test("navigates to /artists and shows ArtistList page", () => {
    render(
      <MemoryRouter initialEntries={["/artists"]}>
        <MainApp />
      </MemoryRouter>
    );

    const artistPageHeading = screen.getByRole("heading", {
      name: /^artists$/i,
    });
    expect(artistPageHeading).toBeInTheDocument();
  });
});
