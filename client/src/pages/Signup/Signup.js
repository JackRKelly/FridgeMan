import React, { useState } from "react";
import "./signup.scss";
//Icons
import EyeIcon from "../../assets/images/EyeIcon";
import CheckMark from "../../assets/images/CheckMark";
import XMark from "../../assets/images/XMark";

const Signup = ({ isMobile }) => {
  document.title = "FridgeMan - Signup";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
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
      charCount: pass.length >= 8,
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
        //setErrorMessage(err);
      });
  };

  return (
    <div className="signup page">
      <section className="signup">
        <span className="background-text">Signup</span>
        <div className="signup-content">
          <h3>Signup Form</h3>
          <h1>Signup</h1>
          <form
            className="signup-form"
            onSubmit={(e) => {
              handleSignup(e);
            }}
          >
            <div className="input-container">
              <div className="signup-input">
                <label htmlFor="email">Email</label>
                <input
                  placeholder="example@example.com"
                  type="email"
                  name="email"
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
                  placeholder="Example123"
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    verifyPassword(e.target.value);
                    setPassword(e.target.value);
                  }}
                  required
                />
                {!isMobile ? (
                  <EyeIcon setShowPass={setShowPass} showPass={showPass} />
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="requirements">
              <h5>Password Requirements:</h5>
              <ul>
                <li>
                  <CheckMark value={checkPassword.charCount} />
                  <XMark value={checkPassword.charCount} />
                  At least 8 characters
                </li>
                <li>
                  <CheckMark value={checkPassword.upperCase} />
                  <XMark value={checkPassword.upperCase} />
                  At least 1 uppercase letter
                </li>
                <li>
                  <CheckMark value={checkPassword.lowerCase} />
                  <XMark value={checkPassword.lowerCase} />
                  At least 1 lowercase letter
                </li>
                <li>
                  <CheckMark value={checkPassword.number} />
                  <XMark value={checkPassword.number} />
                  At least 1 number
                </li>
              </ul>
            </div>
            <div className="button-container">
              <button type="signup">Signup</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Signup;
