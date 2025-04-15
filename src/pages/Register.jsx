import React from "react";

function Register() {
  return (
    <section>
      <h1>Register</h1>
      <form>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" />

        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
}

export default Register;
