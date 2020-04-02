import React from "react";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Fridge Man</h1>
      <p>You can view your stock <a href="stocks">here</a>. You can also edit the location list <a href="locations">here</a>.</p>
    </div>
  );
};

export default Home;
