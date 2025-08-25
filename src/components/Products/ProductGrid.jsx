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

const ProductGrid = ({ products, categoryidList }) => {
  console.log("Products in Grid");
  const params = useParams();
  const allParams = useMemo(() => params?.params || [], [params]);
  const priceIndex = allParams.findIndex((p) => p === "price");
  const [categryIds, setCategoryIds] = useState();
  const [imgSrcs, setImgSrcs] = useState([]);
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
          url: createImage(item.sku),
          fallback: false,
          id: item.id,
        }))
      );
    }
  }, [products]);

  const handleImgError = (index) => {
    setImgSrcs((prev) =>
      prev.map((img, i) => (i === index ? { ...img, fallback: true } : img))
    );
  };
  console.log("categoryIds", imgSrcs);
  console.log("products", products);

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
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default React.memo(ProductGrid);
