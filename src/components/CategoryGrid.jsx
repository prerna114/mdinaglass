"use client";

import { useMenuStore } from "@/store/useCategoryStore";
import React, { useEffect, useState } from "react";
import InstantLink from "./InstantClick";
import { ProductLists } from "@/store/product";
import { exploreCateory } from "@/api/HomePageApi";

// const categories = [
//   {
//     name: "Lanterns",
//     image: "image1.png",
//     urlPath: "/product/webshop/bycategory/3/473/price/asc/15/1/lanterns.htm",
//   },
//   {
//     name: "Vases",
//     image: "vases.png",
//     urlPath: "/product/webshop/bycategory/3/4/price/asc/15/1/vases.htm",
//   },
//   {
//     name: "Lighting",
//     image: "octopus.png",
//     urlPath: "/product/webshop/bycategory/3/6/price/asc/15/1/lighting.htm",
//   },
//   {
//     name: "Decorative Bowls",
//     image: "Bowls.png",
//     urlPath:
//       "/product/webshop/bycategory/3/467/price/asc/15/1/decorative-bowls.htm",
//   },
//   {
//     name: "Egg Holders",
//     image: "egg.png",
//     urlPath: "/product/webshop/bycategory/3/648/price/asc/15/1/egg-holders.htm",
//   },
//   {
//     name: "Book Ends",
//     image: "Book.png",
//     urlPath: "/product/webshop/bycategory/3/653/price/asc/15/1/book-ends.htm",
//   },
//   {
//     name: "Oil & Vinegar",
//     image: "oil.png",
//     urlPath:
//       "/product/webshop/bycategory/3/464/price/asc/15/1/oil-vinegar-bottles.htm",
//   },
//   {
//     name: "Pestle & Mortar",
//     image: "pestle.png",
//     urlPath:
//       "/product/webshop/bycategory/3/605/price/asc/15/1/pestle-mortars.htm",
//   },
//   {
//     name: "Bubble Candle Holders",
//     image: "Bubble.png",
//     urlPath: "/product/webshop/bycategory/3/546/price/asc/15/1/sculptures.htm",
//   },
//   {
//     name: "Sculptures",
//     image: "Sculptures.png",
//     urlPath: "/product/webshop/bycategory/3/546/price/asc/15/1/sculptures.htm",
//   },
//   {
//     name: "Christmas",
//     image: "christmas.png",
//     urlPath: "/product/webshop/bycategory/22/price/asc/15/1/christmas-1.htm",
//   },
//   {
//     name: "Valentine's",
//     image: "Valentine.png",
//     urlPath: "/product/webshop/bycategory/216/price/asc/15/1/valentines.htm",
//   },
// ];

const CategoryGrid = () => {
  const sideMenu = useMenuStore((state) => state.sideMenu);
  const { heading, setHeading, setPagination } = ProductLists((state) => state);
  const [categoryList, setCategoryList] = useState([]);
  const getCategory = async () => {
    const data = await exploreCateory();

    console.log("Category Data", data?.data?.data);
    if (data?.status == 200) {
      setCategoryList(data?.data?.data);
    } else {
      setCategoryList([]);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  console.log("sideMenu CategoryGrid", categoryList);
  return (
    <section className=" custom-categories bg-white container py-5">
      <h3 className=" mb-4" style={{ fontFamily: "dopamine, sans-serif" }}>
        Explore our categories
      </h3>
      <div className="row g-4">
        {categoryList.map((cat) => (
          <div className="col-6 col-sm-4 col-md-3" key={cat.id}>
            <div className="card category-card shadow-sm border rounded-3">
              <div
                className="position-relative border-bottom"
                style={{
                  width: "100%",
                  paddingBottom: "100%", // Keeps it square
                  overflow: "hidden",
                  borderBottom: "1px solid #dee2e6", // subtle inner border
                }}
              >
                <InstantLink
                  href={cat.link}
                  onClick={() => {
                    setHeading(cat?.title);
                    console.log("SetHeading", cat?.name);
                  }}
                >
                  <img
                    src={cat.image || "/assets/nothere.png"}
                    alt={cat.title}
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      objectFit: "cover",
                      borderBottom: "1px solid #ccc",
                    }}
                  />
                </InstantLink>
                <InstantLink
                  href={cat.link}
                  onClick={() => {
                    setHeading(cat?.title);
                  }}
                >
                  <div
                    className="font-custom-category position-absolute bottom-5 start-50 translate-middle text-white  text-center px-2"
                    style={{
                      textShadow: "0em 0.1em 0.1em #FFFFFFAD)",

                      width: "100%",
                    }}
                  >
                    {cat.title.slice(0, 50)}
                    {cat?.title?.length > 50 && "..."}
                  </div>
                </InstantLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
