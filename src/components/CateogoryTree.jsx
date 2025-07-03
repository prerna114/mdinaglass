"use client";

import { getCategories, getMenuCategories } from "@/api/menuAPI";
import { getProductCateogry, getProductCateogrybyId } from "@/api/productApi";
import { createUrl } from "@/constant";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";

const CateogoryTree = ({ cateogryId, onDataLoaded }) => {
  const [sideMenu, setSideMenu] = useState();
  const { menu } = useAuthStore((state) => state);
  const [subCategory, setSubCategory] = useState([]);
  const [subCartId, setSubCartId] = useState("");
  const [showId, setShowID] = useState();
  const [catergoryTheId, setCategoryTheId] = useState("");
  const [categoryDetails, setCategoryDetails] = useState({});
  const { params } = useParams();
  const [categoryId, setCategoryId] = useState(
    typeof params?.[0] !== "undefined" ? params[0] : cateogryId?.cateogryId
  );

  const [expand, setExpand] = useState({});
  const router = useRouter();

  const getProductByCategory = async (id, categoryId) => {
    localStorage.setItem("subCartId", JSON.stringify(id));
    localStorage.setItem("categoryId", JSON.stringify(categoryId));
    setSubCartId(id);
    setCategoryTheId(categoryId);
    const data = await getProductCateogry(id);
    if (data?.status == 200) {
      setSubCategory(data?.data?.sub_categories);
      localStorage.setItem(
        "subCateogry",
        JSON.stringify(data?.data?.sub_categories)
      );
      if (data?.data?.sub_categories?.length == 0) {
        const newUrl = createUrl(categoryDetails?.id, categoryDetails?.slug);
        console.log("The New url", newUrl);
      }
    } else {
      setSubCategory([]);
      localStorage.setItem("subCateogry", null);
      return null;
    }

    console.log("getProductByCategory", data, id);
  };
  console.log("Params", params, categoryId);
  const getMenuData = async () => {
    const stored = localStorage.getItem("cart");

    if (stored?.length > 0) {
      const parsed = JSON.parse(stored);

      setSideMenu(parsed);
    }
    // console.log("Data of menu", stored);
  };

  const CategoryById = async (id) => {
    const data = await getProductCateogrybyId(1);
    console.log("CategoryById", data);
  };
  useEffect(() => {
    // getMenuData();
    // const thesubcartID = localStorage.getItem("subCartId");
    // const theCaterygoryID = localStorage.getItem("categoryId");
    // const theSubCategoryList = localStorage.getItem("subCateogry");
    // setCategoryTheId(JSON.parse(theCaterygoryID));
    // console.log("useSubCart", thesubcartID);
    // const parsthesubcartID = JSON.parse(thesubcartID);
    // const parsetheSubCategoryList = JSON.parse(theSubCategoryList);
    // setSubCartId(parsthesubcartID);
    // setSubCategory(parsetheSubCategoryList);

    // const catID = localStorage.getItem("categoryID");
    // setShowID(JSON.parse(catID));

    CategoryById();
  }, []);
  useEffect(() => {
    // if (subCartId && catergoryTheId) {
    //   getProductByCategory(subCartId, catergoryTheId);
    // }
  }, [subCartId, catergoryTheId]);

  // const getCategory = async () => {
  //   const data = await getCategories();
  //   console.log("DatagetCategories", data);
  // };
  useEffect(() => {
    // getCategory();
  }, []);

  return (
    <div className="category-sidebar">
      <div className="hide_Mobi_sidebar">
        <div className="bg-white mt-5 text-white">
          <h4 className="mb-4">Shop</h4>
          <nav>
            {/* ==========  Dynamic Side Menu =============== */}
            <ul
              className="list-unstyled category-sidebar  "
              style={{
                backgroundColor: "white",
                padding: "15px",
              }}
            >
              {menu?.map((item, index) => {
                return (
                  <CategoryItem
                    key={item.id}
                    item={item}
                    level={1}
                    onDataLoaded={onDataLoaded}
                    isFirst={index === 0}
                  />
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CateogoryTree);
