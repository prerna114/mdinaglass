// "use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCartStore } from "@/store";
import { SuccessToast } from "./CustomToast";
import { getAllProduct } from "@/api/productApi";
import Link from "next/link";

const ProductCard = ({ title = "New Arrivals" }) => {
  const { addToCart, cart } = useCartStore((state) => state);
  const [productData, setProductData] = useState([]);

  const products = [
    {
      id: 1,
      name: "Oranges & Reds Carafe",
      price: 37.0,
      image: "/assets/lighting.jpg",
    },
    {
      id: 2,
      name: "Oranges & Reds Round Jug",
      price: 48.5,
      image: "/assets/lanterns.png",
    },
    {
      id: 3,
      name: "Small Dip Bowl",
      price: 21.0,
      image: "/assets/lanterns.png",
    },
    {
      id: 4,
      name: "Barrel Tumbler",
      price: 20.5,
      image: "/assets/lanterns.png",
    },
  ];

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
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1600, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  const handleAdd = (item) => {
    addToCart(item);
    const updated = useCartStore.getState().cart.find((i) => i.id === item.id);
    if (updated) {
      SuccessToast("Item added Successfuly", "top-right");
    }
    console.log("updated", updated);
  };

  // const getAllProduct = async () => {
  //   console.log("Get Catrogires is clling");
  //   const myHeaders = new Headers();
  //   const requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   try {
  //     const res = await fetch(
  //       "https://mdinaglasses.blackbullsolution.com/api/products",
  //       requestOptions
  //     );
  //     const data = await res.json(); // ✅ this is what you need

  //     console.log("Data", data);
  //   } catch (error) {
  //     console.log("eror", error);
  //   }
  // };

  const fetchData = async () => {
    const data = await getAllProduct();
    console.log("Product car", data);
    if (data.status == 200) {
      setProductData([...data?.data?.data, ...data?.data?.data]);
    } else {
      setProductData([]);
    }
    console.log("THe data", data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log("productData", productData);
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
          {productData.map((product) => (
            <div key={product.id} className="px-2">
              <div
                className=" bestseller-account border rounded p-3 d-flex flex-column align-items-center new-arrival-design "
                style={{
                  height: "100%",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  backgroundColor: "rgb(245, 245, 245)",
                }}
              >
                <div
                  className="bg-white rounded mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "100%",
                    height: "250px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={product.base_image?.medium_image_url}
                    alt={product.name}
                    className="img-fluid"
                    style={{
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="text-center w-100">
                  <Link
                    style={{
                      textDecoration: "none",
                    }}
                    href={{
                      pathname: "/product-details",
                      query: { sku: product?.sku },
                    }}
                  >
                    <h6
                      className="mb-1"
                      style={{
                        fontFamily: "Quicksand, sans-serif",
                        color: "black",
                      }}
                    >
                      {product.name}
                    </h6>
                  </Link>
                  <hr
                    className="my-2"
                    style={{ width: "40px", margin: "auto" }}
                  />
                  <p className="text-muted mb-3">{product.min_price}</p>
                  <div className="new-arrival-design">
                    <button
                      className="btn btn-outline-secondary  w-100"
                      onClick={() => {
                        handleAdd({
                          id: 3,
                          name: "Glass Bead Necklace & Bracelet Set",
                          price: 29.0,
                          qty: 1,
                          image: "/assets/bracelet1.png",
                          gift: false,
                        });
                      }}
                    >
                      Add to Cart
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

export default ProductCard;
