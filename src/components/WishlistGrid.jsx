"use client";
import { useMenuStore } from "@/store/useCategoryStore";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
// const { loading } = useMenuStore.getState();
import Image from "next/image";
import InstantLink from "./InstantClick";
import { getWishList } from "@/api/productApi";
import { CustomToast } from "./CustomToast";

const WishlistGrid = () => {
  const [products, setProducts] = useState([]);

  const getTheWistList = async () => {
    const response = await getWishList();
    if (response.status === 200) {
      setProducts(response.data.wishlist);
    } else {
      CustomToast("Somethin went wrong", "top-right");
    }

    console.log("Wishlist response", response);
  };

  useEffect(() => {
    getTheWistList();
  }, []);

  console.log("Wishlist products", products);
  return (
    <div className="row">
      {products?.length > 0 &&
        products?.map((product, index) => {
          return (
            <div key={product.id} className="col-lg-4 col-md-6 mb-4 mt-5">
              <div className="product-card">
                <div className="position-relative">
                  <div
                    style={{
                      position: "absolute",
                      top: "-37px",
                      right: "-25px",
                      // backgroundColor: "#c6302c",
                    }}
                  >
                    <Image
                      src={"/assets/dustbin.png"}
                      style={{
                        cursor: "pointer",
                        width: "30px",
                        height: "30px",
                      }}
                      //   onError={() => handleImgError(index)}
                      className="card-img-top"
                      alt={product.name || "product list image"}
                      width={20}
                      height={20}
                    />
                  </div>

                  <InstantLink
                    // href={{
                    //   pathname: `/product-details/webshop/${`${categryIds}/${product?.id}/${product?.slug}/${product.sku}`}`,
                    // }}
                    href={"/"}
                  >
                    <Image
                      src={"/assets/nothere.png"}
                      //   onError={() => handleImgError(index)}
                      className="card-img-top"
                      alt={product.name || "product list image"}
                      width={214}
                      height={214}
                    />
                  </InstantLink>
                </div>
                <div className="card-body text-center">
                  <InstantLink
                    // href={{
                    //   pathname: `/product-details/webshop/${`${categryIds}/${product?.id}/${product?.slug}/${product.sku}`}`,
                    // }}
                    href={"/"}
                    scroll={false}
                  >
                    <h6 className="card-title mb-3">
                      {product?.product?.name.slice(0, 50)}
                      {product?.product?.name?.length > 50 && "..."}
                    </h6>
                  </InstantLink>
                  <p className="card-text text-info fw-bold">
                    Price €
                    {product?.product?.price
                      ? isNaN(Number(product?.product?.price))
                        ? product.product.price
                        : Number(product?.product?.price).toFixed(2)
                      : "0.00"}
                    {/* {product?.min_price
                      ? isNaN(Number(product?.min_price))
                        ? product.min_price
                        : Number(product?.min_price).toFixed(2)
                      : Number(product?.price)
                      ? Number(product?.price).toFixed(2)
                      : "0"} */}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default React.memo(WishlistGrid);
