import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = { email, password };
    await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      }
    });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          handleLogin(e);
        }}
        className="login"
      >
        <h1>Login</h1>
        <div className="login-input">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className="login-input">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <p className="no-login">
          No login? Signup <Link to="/signup">here</Link>.
        </p>
        <div className="btn-container">
          <button>Login</button>
        </div>
      </form>
    </>
  );
};

export default Login;
