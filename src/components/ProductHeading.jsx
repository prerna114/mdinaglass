import { ProductLists } from "@/store/product";
import React from "react";

function ProductHeading() {
  const { heading, description } = ProductLists((state) => state);
  return (
    <div className="header-product">
      <h5
        style={{
          borderBottom: "1px solid #ccc",
          display: "inline-block",
          marginBottom: "18px",
        }}
      >
        SHOP
      </h5>
      <h1> {heading ? heading : ""}</h1>
      <p className="desc-full">
        {description
          ?.replace(/<[^>]*>/g, "") // remove all HTML tags
          .replace(/&nbsp;/g, " ") // replace &nbsp; with a space
          .trim()}
      </p>
    </div>
  );
}

export default ProductHeading;
