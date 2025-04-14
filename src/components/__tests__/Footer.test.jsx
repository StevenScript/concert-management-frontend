import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";
import "@testing-library/jest-dom";

describe("Footer component", () => {
  test("renders the current year and copyright message", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const footerText = screen.getByText(new RegExp(`${currentYear}`, "i"));
    expect(footerText).toBeInTheDocument();
    expect(footerText).toHaveTextContent("Concert Management");
  });
});
