import React from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import HeroIcon from "../../assets/images/HeroIcon";
import MagnifyingGlass from "../../assets/images/MagnifyingGlass";
import Wrench from "../../assets/images/Wrench";
import QuestionMark from "../../assets/images/QuestionMark";
import HourGlass from "../../assets/images/HourGlass";

const Home = () => {
  document.title = "FridgeMan - Home";

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
            their stocks. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Duis porta lacus eu mi malesuada rutrum. Curabitur tincidunt
            velit id turpis pellentesque tincidunt. Nullam vitae dolor id massa
            scelerisque placerat et in dui.
          </p>
        </div>
      </section>
      <section className="signup">
        <span className="background-text">Signup</span>
        <div className="signup-content">
          <h3>Signup Form</h3>
          <h1>Join Us</h1>
          <form className="signup-form">
            <div className="input-container">
              <div className="signup-input">
                <label htmlFor="email">Email</label>
                <input
                  placeholder="Enter Email Here"
                  type="email"
                  name="email"
                />
              </div>
              <div className="signup-input">
                <label htmlFor="password">Password</label>
                <input
                  placeholder="Enter Password Here"
                  name="password"
                  type="password"
                />
              </div>
            </div>

            <div className="requirements">
              <h5>Password Requirements:</h5>
              <ul>
                <li>At least 8 characters</li>
                <li>At least 1 uppercase letter</li>
                <li>At least 1 lowercase letter</li>
                <li>At least 1 number</li>
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

export default Home;
