"use client";

import { getRangeProduct } from "@/api/productApi";
import { createImage, createUrl } from "@/constant";
import { ProductLists } from "@/store/product";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ListingSkeleton from "./Skeleton/ListingSkeleton";
import InstantLink from "./InstantClick";
import useCategoryIdString from "@/app/hooks/useCategoryIdString ";

const ProductShow = ({ productDetails }) => {
  const params = useParams();
  const { setPagination } = ProductLists((state) => state);
  const [rangeProduct, setRangeProduct] = useState([]);
  const [prvURL, setPrvURL] = useState("/");
  const [loading, setLoading] = useState(false);
  const [categoryIds, setCategoryIds] = useState("");
  const getRange = async () => {
    const current = localStorage.getItem("currentUrl");
    setPrvURL(current || "/");
    setLoading(true);
    const data = await getRangeProduct(
      productDetails?.sku,
      productDetails?.categories?.[0]?.id
    );
    console.log("Get range", data);
    if (data.status == 200) {
      const response = data.data.products.slice(0, 6);
      setRangeProduct(response);
      setLoading(false);
    } else {
      setRangeProduct([]);
      setLoading(false);
    }
  };
  const data = useCategoryIdString();

  useEffect(() => {
    getRange();
    setCategoryIds(data);
  }, []);
  const [imgSrcs, setImgSrcs] = useState([]);

  useEffect(() => {
    if (rangeProduct?.length > 0) {
      setImgSrcs(
        rangeProduct.map((item) => ({
          url: createImage(item.sku),
          id: item.id,
        }))
      );
    }
  }, [rangeProduct]);
  const parts = categoryIds.split("/");

  parts.pop(); // Remove last element

  const result = parts.join("/");

  console.log("", productDetails, rangeProduct);
  // console.log("productDetailsProductSHo", imgSrcs);

  return (
    <>
      {rangeProduct?.length > 0 && (
        <div className="container">
          {/* <h2 className="product-show">Similar Products - {productDetails?.range}</h2> */}
          <h2 className="product-show">Similar Products</h2>

          {loading ? (
            <ListingSkeleton />
          ) : (
            <>
              <div className="row">
                {rangeProduct?.length > 0 &&
                  rangeProduct.map((product, index) => {
                    return (
                      <div
                        key={product.id}
                        className="col-lg-4 col-md-6 col-sm-12 mb-4"
                      >
                        <div className=" product-card products-show">
                          <div className="position-relative">
                            <InstantLink
                              href={{
                                pathname: `/product-details/webshop/${`${categoryIds}/${product?.id}/${product?.slug}/${product.sku}`}`,
                              }}
                            >
                              <img
                                src={imgSrcs[index]?.url}
                                onError={() =>
                                  setImgSrcs("/assets/nothere.png")
                                }
                                className="card-img-top"
                                alt={product.name}
                                style={{}}
                              />
                            </InstantLink>

                            {product.hasOptions && (
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
                            )}
                          </div>
                          <div className="card-body text-center">
                            <InstantLink
                              href={{
                                pathname: `/product-details/webshop/${`${categoryIds}/${product?.id}/${product?.slug}/${product.sku}`}`,
                              }}
                            >
                              <h6 className="card-title mb-3">
                                {product.name}
                              </h6>
                            </InstantLink>

                            <p className="card-text fw-bold">
                              Price €{Number(product.price).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="col-md-12">
                <div className="view-more  text-right button-margin float-right mb-3">
                  <Link
                    href={prvURL}
                    onClick={() => {
                      setPagination({
                        per_page: 15,
                        page: 1,
                        sort_by: "price",
                        sort_dir: "asc",
                      });
                    }}
                  >
                    <button className="btn btn-info text-white">
                      VIEW ALL
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProductShow;
