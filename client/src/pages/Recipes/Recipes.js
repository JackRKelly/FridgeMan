import React from "react";
import "./recipes.scss";

const Recipes = ({ username }) => {
  document.title = "FridgeMan - Recipes";

  return (
    <div className="recipes page">
      <div className="recipe-content">
        <h3>{username}</h3>
        <h1>Recipes</h1>
      </div>
    </div>
  );
};

export default Recipes;
