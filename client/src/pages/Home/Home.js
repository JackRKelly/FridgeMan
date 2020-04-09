import React from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo";

const Home = () => {
  document.title = "FridgeMan - Home";

  return (
    <div className="home page">
      <h1>Welcome to Fridge Man</h1>
      <p>
        You can view <Link to="/stocks">your stock</Link>. You can also edit the{" "}
        <Link to="/locations">location list</Link>.
      </p>
      <Logo />
    </div>
  );
};

export default Home;
