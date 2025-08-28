"use client";

import { ProductLists } from "@/store/product";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createImage } from "@/constant";
import InstantLink from "./InstantClick";

const CategoryFeature = () => {
  const { products } = ProductLists((state) => state);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // change every 3s
    fade: true,
    arrows: false,
    pauseOnHover: false, // don't stop on hover
    cssEase: "linear", // ensures fade works smoothly from start
  };
  // Group products into pairs of 2
  const productPairs = [];
  for (let i = 0; i < products.length; i += 2) {
    productPairs.push(products.slice(i, i + 2));
  }
  const images = [
    {
      id: "1",
      image: "/assets/sliderone.png",
      link1: "/product/webshop/bycategory/3/648/price/asc/15/1/egg-holders.htm",
      nameOne: "Egg Holders",
      nameTwo: "Pestle & Mortar",
      link2:
        "/product/webshop/bycategory/3/605/price/asc/15/1/pestle-mortars.htm",
    },
    {
      id: "2",
      image: "/assets/slidertwo.png",
      link1:
        "/product/webshop/bycategory/3/467/price/asc/15/1/decorative-bowls.htm",
      nameOne: "Decorative Bowls",
      nameTwo: "Sculptures",
      link2: "/product/webshop/bycategory/3/546/price/asc/15/1/sculptures.htm",
    },

    {
      id: "2",
      image: "/assets/sliderthree.png",
      link1: "/product/webshop/bycategory/3/473/price/asc/15/1/lanterns.htm",
      nameOne: "lanterns",
      nameTwo: "Lighting",
      link2: "/product/webshop/bycategory/3/6/price/asc/15/1/lighting.htm",
    },

    // {
    //   id: "2",
    //   image: "/assets/slideone.png",
    //   name: "ROhan",
    // },
  ];

  return (
    <section className="feature-images">
      <Slider {...settings}>
        {images.map((pair, index) => (
          <div key={index} className="container">
            <div className="row">
              <div className="col-md-12 col-12 px-0 mt-2">
                <div className="position-relative overflow-hidden rounded shadow-sm">
                  <img
                    src={pair?.image}
                    alt={pair?.name || "Category"}
                    className="img-fluid w-100 object-cover"
                    style={{
                      height: "100%",
                      // transition: "opacity 6s ease-in-out", // smooth fade
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      maxWidth: "50%",
                      justifyContent: "space-between",
                    }}
                  >
                    <InstantLink href={pair?.link1} className="imageText">
                      <h2>{pair?.nameOne}</h2>
                    </InstantLink>
                    <InstantLink href={pair?.link2} className="imageTextTwo">
                      <h2>{pair?.nameTwo}</h2>
                    </InstantLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default CategoryFeature;
