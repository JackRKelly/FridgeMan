import React from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import HeroIcon from "../../assets/images/HeroIcon";

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

      <section className="about">
        <h1>About Fridge Man</h1>
        <p>
          Ornare massa eget egestas purus viverra accumsan in nisl. Dapibus
          ultrices in iaculis nunc sed augue lacus viverra. Adipiscing elit ut
          aliquam purus sit amet luctus venenatis lectus. Odio aenean sed
          adipiscing diam donec adipiscing tristique risus. Iaculis eu non diam
          phasellus vestibulum. Arcu non sodales neque sodales ut etiam. Tellus
          in hac habitasse platea dictumst vestibulum. Sagittis aliquam
          malesuada bibendum arcu vitae elementum curabitur vitae nunc. Tellus
          mauris a diam maecenas sed enim ut sem. Amet facilisis magna etiam
          tempor orci eu lobortis elementum. Volutpat est velit egestas dui id
          ornare arcu. In nisl nisi scelerisque eu ultrices vitae auctor eu
          augue. Leo urna molestie at elementum eu facilisis. Eu mi bibendum
          neque egestas congue quisque. Est sit amet facilisis magna etiam
          tempor. Lorem ipsum dolor sit amet consectetur adipiscing. Mattis
          molestie a iaculis at erat pellentesque. Sit amet risus nullam eget
          felis. Leo duis ut diam quam nulla.
        </p>
      </section>
    </div>
  );
};

export default Home;
