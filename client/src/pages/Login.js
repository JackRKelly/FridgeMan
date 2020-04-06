import React, { useState } from "react";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("kcjackkelly@gmail.com");
  const [password, setPassword] = useState("passworddd");

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = { email, password };
    await fetch("http://localhost:5000/api/auth/login", {
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
      >
        <div className="login-input">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="login-input">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="btn-container">
          <button>Login</button>
          <p>No login? signup here</p>
        </div>
      </form>
    </>
  );
};

export default Login;
