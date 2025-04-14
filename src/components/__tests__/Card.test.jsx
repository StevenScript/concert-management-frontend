import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "../Card";

describe("Card component", () => {
  test("renders title and description, and action button", () => {
    const onActionClick = jest.fn();
    render(
      <Card
        title="Test Title"
        description="Test description"
        actionLabel="Click me"
        onActionClick={onActionClick}
      />
    );

    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    expect(screen.getByText(/test description/i)).toBeInTheDocument();
    expect(screen.getByText(/click me/i)).toBeInTheDocument();
  });

  test("renders image when provided", () => {
    render(<Card image="https://via.placeholder.com/150" title="Test Title" />);

    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveAttribute(
      "src",
      "https://via.placeholder.com/150"
    );
  });

  test("calls onActionClick handler when action button is clicked", () => {
    const onActionClick = jest.fn();
    render(
      <Card
        title="Test Title"
        description="Test description"
        actionLabel="Click me"
        onActionClick={onActionClick}
      />
    );

    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);
    expect(onActionClick).toHaveBeenCalledTimes(1);
  });
});
