import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../Header";
import "@testing-library/jest-dom";

describe("Header component", () => {
  test("renders the title", () => {
    render(<Header />);
    const titleElement = screen.getByText(/Concert Management/i);
    expect(titleElement).toBeInTheDocument();
  });
});
