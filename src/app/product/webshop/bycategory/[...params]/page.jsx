"use client";

import CategorySidebar from "@/components/CategorySidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductHeading from "@/components/ProductHeading";
import ProductListing from "@/components/ProductListing";
import MegaMenu from "@/components/Megamenu";
import React, { useRef } from "react";
import CateogoryTree from "@/components/CateogoryTree";

const ShopPage = () => {
  const scrollref = useRef(null);
  const onDataLoaded = () => {
    scrollref.current?.scrollIntoView({ behavior: "smooth" });
  };
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
        <div ref={scrollref} className="category-sidebar ">
          <div className="container category-bg">
            <div className="row  min-vh-100">
              {/* Category Sidebar */}

              <div className="col-lg-3 col-md-12 p-0">
                {/* <CategorySidebar /> */}
                <CateogoryTree onDataLoaded={onDataLoaded} />
              </div>
              {/* Product Listing */}
              <div className="col-lg-9 col-md-12">
                <ProductListing onDataLoaded={onDataLoaded} />
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
