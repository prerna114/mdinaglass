"use client";
import { useMenuStore } from "@/store/useCategoryStore";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
// const { loading } = useMenuStore.getState();
import Image from "next/image";
import InstantLink from "../InstantClick";
import { createImage } from "@/constant";
import { useParams } from "next/navigation";
import { join } from "path";

const SearchGrid = ({ products }) => {
  console.log("Products in Grid", products);
  const params = useParams();
  const allParams = useMemo(() => params?.params || [], [params]);
  const priceIndex = allParams.findIndex((p) => p === "price");
  const [categryIds, setCategoryIds] = useState();
  const [imgSrcs, setImgSrcs] = useState([]);
  const [errorImage, setErrorImage] = useState("/assets/nothere.png");

  const categoryIds = useMemo(
    () =>
      priceIndex !== -1
        ? allParams.slice(0, priceIndex).map(Number)
        : allParams.map(Number)
        ? allParams.map(Number)
        : "1",
    [allParams, priceIndex]
  );

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

  const createLink = () => {
    products[0]?.categories;
  };

  const handleImgError = (index) => {
    setImgSrcs((prev) =>
      prev.map((img, i) => (i === index ? { ...img, fallback: true } : img))
    );
  };
  console.log("categoryIds", imgSrcs);
  console.log("productsGRID", products[0]?.categories);

  const getCategoryPath = (product) => {
    const path = [];

    // Only process the first category
    const category = product?.categories?.[0];
    if (!category) return "";

    let current = category.parent;

    // Traverse and collect only the first two non-root parents
    while (current && current.slug !== "root") {
      path.unshift(current.id); // unshift to reverse the order
      current = current.parent;
    }
    console.log("getCategoryPath", `/${path.join("/")}`);
    // setCategoryIds(path.join("/"));
    return `${path.join("/")}`;
  };

  return (
    <div className="row">
      {products?.length > 0 &&
        products?.map((product, index) => {
          const categoryPath = getCategoryPath(product);

          return (
            <div key={product.id} className="col-lg-4 col-md-6 mb-4">
              <div className="product-card">
                <div className="position-relative">
                  <InstantLink
                    href={{
                      pathname: `/product-details/webshop/${`${categoryPath}/${product?.id}/${product?.slug}/${product.sku}`}`,
                    }}
                    onClick={() => getCategoryPath(product)}
                  >
                    <Image
                      src={
                        imgSrcs[index]?.fallback
                          ? "/assets/nothere.png"
                          : imgSrcs[index]?.url || "/assets/nothere.png"
                      }
                      onError={() => handleImgError(index)}
                      className="card-img-top"
                      alt={product.name || "product list image"}
                      width={214}
                      height={214}
                    />
                  </InstantLink>
                </div>
                <div className="card-body text-center">
                  <InstantLink
                    href={{
                      pathname: `/product-details/webshop/${`${categryIds}/${product?.id}/${product?.slug}/${product.sku}`}`,
                    }}
                    scroll={false}
                  >
                    <h6 className="card-title mb-3">
                      {product.name.slice(0, 50)}
                      {product?.name?.length > 50 && "..."}
                    </h6>
                  </InstantLink>
                  <p className="card-text text-info fw-bold">
                    Price €
                    {product?.min_price
                      ? isNaN(Number(product?.min_price))
                        ? product.min_price
                        : Number(product?.min_price).toFixed(2)
                      : Number(product?.price)
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

export default React.memo(SearchGrid);
