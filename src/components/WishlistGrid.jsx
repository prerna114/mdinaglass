"use client";
import { useMenuStore } from "@/store/useCategoryStore";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
// const { loading } = useMenuStore.getState();
import Image from "next/image";
import InstantLink from "./InstantClick";
import { getWishList, removeItemWIshlist } from "@/api/productApi";
import { CustomToast, SuccessToast } from "./CustomToast";
import ListingSkeleton from "./Skeleton/ListingSkeleton";
import { ProductLists } from "@/store/product";

const WishlistGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { heading, setHeading, setDescription } = ProductLists(
    (state) => state
  );
  const getTheWistList = async () => {
    setLoading(true);
    const response = await getWishList();
    if (response.status === 200) {
      setProducts(response.data.wishlist);
      setLoading(false);
    } else {
      // CustomToast("Somethin went wrong", "top-right");
      setLoading(false);
    }

    console.log("Wishlist response", response);
  };

  const deleteItemFromWishlist = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmed) return;
    const response = await removeItemWIshlist(id);
    setLoading(true);

    if (response.status === 200) {
      SuccessToast("Item removed from wishlist", "top-right");
      // getTheWistList();
      let data = products.filter((item) => item.id !== id);
      setProducts(data);
      setLoading(false);
    } else {
      CustomToast("Something went wrong", "top-right");
      setLoading(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    getTheWistList();
  }, []);

  console.log("Wishlist products", products[0]?.product);
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
                      top: "-7px",
                      right: "-10px",
                      // backgroundColor: "#c6302c",
                    }}
                    onClick={() => deleteItemFromWishlist(product.id)}
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
                    href={{
                      pathname: `/product-details/webshop/${`${product?.id}/${product?.product?.sku}`}`,
                    }}
                    onClick={() => {
                      setHeading(product?.product?.range);
                      setDescription(product?.product?.description);
                    }}
                  >
                    <Image
                      // src={"/assets/nothere.png"}
                      src={
                        product?.product?.images[0]?.url ||
                        "/assets/nothere.png"
                      }
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
                    href={{
                      pathname: `/product-details/webshop/${`${1}/${
                        product?.id
                      }/${product?.product?.slug}/${product?.product?.sku}`}`,
                    }}
                    onClick={() => {
                      setHeading(product?.product?.range);
                      setDescription(product?.product?.description);
                    }}
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

      {loading && <ListingSkeleton />}
      {!loading && products?.length == 0 && (
        <div className="no-data-found">
          <h1>No data found </h1>
        </div>
      )}
    </div>
  );
};

export default React.memo(WishlistGrid);
