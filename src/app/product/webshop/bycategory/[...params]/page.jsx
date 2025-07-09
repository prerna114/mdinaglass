"use client";
import ProductHeading from "../components/ProductHeading";
// import ProductListing from "../components/ProductListing";
import MegaMenu from "../components/Megamenu";
import Reac from "react";
// import SideMenu from "../components/SideMenu";
import dynamic from "next/dynamic";
// const SideMenu = dynamic(() => import("../components/SideMenu"), {
//   ssr: false,
//   loading: () => <div style={{ height: 200 }}>Loading...</div>,
// });

const SideMenu = dynamic(() => import("../components/SideMenu"), {
  ssr: false,
  loading: () => <div style={{ height: 200 }}>Loading...</div>,
});

const ProductListing = dynamic(() => import("../components/ProductListing"), {
  ssr: false,
  loading: () => <div style={{ height: 200 }}>Loading...</div>,
});

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
        <div className="category-sidebar ">
          <div className="container category-bg">
            <div className="row  min-vh-100">
              {/* Category Sidebar */}

              <div className="col-lg-3 col-md-12 p-0">
                {/* <CategorySidebar /> */}
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
