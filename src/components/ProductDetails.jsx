"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useCartStore } from "@/store";
import { CustomToast, SuccessToast } from "./CustomToast";
import { addCartGuest, addToTheCart, getCartGuest } from "@/api/CartApi";
import { useMenuStore } from "@/store/useCategoryStore";
import { createImage } from "@/constant";
import dynamic from "next/dynamic";
import InstantLink from "./InstantClick";
import { addItemWIshlist, getWishList } from "@/api/productApi";
import { useAuthStore } from "@/store/useAuthStore";
const AboveMenu = dynamic(() => import("./Products/AboveMenu"), {
  ssr: true,
  loading: () => <span className="visually-hidden">Loading...</span>,
});

// Utility function to get unique variant options
const extractUniqueOptions = (variants = []) => {
  const optionIdCount = new Map();
  const uniqueOptions = new Map();

  // First pass: count how many times each option_id appears
  variants.forEach((variant) => {
    Object.entries(variant.attributes || {}).forEach(([key, value]) => {
      if (!/^\d+$/.test(key)) return; // skip non-numeric keys
      const optionId = value.option_id;
      optionIdCount.set(optionId, (optionIdCount.get(optionId) || 0) + 1);
    });
  });

  // Second pass: capture unique options + sku
  variants.forEach((variant) => {
    Object.entries(variant.attributes || {}).forEach(([key, value]) => {
      if (!/^\d+$/.test(key)) return;
      const { option_id, option_value } = value;
      if (optionIdCount.get(option_id) === 1 && !uniqueOptions.has(option_id)) {
        uniqueOptions.set(option_id, {
          value: option_value,
          sku: variant.sku,
        });
      }
    });
  });

  return uniqueOptions;
};

export default function ProductDetails({ productDetails, productDetail }) {
  const [quantity, setQuantity] = useState(1);
  const sideMenu = useMenuStore((state) => state.sideMenu);
  // const setLoading = useMenuStore((state) => state.setLoading);
  const [loading, setLaoding] = useState(false);
  const [chooseSku, setChooseSku] = useState(null);
  const [imgSrc, setImgSrc] = useState();
  const [selectedData, setSelectedData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [simpleImage, setSImpleImage] = useState("");
  const [wishLoader, setWishLoader] = useState(false);
  const { addToCart, clearCart, setCartTotal, setAllCart } = useCartStore(
    (state) => state
  );
  const cart = useCartStore((state) => state.cart);
  const { isLogin } = useAuthStore((state) => state);
  const [inWish, setInWish] = useState(false);

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
    if (uniqueOptions?.size > 0 && chooseSku == null) {
      CustomToast("Please Choose Varient", "top-right");
      return;
    }
    console.log("chooseSku", chooseSku, uniqueOptions?.length);
    setLaoding(true);
    const tokenData = localStorage.getItem("token");
    const parsed = tokenData ? JSON.parse(tokenData) : null;
    const accessToken = parsed?.token;
    if (accessToken) {
      const data = await addToTheCart(selectedImage, quantity);
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
      console.log("quantity", quantity, productDetails);
      const guestToken = localStorage.getItem("guestToken");
      addGuestCart(guestToken);

      setLaoding(false);
    }
    setLaoding(false);
  };

  const addGuestCart = async (guestToken) => {
    const data = await addCartGuest(selectedImage, quantity, guestToken);
    console.log("addCartGuest", data, guestToken);

    if (data?.status === 200) {
      SuccessToast("Item added to cart", "top-right");
      localStorage.setItem("guestToken", data.data?.guest_token);
      // addToCart(data.data?.cart.items);
      await getGUesstCart();
    }
  };
  const getGUesstCart = async () => {
    const tokenData = localStorage.getItem("guestToken");
    console.log("guestToken", tokenData);
    if (tokenData) {
      const response = await getCartGuest(tokenData);
      console.log("getCartGuest", response?.data?.cart[0]?.items);
      if (response.status == 200) {
        clearCart();
        response?.data?.cart[0]?.items?.forEach((item) => {
          addToCart(item);
        });
        setCartTotal(response?.data?.cart[0]?.grand_total);
        setAllCart(response?.data);
      }
    }
  };

  const addWishList = async (sku) => {
    setWishLoader(true);

    const response = await addItemWIshlist(sku);
    console.log("addItemWishlist", response);
    if (response.status === 200) {
      SuccessToast("Item added to Wishlist", "top-right");
      setInWish(sku);
      setWishLoader(false);
    } else if (response.status == 409) {
      CustomToast("Product already in wishlist", "top-right");
      setWishLoader(false);
    } else {
      CustomToast("SomeThing went wrong", "top-right");
      setWishLoader(false);
    }
  };

  const getTheWistList = async () => {
    const data = localStorage.getItem("token");
    const parseData = JSON.parse(data);

    if (parseData) {
      const response = await getWishList();
      if (response.status === 200) {
        const data = response?.data?.wishlist?.find(
          (data) => data?.product?.sku == productDetails?.sku
        );
        if (data != null && Object.keys(data)?.length > 0) {
          setInWish(productDetails?.sku);
        }
        // setProducts(response.data.wishlist);
        console.log("Dataresponse", data);
        localStorage.setItem(
          "wishlist",
          JSON.stringify(response?.data?.wishlist)
        );
      } else {
        // CustomToast("Somethin went wrong", "top-right");
      }
    }
  };

  console.log(
    "productDetails123",
    // createImage(productDetails?.sku),
    productDetails,
    chooseSku,
    cart,
    wishLoader
  );

  useEffect(() => {
    if (productDetails?.sku) {
      const data = createImage(productDetails?.sku);
      setImgSrc(data);
      console.log("");
      setSelectedImage(productDetails?.sku);
      setSelectedData(productDetails);
      setSImpleImage(productDetails?.images[0]?.url);
      console.log("INside Product details", productDetails?.sku);
      getTheWistList();
    }

    console.log("INside Product detail121s");
  }, [productDetails]);

  // useEffect(() => {
  //   if (uniqueOptions.size > 0) {
  //     const firstValue = uniqueOptions.values().next().value;
  //     console.log("uniqueOptions", uniqueOptions, firstValue);
  //     if (firstValue?.sku) {
  //       setChooseSku(firstValue.sku);
  //     }
  //     // setChooseSku(uniqueOptions.values().next().value.sku);
  //   } else {
  //     // setSelectedImage(productDetails?.sku);
  //   }
  // }, []);

  const SelectedData = (type, sku) => {
    setSelectedImage(sku);
    if (type == "varient") {
      const selectedOption = productDetails?.variants.find(
        (variant) => variant.sku === sku
      );
      // console.log("selectedOption", selectedOption);
      if (selectedOption) {
        console.log(" ifElse fffff");

        setSelectedData(selectedOption);
        // setImgSrc(createImage(selectedOption.sku));
        // setSelectedImage(selectedOption.sku);
      }
    } else {
      setSelectedData(productDetails);
    }
  };

  // useEffect(() => {
  //   if (selectedImage) {
  //     console.log("Sele");
  //     const selectedOption = productDetails?.variants.find(
  //       (variant) => variant.sku === selectedImage
  //     );
  //     // console.log("selectedOption", selectedOption);
  //     if (selectedOption?.sku != selectedImage) {
  //       console.log(" ifElse fffff");

  //       setSelectedData(selectedOption);
  //       // setImgSrc(createImage(selectedOption.sku));
  //       // setSelectedImage(selectedOption.sku);
  //     }
  //   } else {
  //     console.log("Else fffff");
  //     // setSelectedImage(productDetails?.sku);
  //     setSelectedData(productDetails);
  //   }
  // }, [selectedImage]);

  // console.log(
  //   "createImage(productDetails?.sku)",
  //   createImage("CAS-294-MPE"),
  //   productDetails,
  //   chooseSku,
  //   uniqueOptions,
  //   selectedImage
  // );

  console.log("Selected Image,uniqueOptions", inWish);
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
            {productDetails?.type == "configurable" && (
              <Image
                src={createImage(selectedImage)}
                onError={() => setImgSrc("/assets/nothere.png")}
                alt="Product Image"
                width={600}
                height={400}
                priority
                className="img-fluid"
              />
            )}
            {productDetails?.type == "simple" && simpleImage && (
              <Image
                src={simpleImage}
                onError={() => setImgSrc("/assets/nothere.png")}
                alt="Product Image"
                width={600}
                height={400}
                priority
                className="img-fluid"
              />
            )}
          </div>
          {productDetails?.type == "simple" && (
            <div className="d-flex justify-content-center gap-2 mt-3">
              {productDetails?.images?.length > 0 &&
                productDetails?.images.map((src, index) => (
                  <Image
                    key={index}
                    src={src?.url}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className="img-thumbnail"
                    onClick={() => {
                      // setSelectedImage(src.sku), setChooseSku(src.sku);
                      // SelectedData("varient", src.sku);
                      setSImpleImage(src?.url);
                    }}
                    loading="lazy"
                    style={{
                      cursor: "pointer",
                      border:
                        simpleImage === src?.url ? "2px solid #007bff" : "none",
                    }}
                  />
                ))}
            </div>
          )}

          {productDetails?.type == "configurable" && (
            <div className="d-flex justify-content-center gap-2 mt-3">
              <Image
                src={createImage(productDetails?.sku)}
                alt={productDetails?.sku || "Product Image"}
                width={100}
                height={100}
                className="img-thumbnail"
                onClick={() => {
                  // setSelectedImage(productDetails.sku);
                  SelectedData("", productDetails?.sku);
                  // setSelectedData([]);
                  setChooseSku(null);
                }}
                loading="lazy"
                style={{
                  cursor: "pointer",
                  border:
                    selectedImage === productDetails?.sku
                      ? "2px solid #007bff"
                      : "none",
                }}
              />
              {productDetails?.variants?.length > 0 &&
                productDetails?.variants.map((src, index) => (
                  <Image
                    key={index}
                    src={createImage(src.sku)}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className="img-thumbnail"
                    onClick={() => {
                      // setSelectedImage(src.sku), setChooseSku(src.sku);
                      SelectedData("varient", src.sku);
                      setChooseSku(src?.sku);
                    }}
                    loading="lazy"
                    style={{
                      cursor: "pointer",
                      border:
                        selectedImage === src?.sku
                          ? "2px solid #007bff"
                          : "none",
                    }}
                  />
                ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="col-md-12 col-lg-6 ">
          <div className="products-detailing">
            <h2> {productDetails?.name}</h2>
            <div className="d-flex justify-content-between align-items-center">
              <p className="sku-detail">SKU: {selectedImage || "n/a"} </p>
              <span
                className="wishlist float-right"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  console.log("addItemWishlist", productDetails?.sku);
                  if (inWish == productDetails?.sku) {
                    SuccessToast("Already in wishlist");
                  } else {
                    addWishList(productDetails?.sku);
                  }
                }}
              >
                {isLogin &&
                  (wishLoader ? (
                    <div
                      className="spinner-border spinner-border-sm text-danger"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <div>
                      {inWish ? (
                        <Heart
                          size={24}
                          color="#c6302c"
                          fill="#c6302c"
                          stroke="#c6302c"
                        />
                      ) : (
                        <Heart
                          size={24}
                          color="#c6302c"
                          fill="#ffff"
                          stroke="#c6302c"
                        />
                      )}
                    </div>
                  ))}
              </span>
            </div>

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
                € {Number(selectedData?.price).toFixed(2)}
              </span>
            </p>
            {uniqueOptions.size > 0 && (
              <div className="mb-4 d-flex choose-category align-items-center">
                <label
                  className="form-label fw-semibold"
                  style={{
                    color: "rgb(0, 94, 132)",
                  }}
                >
                  Choose:
                </label>
                <select
                  className="form-select"
                  onChange={(e) => {
                    if (e.target.value != "Select Option") {
                      SelectedData("", e.target.value);
                      setChooseSku(e.target.value);
                    } else {
                      SelectedData("", productDetails?.sku);
                      setChooseSku(null);
                    }
                    // setSelectedImage(e.target.value);

                    console.log("Selected SKU:", e.target.value);
                  }}
                  value={selectedImage || ""}
                >
                  <option>Select Option</option>
                  {[...uniqueOptions.entries()].map(([optionId, label]) => (
                    <option key={optionId} value={label.sku}>
                      {label.value}
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
              <InstantLink href="/cartpage" className="me-2">
                View Cart
              </InstantLink>
              |
              <InstantLink href="#" className="ms-2">
                Add to Gift Registry
              </InstantLink>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-lg-6 ">
          <table className="table table-details mt-3">
            <tbody>
              <tr>
                <th>Colour:</th>
                <td>n/a</td>
              </tr>
              <tr>
                <th>Width(cm):</th>
                <td>{productDetails?.width ? productDetails.width : "n/a"}</td>
              </tr>

              {/* <tr>
                <th>Weight(gram):</th>
                <td>
                  {productDetails?.weight ? productDetails.weight : "n/a"}
                </td>
              </tr> */}

              <tr>
                <th>Height(cm):</th>
                <td>
                  {productDetails?.height ? productDetails.height : "n/a"}
                </td>
              </tr>

              <tr>
                <th>Length(cm):</th>
                <td>
                  {productDetails?.length ? productDetails.length : "n/a"}
                </td>
              </tr>
              <tr>
                <th>Size:</th>
                <td>{productDetails?.size ? productDetails.size : "n/a"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-12 col-lg-6">
          <div className=" small mt-2 text-muted">
            <p className="impnotice">
              IMPORTANT - Due to the handmade nature of our products, each piece
              is unique. Sizes are approximate. For matching sets, please visit
              our factory or contact support before ordering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
