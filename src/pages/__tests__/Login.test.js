import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import axios from "axios";
import { AuthProvider } from "../../contexts/AuthContext";
import Login from "../Login";

jest.mock("axios");

function renderLogin() {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
}

test("successful login redirects to home", async () => {
  axios.post.mockResolvedValue({
    data: { user: { username: "bob", role: "user" }, token: "tok" },
  });

  renderLogin();

  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: "bob" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "secret" },
  });
  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  await waitFor(() => {
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});

test("failed login shows error", async () => {
  axios.post.mockRejectedValue(new Error("Bad creds"));

  renderLogin();

  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: "bob" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "wrong" },
  });
  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  await waitFor(() => {
    expect(screen.getByText(/bad creds/i)).toBeInTheDocument();
  });
});
