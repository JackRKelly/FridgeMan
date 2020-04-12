import React from "react";
import "./recipes.scss";

const Recipes = ({ email }) => {
  document.title = "FridgeMan - Recipes";

  return (
    <div className="recipes page">
      <div className="recipe-content">
        <h1>Recipes</h1>
      </div>
    </div>
  );
};

export default Recipes;
