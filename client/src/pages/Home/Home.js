import React, { useState } from "react";
import "./home.scss";
import { Link } from "react-router-dom";
//Icons
import HeroIcon from "../../assets/images/HeroIcon";
import MagnifyingGlass from "../../assets/images/MagnifyingGlass";
import Wrench from "../../assets/images/Wrench";
import QuestionMark from "../../assets/images/QuestionMark";
import HourGlass from "../../assets/images/HourGlass";
import EyeIcon from "../../assets/images/EyeIcon";
import CheckMark from "../../assets/images/CheckMark";
import XMark from "../../assets/images/XMark";

const Home = ({ isMobile }) => {
  document.title = "FridgeMan - Home";

  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="home page">
      <header className="hero">
        <span className="background-text">Fridge Man</span>
        <div className="hero-content">
          <div className="left">
            <div className="left-content">
              <h3>Food Inventory Manager</h3>
              <h1>Fridge Man</h1>
              <p>
                Fridge Man is an all-in-one solution for your inventory
                management needs
              </p>
              <Link to="signup">Signup</Link>
            </div>
          </div>
          <div className="right">
            <HeroIcon />
          </div>
        </div>
      </header>
      <div className="section-divider">
        <svg
          version="1.1"
          className="separator circle"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100"
        >
          <path d="M1920,0C1152,100,768,100,0,0L1920,0z" />
        </svg>
      </div>
      <section className="features">
        <span className="background-text">Features</span>
        <div className="feature-content">
          <h3>Check Out</h3>
          <h1>Our Features</h1>
          <ul>
            <li className="card">
              <div className="card-icon">
                <Wrench />
              </div>

              <div className="card-text">
                <h4>Customizability</h4>
                <p>
                  Fridge Man allows you to customize your experience with ease.
                </p>
              </div>
            </li>
            <li className="card">
              <div className="card-icon">
                <MagnifyingGlass />
              </div>
              <div className="card-text">
                <h4>Searchability</h4>
                <p>
                  Fridge Man allows you to easily navigate your stock list to
                  find what you need.
                </p>
              </div>
            </li>
            <li className="card">
              <div className="card-icon">
                <HourGlass />
              </div>
              <div className="card-text">
                <h4>Expiration</h4>
                <p>
                  Manage the expiration dates on your stocks to make sure no
                  food is wasted.
                </p>
              </div>
            </li>
            <li className="card">
              <div className="card-icon">
                <QuestionMark />
              </div>
              <div className="card-text">
                <h4>Support</h4>
                <p>
                  Fridge Man's support team allows you to quickly resolve your
                  issues.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section className="about">
        <span className="background-text">About Us</span>
        <div className="about-content">
          <h3>Learn More</h3>
          <h1>About Us</h1>
          <p>
            Fridge Man was created by a high schooler who decided there had to
            be an easier way to manage household food stock. Fridge Man allows
            users to manage their inventory by efficiently searching and editing
            their stocks.
          </p>
        </div>
      </section>
      <section className="signup">
        <span className="background-text">Signup</span>
        <div className="signup-content">
          <h3>Signup Form</h3>
          <h1>Join Us</h1>
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
      <div className="footer-seperator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100"
        >
          <path d="M1920,0C1152,100,768,100,0,0L1920,0z" />
        </svg>
      </div>
      <footer className="home-footer">
        <span className="background-text">Fridge Man</span>
        <div className="footer-content"></div>
      </footer>
    </div>
  );
};

export default Home;
