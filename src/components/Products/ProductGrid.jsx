"use client";
import { useMenuStore } from "@/store/useCategoryStore";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
// const { loading } = useMenuStore.getState();
import Image from "next/image";
import InstantLink from "../InstantClick";
import { createImage } from "@/constant";
import { useParams } from "next/navigation";
import { ProductLists } from "@/store/product";
import { useCartStore } from "@/store";
import { fetchCart } from "@/app/hooks/useCart";
import { CustomToast, SuccessToast } from "../CustomToast";
import { addCartGuest, addToTheCart } from "@/api/CartApi";

const ProductGrid = ({ products, categoryidList }) => {
  console.log("Products in Grid");
  const params = useParams();
  const allParams = useMemo(() => params?.params || [], [params]);
  const priceIndex = allParams.findIndex((p) => p === "price");
  const [categryIds, setCategoryIds] = useState();
  const [imgSrcs, setImgSrcs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const { addToCart, cart, clearCart, setCartTotal, setAllCart } = useCartStore(
    (state) => state
  );

  const [errorImage, setErrorImage] = useState("/assets/nothere.png");
  const { heading, setHeading, setDescription } = ProductLists(
    (state) => state
  );
  const categoryIds = useMemo(
    () =>
      priceIndex !== -1
        ? allParams.slice(0, priceIndex).map(Number)
        : allParams.map(Number)
        ? allParams.map(Number)
        : "1",
    [allParams, priceIndex]
  );

  useState(() => {
    if (categoryIds?.length > 0 && !categoryIds.some(Number.isNaN)) {
      setCategoryIds(categoryIds.join("/"));
    } else {
      setCategoryIds([1]);
    }
  }, [categoryIds]);

  useEffect(() => {
    if (products?.length > 0) {
      setImgSrcs(
        products.map((item) => ({
          url: item?.images[0]?.url
            ? item?.images[0]?.url
            : createImage(item.sku),
          fallback: false,
          id: item.id,
        }))
      );
    }
  }, []);

  // const handleImgError = (index) => {
  //   setImgSrcs((prev) =>
  //     prev.map((img, i) => (i === index ? { ...img, fallback: true } : img))
  //   );
  // };

  const handleImgError = (index) => {
    setImgSrcs((prev) =>
      prev.map((img, i) =>
        i === index
          ? { ...img, url: "/assets/dummyimage.jpg", error: true }
          : img
      )
    );
  };

  const addItemCart = async (product) => {
    const data = localStorage.getItem("is_voucher");
    if (data == 1) {
      CustomToast(
        "Complete voucher purchase or remove from cart to add item in cart"
      );
      return;
    }
    setLoadingProductId(product.id);
    const tokenData = localStorage.getItem("token");
    const parsed = tokenData ? JSON.parse(tokenData) : null;
    const accessToken = parsed?.token;

    setLoading(true);
    if (accessToken) {
      const data = await addToTheCart(product?.sku, 1);

      if (data.status == 200) {
        clearCart();
        console.log("data", data);
        addToCart(data.data.cart.items);
        setLoading(false);

        SuccessToast("Item added Successfuly", "top-right");
      } else {
        CustomToast("Something went Wrong", "top-right");
        setLoading(false);
      }
    } else {
      const guestToken = localStorage.getItem("guestToken");
      addGuestCart(product, guestToken);
      // addToCart({ ...product, quantity: "1" });
      // SuccessToast("Item added Successfuly", "top-right");
    }
    console.log("Add", product);

    // setLoading(false);
  };

  const addGuestCart = async (product, guestToken) => {
    setLoading(true);
    setLoadingProductId(product.id);

    console.log("guestToken", product);
    const data = await addCartGuest(product?.sku, "1", guestToken);
    console.log("addCartGuest", data, guestToken);

    if (data?.status === 200) {
      SuccessToast("Item added to cart", "top-right");
      localStorage.setItem("guestToken", data.data?.guest_token);
      setLoading(false);

      // addToCart(data.data?.cart.items);
      await fetchCart();
    } else {
      setLoading(false);

      CustomToast("Something went wrong", "top-right");
    }
  };
  console.log("categoryIddeds Product", allParams);
  console.log("productsproducts", products);

  return (
    <div className="row">
      {products?.length > 0 &&
        products?.map((product, index) => {
          const [imgSrc, setImgSrc] = useState(createImage(product.sku));

          return (
            <div key={product.id} className="col-lg-4 col-md-6 mb-4">
              <div className="product-card">
                <div className="position-relative">
                  <InstantLink
                    href={{
                      pathname: `/product-details/webshop/${`${categryIds}/${product?.id}/${product?.slug}/${product.sku}`}`,
                    }}
                    onClick={() => {
                      // setHeading(product?.range);
                      // setDescription(product?.description);
                    }}
                  >
                    <img
                      src={
                        imgSrcs[index]?.fallback
                          ? "/assets/dummyimage.jpg"
                          : imgSrcs[index]?.url || "/assets/dummyimage.jpg"
                      }
                      onError={() => handleImgError(index)}
                      className="card-img-top"
                      alt={product?.name || "product list image"}
                      // width={auto}
                      // height={auto}
                    />
                  </InstantLink>
                </div>
                {product?.type == "configurable" && (
                  <div className="m-2">
                    <InstantLink
                      href={{
                        pathname: `/product-details/webshop/${`${categryIds}/${product?.id}/${product?.slug}/${product.sku}`}`,
                      }}
                      onClick={() => {
                        // setHeading(product?.range);
                        // setDescription(product?.description);
                      }}
                    >
                      <div
                        style={{
                          display: "inline-block",
                        }}
                      >
                        <span className="plusblock">+</span>
                        <span
                          style={{
                            cursor: "pointer",
                            fontSize: "14px",
                            color: "#337ab7",
                            fontFamily: "Raleway, sans-serif",
                          }}
                          // htmlFor={`options-${product.id}`}
                        >
                          Click for more options
                        </span>
                      </div>
                    </InstantLink>
                  </div>
                )}

                <div className="card-body text-center">
                  <InstantLink
                    href={{
                      pathname: `/product-details/webshop/${`${categryIds}/${product?.id}/${product?.slug}/${product.sku}`}`,
                    }}
                    scroll={false}
                    onClick={() => {
                      // setHeading(product?.range);
                      // setDescription(product?.description);
                    }}
                  >
                    <h6 className="card-title mb-3">
                      {product?.name?.slice(0, 50)}
                      {product?.name?.length > 50 && "..."}
                    </h6>
                  </InstantLink>
                  <p className="card-text text-info fw-bold">
                    Price €
                    {Number(product?.price)
                      ? Number(product?.price).toFixed(2)
                      : "0"}
                  </p>

                  {product?.type == "simple" &&
                  !product.sku?.toLowerCase().includes("gift") &&
                  !product.sku?.toLowerCase().includes("voucher") ? (
                    <div className="new-arrival-design">
                      <button
                        className="btn btn-outline-secondary  w-100"
                        onClick={() => {
                          addItemCart(product);
                        }}
                      >
                        {loading && product.id === loadingProductId ? (
                          <div
                            className="spinner-border text-dark"
                            role="status"
                          ></div>
                        ) : (
                          <div>Add to Cart</div>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="new-arrival-design">
                      <button
                        onClick={() => {
                          // addItemCart(product);
                        }}
                        style={{
                          // display: "none",
                          visibility: "hidden",
                        }}
                      >
                        {/* {loading && product.id === loadingProductId ? (
                          <div
                            className="spinner-border text-dark"
                            role="status"
                          ></div>
                        ) : (
                          <div>Add to Cart</div>
                        )} */}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default React.memo(ProductGrid);
