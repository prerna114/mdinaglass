import { ProductLists } from "@/store/product";
import React from "react";

function ProductHeading() {
  const { heading } = ProductLists((state) => state);
  return (
    <div className="header-product">
      <h5>SHOP</h5>
      <h1> {heading ? heading : "Sets"}</h1>
    </div>
  );
}

export default ProductHeading;
