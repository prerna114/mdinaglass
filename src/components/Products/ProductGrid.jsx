"use client";
import { useMenuStore } from "@/store/useCategoryStore";
import Link from "next/link";
import React, { useMemo, useState } from "react";
// const { loading } = useMenuStore.getState();
import Image from "next/image";
import InstantLink from "../InstantClick";
import { createImage } from "@/constant";
import { useParams } from "next/navigation";

const ProductGrid = ({ products, categoryidList }) => {
  console.log("Products in Grid");
  const params = useParams();
  const allParams = useMemo(() => params?.params || [], [params]);
  const priceIndex = allParams.findIndex((p) => p === "price");
  const [categryIds, setCategoryIds] = useState();
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
  console.log("categoryIds", products);
  return (
    <div className="row">
      {products?.length > 0 &&
        products?.map((product) => {
          const [imgSrc, setImgSrc] = useState(createImage(product.sku));

          return (
            <div key={product.id} className="col-lg-4 col-md-6 mb-4">
              <div className="product-card">
                <div className="position-relative">
                  <InstantLink
                    href={{
                      pathname: `/product-details/webshop/${`${categryIds}/${product?.id}/${product?.slug}/${product.sku}`}`,
                    }}
                  >
                    <Image
                      src={imgSrc}
                      onError={() => setImgSrc("/assets/nothere.png")}
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
                    <h6 className="card-title mb-3">{product.name}</h6>
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

export default React.memo(ProductGrid);
