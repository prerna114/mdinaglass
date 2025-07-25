"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { useParams, useSearchParams } from "next/navigation";
import { getProductByID } from "@/api/productApi";
import { ProductLists } from "@/store/product";
import dynamic from "next/dynamic";
import ListingSkeleton from "@/components/Skeleton/ListingSkeleton";

const ProductDetails = dynamic(() => import("@/components/ProductDetails"), {
  ssr: true,
  loading: () => <span className="visually-hidden">Loading...</span>,
});

const ProductShow = dynamic(() => import("@/components/ProductShow"), {
  ssr: true,
  loading: () => <ListingSkeleton />,
});

const SideMenu = dynamic(() => import("@/components/SideMenu"), {
  ssr: true,
  loading: () => <span className="visually-hidden">Loading...</span>,
});

const page = () => {
  const { heading } = ProductLists((state) => state);
  const [productId, setProductId] = useState(null);
  const [productDetails, setProductDetails] = useState();
  const searchParams = useSearchParams();
  const sku = searchParams.get("sku");

  console.log("searchParams", searchParams);

  const params = useParams();

  console.log("paramsdsdsds", params.params[1], productId);
  const getProductDetails = async (id) => {
    // const data = await getProductByID(params?.productId);
    const data = await getProductByID(id);
    // if()
    if (data?.status == 200) {
      setProductDetails(data?.data?.product);
      console.log("getProductDetails", data.data.product);
    }
  };

  useEffect(() => {
    // getProductDetails();
  }, []);
  useEffect(() => {
    const id = params.params[1];
    if (id) {
      setProductId(id);
      // Now fetch your product
      getProductDetails(id);
    }
  }, [searchParams]);

  console.log("Product details 123", productDetails);
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
                  {productDetails?.range != null && (
                    <ProductShow productDetails={productDetails} />
                  )}
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
