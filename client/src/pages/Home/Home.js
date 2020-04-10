import React from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import HeroIcon from "../../assets/images/HeroIcon";
import MagnifyingGlass from "../../assets/images/MagnifyingGlass";

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
      <svg
        version="1.1"
        className="seperator circle"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1920 100"
      >
        <path d="M1920,0C1152,100,768,100,0,0L1920,0z" />
      </svg>

      <section className="features">
        <span className="background-text">Features</span>
        <div className="feature-content">
          <h3>Check Out --</h3>
          <h1>Our Features</h1>
          <ul>
            <li className="card">
              <div className="card-icon">
                <MagnifyingGlass />
              </div>

              <div className="card-text">
                <h4>Customizability</h4>
                <p>
                  Fridge Man allows you to customize your experience with ease.
                </p>
              </div>
            </li>
            <li className="card">
              <img />
              <div className="card-text">
                <h4>Searchability</h4>
                <p>
                  Fridge Man allows you to navigate your stock list with ease.
                </p>
              </div>
            </li>
            <li className="card">
              <img />
              <div className="card-text">
                <h4>Expiration</h4>
                <p>
                  Manage the expiration dates on your stocks to make sure no
                  food is wasted.
                </p>
              </div>
            </li>
            <li className="card">
              <img />
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
    </div>
  );
};

export default Home;
