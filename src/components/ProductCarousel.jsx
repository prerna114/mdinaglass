"use client";

import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCartStore } from "@/store";
import { SuccessToast } from "./CustomToast";
import { getNewArrivalProduct } from "@/api/productApi";
import { ProductLists } from "@/store/product";
import InstantLink from "./InstantClick";

const ProductCarousel = ({ title = "New Arrivals", showBadge = false }) => {
  const { products, category, setHeading, setProducts } = ProductLists(
    (state) => state
  );
  const getNewProduct = async () => {
    const data = await getNewArrivalProduct();
    if (data.status == 200) {
      console.log("getNewProduct", data.data.data);
      setProducts(data.data.data);
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
  console.log("productsCarousel", products);
  return (
    <div className="py-5" style={{ backgroundColor: "#f5f5f5", margin: "0px" }}>
      <div className="container">
        <h3
          className="ms-3 mb-4"
          style={{ fontFamily: "Quicksand, sans-serif", margin: 0 }}
        >
          {title}
        </h3>

        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="px-2">
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
                    src={product.images[0].url}
                    alt={product.name}
                    className="img-fluid mb-2"
                    style={{ height: "190px", objectFit: "contain" }}
                  />
                </InstantLink>

                {/* Always reserve space for Quick View */}
                <div style={{ minHeight: "20px" }}>
                  {product.quickView ? (
                    <p className="small text-muted mb-1">{product.quickView}</p>
                  ) : (
                    <p className="small mb-1" style={{ visibility: "hidden" }}>
                      Placeholder
                    </p>
                  )}
                </div>
                <InstantLink
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
                    {product.name}
                  </h6>
                </InstantLink>

                <p className="text-muted mb-2">
                  €{Number(product.price).toFixed(2)}
                </p>

                <button
                  className="btn btn-outline-secondary w-100 mt-auto"
                  onClick={() => {
                    handleAdd({
                      id: 6,
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
          ))}
        </Slider>
      </div>

      {/* Carousel Arrow Styling */}
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

@media screen and (max-width: 758px) {
.slick-prev, .slick-next {display:none;}

}

  `}
      </style>
    </div>
  );
};

export default ProductCarousel;
