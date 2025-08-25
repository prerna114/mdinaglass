"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCartStore } from "@/store";
import { CustomToast, SuccessToast } from "./CustomToast";
import { getNewArrivalProduct } from "@/api/productApi";
import { ProductLists } from "@/store/product";
import InstantLink from "./InstantClick";
import { addCartGuest, addToTheCart, getCartGuest } from "@/api/CartApi";
import { createImage } from "@/constant";

const ProductCarousel = ({ title = "New Arrivals", showBadge = false }) => {
  const { products, category, setHeading, setProducts } = ProductLists(
    (state) => state
  );
  const { clearCart } = useCartStore((state) => state);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);

  const getNewProduct = async () => {
    const data = await getNewArrivalProduct();
    if (data.status == 200) {
      setProducts(data?.data?.data);
    }
  };

  const CustomPrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      style={{
        width: "50px",
        height: "50px",
        // right: "422px",
        textAlign: "center",
        zIndex: 1,
        left: "-10px",
        borderRadius: "50%",
        backgroundColor: "white",
        transform: "translateY(-50%)",
        position: "absolute",
        cursor: "pointer",
        top: "46%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        alt="Previous"
        src="/assets/leftarrow.png"
        className="w-19"
        style={{
          // width: "20px !important",
          height: "20px",
        }}
      />
    </div>
  );

  const CustomNextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      style={{
        width: "50px",
        height: "50px",
        // right: "422px",
        right: "-10px",
        transform: "translateY(-50%)",
        position: "absolute",
        cursor: "pointer",
        top: "46%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
        borderRadius: "50%",
        backgroundColor: "white",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        alt="Next"
        src="/assets/rightarrow.png"
        className="w-19"
        style={{
          // width: "20px",
          height: "20px",
        }}
      />
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    infinite: products?.length > 1,
    centerMode: false,
    slidesToShow: Math.min(products?.length || 1, 4),
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1600,
        settings: { slidesToShow: Math.min(products?.length || 1, 3) },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: Math.min(products?.length || 1, 2) },
      },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
    // fade: true,

    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  const { addToCart, cart } = useCartStore((state) => state);
  const handleAdd = (item) => {
    addToCart(item);
    const updated = useCartStore.getState().cart.find((i) => i.id === item.id);
    if (updated) {
      SuccessToast("Item added Successfuly", "top-right");
    }
    console.log("updated", updated);
  };

  useEffect(() => {
    getNewProduct();
  }, []);

  const addItemCart = async (product) => {
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
      setLoading(true);
      const guestToken = localStorage.getItem("guestToken");
      addGuestCart(product, guestToken);

      // addToCart({ ...product, quantity: "1" });
      // SuccessToast("Item added Successfuly", "top-right");
    }
    console.log("Add", product);
  };

  const addGuestCart = async (product, guestToken) => {
    setLoadingProductId(product.id);

    setLoading(true);

    console.log("guestToken", product);
    const data = await addCartGuest(product?.sku, "1", guestToken);
    console.log("addCartGuest", data, guestToken);

    if (data?.status === 200) {
      SuccessToast("Item added to cart", "top-right");
      localStorage.setItem("guestToken", data.data?.guest_token);
      setLoading(false);

      // addToCart(data.data?.cart.items);
      await getGUesstCart();
    } else {
      setLoading(false);

      CustomToast("Something went wrong", "top-right");
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
      }
    }
  };
  console.log("productsCarousel", loading, loadingProductId);
  return (
    <div className=" py-5 bg-white bg-white-custom">
      <div className="container">
        <h3
          className=" ms-3 mb-4"
          style={{ fontFamily: "Quicksand, sans-serif" }}
        >
          {title}
        </h3>
        <Slider {...settings}>
          {products.map((product, index) => (
            <div key={product.id} className="px-2">
              <div
                className="bg-white text-center new-arrival-design  p-3 d-flex flex-column justify-content-between align-items-center"
                style={{
                  height: "100%",
                  minHeight: "340px",
                  width: products?.length == 1 ? "34%" : "",
                }}
              >
                <div
                  className="bg-white text-center new-arrival-design  p-3 d-flex flex-column justify-content-between align-items-center"
                  style={{ height: "100%", minHeight: "340px" }}
                >
                  <InstantLink
                    href={{
                      pathname: `/product-details/webshop/${`1/${product?.id}/${product?.slug}`}/${
                        product?.sku
                      }`,
                    }}
                  >
                    <img
                      src={createImage(product?.sku)}
                      alt={product.name}
                      className="img-fluid"
                      style={{
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </InstantLink>
                </div>
                <div className="text-center w-100">
                  <InstantLink
                    style={{
                      textDecoration: "none",
                    }}
                    href={{
                      pathname: `/product-details/webshop/${`1/${product?.id}/${product?.slug}`}/${
                        product?.sku
                      }`,
                    }}
                  >
                    <h6
                      className="mb-1"
                      style={{ fontFamily: "Quicksand, sans-serif" }}
                    >
                      {product?.name?.slice(0, 24)}
                      {product?.name?.length > 23 && "..."}
                    </h6>
                  </InstantLink>
                  <hr
                    className="my-2"
                    style={{ width: "40px", margin: "auto" }}
                  />
                  <p className="text-muted mb-3">
                    € {Number(product.price).toFixed(2)}
                  </p>
                  <div className="new-arrival-design">
                    <button
                      className="btn btn-outline-secondary  w-100"
                      onClick={() => {
                        // handleAdd({
                        //   id: 3,
                        //   name: "Glass Bead Necklace & Bracelet Set",
                        //   price: 29.0,
                        //   qty: 1,
                        //   image: "/assets/bracelet1.png",
                        //   gift: false,
                        // });
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
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Arrow Styling */}
      <style>
        {`

    .slick-prev, .slick-next {
      width: 30px;
      height: 30px;
      z-index: 2;
    }

    .slick-prev:before, .slick-next:before {
      color: #005E84;
      font-size: 60px;
      opacity: 1;
    }

    /* Optional: position the arrows better */
    .slick-prev {
      left: -10px;
    }

    .slick-next {
      right: 70px;
    }
  `}
      </style>
    </div>
  );
};

export default ProductCarousel;
