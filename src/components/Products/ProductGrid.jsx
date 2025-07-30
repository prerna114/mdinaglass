import { useMenuStore } from "@/store/useCategoryStore";
import Link from "next/link";
import React from "react";
// const { loading } = useMenuStore.getState();
import Image from "next/image";
import InstantLink from "../InstantClick";
import { createImage } from "@/constant";

const ProductGrid = ({ products, categoryidList }) => {
  console.log("Products in Grid", products);
  return (
    <div className="row">
      {products?.length > 0 &&
        products?.map((product) => (
          <div key={product.id} className="col-lg-4 col-md-6 mb-4">
            <div className=" product-card">
              <div className="position-relative">
                <InstantLink
                  href={{
                    pathname: `/product-details/webshop/${`1/${product?.id}/${product?.slug}`}`,
                  }}
                >
                  <Image
                    // src={"/assets/bg-image.png"}
                    src={
                      product?.images?.length > 0
                        ? product.images[0].url
                        : createImage(product.sku)
                    }
                    className="card-img-top"
                    alt={product.name || "product list image"}
                    width={214}
                    height={214}
                  />
                </InstantLink>

                {/* {product.hasOptions && (
                  <div className="m-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`options-${product.id}`}
                      />
                      <label
                        className="form-check-label small text-muted"
                        htmlFor={`options-${product.id}`}
                      >
                        Click for more options
                      </label>
                    </div>
                  </div>
                )} */}
              </div>
              <div className="card-body text-center">
                <InstantLink
                  href={{
                    pathname: `/product-details/webshop/${`1/${product?.id}/${product?.slug}`}`,
                  }}
                  scroll={false}
                  // href={"#"}
                  onClick={() => {
                    // console.log("dsada", product);
                  }}
                >
                  <h6 className="card-title mb-3">{product.name}</h6>
                </InstantLink>
                {/* <h6 className="card-title mb-3">{product.name}</h6> */}
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
        ))}
    </div>
  );
};

export default React.memo(ProductGrid);
