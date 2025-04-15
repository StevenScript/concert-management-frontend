import React from "react";
import { render, screen } from "@testing-library/react";
import EventList from "../EventList";

describe("EventList Page", () => {
  test('renders heading "Events"', () => {
    render(<EventList />);
    const heading = screen.getByRole("heading", { name: /events/i });
    expect(heading).toBeInTheDocument();
  });
});
