import React from "react";

function Login() {
  return (
    <section>
      <h1>Login</h1>
      <form>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" />

        <button type="submit">Log In</button>
      </form>
    </section>
  );
}

export default Login;
