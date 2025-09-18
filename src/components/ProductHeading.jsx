import { ProductLists } from "@/store/product";
import React from "react";

function ProductHeading() {
  const { heading, description } = ProductLists((state) => state);
  const decodeHtmlEntities = (str) => {
    if (!str) return "";
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  };
  const cleanDescription = decodeHtmlEntities(
    description
      ?.replace(/<[^>]*>/g, "") // remove HTML tags
      .trim()
  );
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
        {/* {description
          ?.replace(/<[^>]*>/g, "") // remove all HTML tags
          .replace(/&nbsp;/g, " ") // replace &nbsp; with a space
          .trim()} */}
        {cleanDescription}
      </p>
    </div>
  );
}

export default ProductHeading;
