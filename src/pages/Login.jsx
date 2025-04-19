import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router"; // you said you’re on react‑router (not dom)
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // After login, go back to wherever they came from, or home
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label htmlFor="username-input">
        Username
        <input
          id="username-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label htmlFor="password-input">
        Password
        <input
          id="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Login</button>
      {error && <div role="alert">{error}</div>}
    </form>
  );
}
