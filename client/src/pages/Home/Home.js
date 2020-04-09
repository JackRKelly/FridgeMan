import React from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo";

const Home = () => {
  document.title = "FridgeMan - Home";
  
  return (
    <div className="home page">
      <h1>Welcome to Fridge Man</h1>
      <p>You can view your stock <Link to="/stocks">here</Link>. You can also edit the location list <Link to="/locations">here</Link>.</p>
      <Logo/>
    </div>
  );
};

export default Home;
