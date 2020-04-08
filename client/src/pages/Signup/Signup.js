import React, { useState } from "react";
import "./signup.scss";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [checkPassword, setCheckPassword] = useState({
    charCount: false,
    upperCase: false,
    lowerCase: false,
    number: false,
  });

  const uppercaseCheck = RegExp("(?=.*[A-Z])");
  const numberCheck = RegExp("(?=.*[0-9])");
  const lowercaseCheck = RegExp("(?=.*[a-z])");

  const verifyPassword = (pass) => {
    setCheckPassword({
      charCount: pass.length > 8,
      upperCase: uppercaseCheck.test(pass),
      lowerCase: lowercaseCheck.test(pass),
      number: numberCheck.test(pass),
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const body = { email, password };
    await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url;
        }
        return response.json();
      })
      .catch((err) => {
        setErrorMessage(err);
      });
  };

  return (
    <div className="signup page">
      <form
        onSubmit={(e) => {
          handleSignup(e);
        }}
        className="signup"
      >
        <h1>Signup</h1>
        <div className="error">
          <p
            className="error-message"
            style={{ display: errorMessage ? "inline-block" : "none" }}
          >
            {errorMessage}
          </p>
        </div>

        <div className="signup-input">
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
        <div className="signup-input">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              verifyPassword(e.target.value);
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className="password-requirements">
          <h3>Password Requirements</h3>
          <ul>
            <li style={{ color: checkPassword.charCount ? "green" : "red" }}>
              - More Than 8 Characters
            </li>
            <li style={{ color: checkPassword.number ? "green" : "red" }}>
              - At Least 1 Number
            </li>
            <li style={{ color: checkPassword.upperCase ? "green" : "red" }}>
              - At Least 1 Capitol Letter
            </li>
            <li style={{ color: checkPassword.lowerCase ? "green" : "red" }}>
              - At Least 1 Lowercase Letter
            </li>
          </ul>
        </div>
        <div className="btn-container">
          <button>Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
