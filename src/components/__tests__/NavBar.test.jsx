import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import NavBar from "../Navbar";

describe("NavBar component", () => {
  test("renders with correct navigation links", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Artists")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();
    expect(screen.getByText("Venues")).toBeInTheDocument();
  });
});
