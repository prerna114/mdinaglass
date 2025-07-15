"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { useParams, useSearchParams } from "next/navigation";
import { getProductByID } from "@/api/productApi";
import { ProductLists } from "@/store/product";
import dynamic from "next/dynamic";

const ProductDetails = dynamic(() => import("@/components/ProductDetails"), {
  ssr: false,
  loading: () => <span className="visually-hidden">Loading...</span>,
});

const ProductShow = dynamic(() => import("@/components/ProductShow"), {
  ssr: true,
  loading: () => <span className="visually-hidden">Loading...</span>,
});

const SideMenu = dynamic(() => import("@/components/SideMenu"), {
  ssr: true,
  loading: () => <span className="visually-hidden">Loading...</span>,
});

const page = () => {
  const { heading } = ProductLists((state) => state);

  const [productDetails, setProductDetails] = useState();
  const searchParams = useSearchParams();
  const sku = searchParams.get("sku");
  const productId = searchParams.get("id");

  const params = useParams();

  console.log("paramsdsdsds", params, productId);
  const getProductDetails = async () => {
    // const data = await getProductByID(params?.productId);
    const data = await getProductByID(productId);
    console.log("getProductDetails", data);
    // if()
    if (data?.status == 200) {
      setProductDetails(data?.data?.data);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  console.log("Product details", productDetails);
  return (
    <>
      {/* <Header /> */}
      {/* <MegaMenu /> */}

      <div
        style={{
          background: "#f1f1f1",
        }}
      >
        <div className="header-product bg-white">
          <h1>{heading}</h1>
          <h5>
            We offer a selection of affordable contemporary costume jewellery
            with glass beads.
          </h5>
        </div>
        <div className="container">
          <div className="category-sidebar">
            <div className="category-bg">
              <div className="row  min-vh-100">
                {/* Category Sidebar */}
                <div className="col-lg-3 col-md-12  p-0">
                  <SideMenu />
                  {/* <CategorySidebar cateogryId={params?.productId} /> */}
                </div>
                {/* Product Listing */}
                <div className="col-lg-9 col-md-12">
                  <div className="container">
                    <ProductDetails productDetails={productDetails} />
                  </div>
                  <ProductShow productDetails={productDetails} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer/> */}
    </>
  );
};

export default page;
