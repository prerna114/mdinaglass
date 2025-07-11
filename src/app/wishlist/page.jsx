"use client";

import ProductHeading from "@/components/ProductHeading";
import ProductListing from "@/components/ProductListing";

import React from "react";
import SideMenu from "@/components/SideMenu";

const ShopPage = () => {
  return (
    <>
      {/* <Header /> */}
      {/* <MegaMenu /> */}
      <ProductHeading />
      <div
        style={{
          background: "#f1f1f1",
        }}
      >
        <div className="category-sidebar">
          <div className="container category-bg">
            <div className="row  min-vh-100">
              {/* Category Sidebar */}
              <div className="col-lg-3 col-md-12 p-0">
                <SideMenu />
              </div>
              {/* Product Listing */}
              <div className="col-lg-9 col-md-12">
                <ProductListing />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default ShopPage;
