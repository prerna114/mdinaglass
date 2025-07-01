"use client";

import CategorySidebar from "@/components/CategorySidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductHeading from "@/components/ProductHeading";
import ProductListing from "@/components/ProductListing";
import MegaMenu from "@/components/Megamenu";
import React from "react";
import CateogoryTree from "@/components/CateogoryTree";

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
                {/* <CategorySidebar /> */}
                <CateogoryTree />
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
