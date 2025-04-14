import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../Form";

describe("Form component", () => {
  test("renders fields and submits with correct values", () => {
    const onSubmit = jest.fn();
    const fields = [
      { name: "firstName", label: "First Name", required: true },
      { name: "lastName", label: "Last Name", required: true },
    ];
    const initialValues = { firstName: "", lastName: "" };

    render(
      <Form
        initialValues={initialValues}
        fields={fields}
        onSubmit={onSubmit}
        submitLabel="Submit"
      />
    );

    // Access input fields by label text
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    // Simulate user typing into the inputs
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });

    // Simulate form submission by clicking the submit button
    fireEvent.click(submitButton);

    // Assert that the onSubmit handler is called with the correct values
    expect(onSubmit).toHaveBeenCalledWith({
      firstName: "John",
      lastName: "Doe",
    });
  });
});
