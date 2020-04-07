import React from "react";
import "./home.scss";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Fridge Man</h1>
      <p>You can view your stock <Link to="/stocks">here</Link>. You can also edit the location list <Link to="/locations">locations</Link>.</p>
    </div>
  );
};

export default Home;
