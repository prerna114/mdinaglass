import React from "react";
import InstantLink from "./InstantClick";

const RecipeIdea = () => {
  return (
    <div className="about-recipe-banner">
      <img src="/assets/recipe.png" style={{ width: "100%" }} />
      <h3>Recipe Ideas</h3>
      <p>
        We produce glassware that is both practical and decorative. We love the
        idea of our products being part of your every day living experien...
      </p>
      <InstantLink className="btn-cart" href="/recipe/recipeList">
        Read More
      </InstantLink>
    </div>
  );
};

export default RecipeIdea;
