"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useCartStore } from "@/store";
import { CustomToast, SuccessToast } from "./CustomToast";
import { addToTheCart } from "@/api/CartApi";
import { useMenuStore } from "@/store/useCategoryStore";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ProductLists } from "@/store/product";
import { createUrl } from "@/constant";
import dynamic from "next/dynamic";
// import AboveMenu from "./Products/AboveMenu";
const AboveMenu = dynamic(() => import("./Products/AboveMenu"), {
  ssr: true,
  loading: () => <span className="visually-hidden">Loading...</span>,
});

// Utility function to get unique variant options
const extractUniqueOptions = (variants = []) => {
  const optionIdCount = new Map();
  const uniqueOptions = new Map();

  variants.forEach((variant) => {
    Object.entries(variant.attributes || {}).forEach(([key, value]) => {
      if (!/\d+/.test(key)) return;
      const optionId = value.option_id;
      optionIdCount.set(optionId, (optionIdCount.get(optionId) || 0) + 1);
    });
  });

  variants.forEach((variant) => {
    Object.entries(variant.attributes || {}).forEach(([key, value]) => {
      if (!/\d+/.test(key)) return;
      const { option_id, option_value } = value;
      if (optionIdCount.get(option_id) === 1 && !uniqueOptions.has(option_id)) {
        uniqueOptions.set(option_id, option_value);
      }
    });
  });

  return uniqueOptions;
};

export default function ProductDetails({ productDetails }) {
  const [quantity, setQuantity] = useState(1);
  const [levels, setLevels] = useState([]);
  const sideMenu = useMenuStore((state) => state.sideMenu);
  // const setLoading = useMenuStore((state) => state.setLoading);
  const [loading, setLaoding] = useState(false);
  const router = useRouter();

  const [categoryidList, setCategoryidList] = useState([]);

  const [selectedImage, setSelectedImage] = useState("");
  const { addToCart, clearCart } = useCartStore((state) => state);
  const cart = useCartStore((state) => state.cart);

  const imageList = useMemo(
    () => [
      "/assets/bracelet1.png",
      "/assets/Bowls.png",
      "/assets/lamp.png",
      "/assets/bracelet2.png",
    ],
    []
  );

  const uniqueOptions = useMemo(
    () => extractUniqueOptions(productDetails?.variants),
    [productDetails?.variants]
  );
  const addItemCart = async () => {
    setLaoding(true);
    const tokenData = localStorage.getItem("token");
    const parsed = tokenData ? JSON.parse(tokenData) : null;
    const accessToken = parsed?.token;
    if (accessToken) {
      const data = await addToTheCart(productDetails, quantity);
      if (data?.status === 200) {
        clearCart();
        addToCart(data.data?.cart.items);
        setLaoding(false);

        SuccessToast("Item added Successfully", "top-right");
      } else {
        setLaoding(false);

        CustomToast("Something went wrong", "top-right");
      }
      setLaoding(false);
    } else {
      console.log("quantity", quantity, typeof productDetails);

      addToCart({ ...productDetails, quantity });
      SuccessToast("Item added Successfully", "top-right");

      setLaoding(false);
    }
    setLaoding(false);
  };

  console.log("cart", cart, selectedImage, productDetails);

  useEffect(() => {
    setSelectedImage(productDetails?.images?.[0]?.url);
  }, [productDetails?.images]);
  return (
    <div className="container bg-white mt-5 mb-5 py-3">
      {/* <div className="filter-are">
        <div className="row mb-4">
          <div className="side-bar-mobi">
            <div className="row">
              <div className="col-12">
                <h4 className="mb-3">Filter</h4>

                {renderedDropdowns}
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <AboveMenu />
      <div className="row">
        {/* Product Image */}
        <div className="col-md-12 col-lg-6 mt-2">
          <div className="border text-center">
            {selectedImage && (
              <Image
                src={productDetails?.images[0]?.url || selectedImage}
                alt="Product Image"
                width={600}
                height={400}
                priority
                className="img-fluid"
              />
            )}
          </div>
          <div className="d-flex justify-content-center gap-2 mt-3">
            {productDetails?.images?.length > 0 &&
              productDetails?.images.map((src, index) => (
                <Image
                  key={index}
                  src={src.url}
                  alt={`Thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="img-thumbnail"
                  onClick={() => setSelectedImage(src.url)}
                  loading="lazy"
                  style={{
                    cursor: "pointer",
                    border:
                      selectedImage === src.url ? "2px solid #007bff" : "none",
                  }}
                />
              ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="col-md-12 col-lg-6 ">
          <div className="products-detailing">
            <h2>{productDetails?.name}</h2>
            <p className="text-muted sku-detail">
              SKU: {productDetails?.sku || "n/a"}
              <span className="wishlist float-right">
                <Heart
                  size={24}
                  color="#c6302c"
                  fill="#c6302c"
                  stroke="#c6302c"
                />
              </span>
            </p>
            <p className="sku-detail mb-0">Description </p>
            <p
              dangerouslySetInnerHTML={{
                __html: productDetails?.description || "",
              }}
            />

            <p className="sku-detail">
              Availability:
              <span className="text-success">In Stock</span>
            </p>

            <p className="sku-detail">
              Price:{" "}
              <span className="fs-4 text-dark">
                {productDetails?.formatted_price}
              </span>
            </p>

            {uniqueOptions.size > 0 && (
              <div className="mb-3">
                <label className="form-label fw-semibold">Choose:</label>
                <select className="form-select">
                  <option>Select Option</option>
                  {[...uniqueOptions.entries()].map(([optionId, label]) => (
                    <option key={optionId} value={optionId}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-4 d-flex choose-category align-items-center">
              <label
                className="form-label fw-semibold"
                style={{
                  color: "rgb(0, 94, 132)",
                }}
              >
                Quantity:
              </label>

              <select
                className="form-select w-auto"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="w-100 py-3 text-uppercase addtocart"
              onClick={addItemCart}
            >
              {loading ? (
                <div className="spinner-border text-light" role="status"></div>
              ) : (
                <div>
                  <Image
                    src="/assets/bag_white.webp"
                    alt="Cart Icon"
                    width={27}
                    height={27}
                    className="me-2"
                  />
                  Add to Cart
                </div>
              )}
            </button>

            <div className="mt-3 text-center a_color">
              <a href="#" className="me-2">
                View Cart
              </a>
              |
              <a href="#" className="ms-2">
                Add to Gift Registry
              </a>
            </div>

            <div className="mt-4 small text-muted">
              <p>
                <strong>IMPORTANT - </strong> Due to the handmade nature of our
                products, each piece is unique. Sizes are approximate. For
                matching sets, please visit our factory or contact support
                before ordering.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
