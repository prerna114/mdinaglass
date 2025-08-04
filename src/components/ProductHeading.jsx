import { ProductLists } from "@/store/product";
import React from "react";

function ProductHeading() {
  const { heading, description } = ProductLists((state) => state);
  return (
    <div className="header-product">
      <h5>SHOP</h5>
      <h1> {heading ? heading : ""}</h1>
      <p className="desc-full">{description?.replace(/<\/?p>/g, "")}</p>
    </div>
  );
}

export default ProductHeading;
