"use client";

import { getCategories, getMenuCategories } from "@/api/menuAPI";
import { getProductCateogry } from "@/api/productApi";
import { createUrl } from "@/constant";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";

const CateogoryTree = (cateogryId) => {
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
    console.log("Data of menu", stored);
  };

  useEffect(() => {
    getMenuData();
    const thesubcartID = localStorage.getItem("subCartId");
    const theCaterygoryID = localStorage.getItem("categoryId");
    const theSubCategoryList = localStorage.getItem("subCateogry");
    setCategoryTheId(JSON.parse(theCaterygoryID));
    console.log("useSubCart", thesubcartID);
    const parsthesubcartID = JSON.parse(thesubcartID);
    const parsetheSubCategoryList = JSON.parse(theSubCategoryList);
    setSubCartId(parsthesubcartID);
    setSubCategory(parsetheSubCategoryList);
    // console.log(
    //   "theSubCategoryList",
    //   Array.isArray(parsetheSubCategoryList),
    //   parsetheSubCategoryList
    // );
    const catID = localStorage.getItem("categoryID");
    setShowID(JSON.parse(catID));
    // getProductByCategory(thesubcartID);
  }, []);
  useEffect(() => {
    if (subCartId && catergoryTheId) {
      getProductByCategory(subCartId, catergoryTheId);
    }
  }, [subCartId, catergoryTheId]);

  // console.log(
  //   "paramscateogryId",
  //   params[0],
  //   cateogryId,
  //   typeof params?.[0] !== "undefined"
  // );

  const getCategory = async () => {
    const data = await getCategories();
    console.log("DatagetCategories", data);
  };
  useEffect(() => {
    getCategory();
  }, []);

  const data = [
    {
      id: 1,
      parent_id: null,
      name: "Root",
      slug: "root",
      status: 1,
      position: 1,
      display_mode: "products_and_description",
      description: "Root Category Description",
      meta: {
        title: "",
        keywords: "",
        description: "",
      },
      translations: [
        {
          id: 1,
          category_id: 1,
          name: "Root",
          slug: "root",
          url_path: "",
          description: "Root Category Description",
          meta_title: "",
          meta_description: "",
          meta_keywords: "",
          locale_id: null,
          locale: "en",
        },
      ],
      additional: [],
    },
    {
      id: 3,
      parent_id: 1,
      name: " Glass Blowing & Sculpting",
      slug: "glass-blowing-sculpting",
      status: 1,
      position: 1,
      display_mode: "products_and_description",
      description: null,
      meta: {
        title: null,
        keywords: null,
        description: null,
      },
      translations: [
        {
          id: 437,
          category_id: 3,
          name: " Glass Blowing & Sculpting",
          slug: "glass-blowing-sculpting",
          url_path: "",
          description: null,
          meta_title: null,
          meta_description: null,
          meta_keywords: null,
          locale_id: null,
          locale: "en",
        },
      ],
      additional: [],
    },
    {
      id: 4,
      parent_id: 3,
      name: "Vases",
      slug: "vases",
      status: 1,
      position: 1,
      display_mode: "products_and_description",
      description: null,
      meta: {
        title: null,
        keywords: null,
        description: null,
      },
      translations: [
        {
          id: 438,
          category_id: 4,
          name: "Vases",
          slug: "vases",
          url_path: "",
          description: null,
          meta_title: null,
          meta_description: null,
          meta_keywords: null,
          locale_id: null,
          locale: "en",
        },
      ],
      additional: [],
    },
    {
      id: 5,
      parent_id: 449,
      name: "Plates, Dishes & Bowls",
      slug: "plates-dishes-bowls",
      status: 1,
      position: 1,
      display_mode: "products_and_description",
      description: null,
      meta: {
        title: null,
        keywords: null,
        description: null,
      },
      translations: [
        {
          id: 644,
          category_id: 5,
          name: "Plates, Dishes & Bowls",
          slug: "plates-dishes-bowls",
          url_path: "",
          description: null,
          meta_title: null,
          meta_description: null,
          meta_keywords: null,
          locale_id: null,
          locale: "en",
        },
      ],
      additional: [],
    },
    {
      id: 6,
      parent_id: 3,
      name: "Lighting",
      slug: "lighting",
      status: 1,
      position: 1,
      display_mode: "products_and_description",
      description: null,
      meta: {
        title: null,
        keywords: null,
        description: null,
      },
      translations: [
        {
          id: 439,
          category_id: 6,
          name: "Lighting",
          slug: "lighting",
          url_path: "",
          description: null,
          meta_title: null,
          meta_description: null,
          meta_keywords: null,
          locale_id: null,
          locale: "en",
        },
      ],
      additional: [],
    },
    {
      id: 7,
      parent_id: 406,
      name: "Table Tops & Decorative Glass Panels",
      slug: "table-tops-decorative-glass-panels",
      status: 1,
      position: 1,
      display_mode: "products_and_description",
      description: null,
      meta: {
        title: null,
        keywords: null,
        description: null,
      },
      translations: [
        {
          id: 748,
          category_id: 7,
          name: "Table Tops & Decorative Glass Panels",
          slug: "table-tops-decorative-glass-panels",
          url_path: "",
          description: null,
          meta_title: null,
          meta_description: null,
          meta_keywords: null,
          locale_id: null,
          locale: "en",
        },
      ],
      additional: [],
    },
    {
      id: 8,
      parent_id: 449,
      name: "Pictures & Scenes",
      slug: "pictures-scenes",
      status: 1,
      position: 1,
      display_mode: "products_and_description",
      description: null,
      meta: {
        title: null,
        keywords: null,
        description: null,
      },
      translations: [
        {
          id: 622,
          category_id: 8,
          name: "Pictures & Scenes",
          slug: "pictures-scenes",
          url_path: "",
          description: null,
          meta_title: null,
          meta_description: null,
          meta_keywords: null,
          locale_id: null,
          locale: "en",
        },
      ],
      additional: [],
    },
    {
      id: 10,
      parent_id: 3,
      name: "Candleholders",
      slug: "candleholders",
      status: 1,
      position: 1,
      display_mode: "products_and_description",
      description: null,
      meta: {
        title: null,
        keywords: null,
        description: null,
      },
      translations: [
        {
          id: 440,
          category_id: 10,
          name: "Candleholders",
          slug: "candleholders",
          url_path: "",
          description: null,
          meta_title: null,
          meta_description: null,
          meta_keywords: null,
          locale_id: null,
          locale: "en",
        },
      ],
      additional: [],
    },
    {
      id: 11,
      parent_id: 406,
      name: "Mirrors",
      slug: "mirrors",
      status: 1,
      position: 1,
      display_mode: "products_and_description",
      description: null,
      meta: {
        title: null,
        keywords: null,
        description: null,
      },
      translations: [
        {
          id: 746,
          category_id: 11,
          name: "Mirrors",
          slug: "mirrors",
          url_path: "",
          description: null,
          meta_title: null,
          meta_description: null,
          meta_keywords: null,
          locale_id: null,
          locale: "en",
        },
      ],
      additional: [],
    },
    {
      id: 12,
      parent_id: 3,
      name: "Perfume Bottles",
      slug: "perfume-bottles",
      status: 1,
      position: 1,
      display_mode: "products_and_description",
      description: null,
      meta: {
        title: null,
        keywords: null,
        description: null,
      },
      translations: [
        {
          id: 441,
          category_id: 12,
          name: "Perfume Bottles",
          slug: "perfume-bottles",
          url_path: "",
          description: null,
          meta_title: null,
          meta_description: null,
          meta_keywords: null,
          locale_id: null,
          locale: "en",
        },
      ],
      additional: [],
    },
  ];
  console.log("datata", data[0]);
  return (
    <div className="category-sidebar">
      <div className="hide_Mobi_sidebar">
        <div className="bg-white mt-5 text-white">
          <h4 className="mb-4">Shop</h4>
          <nav>
            {/* ==========  Dynamic Side Menu =============== */}
            <ul
              className="list-unstyled category-sidebar"
              style={{
                backgroundColor: "white",
                padding: "10px",
              }}
            >
              {menu?.map((item) => {
                return <CategoryItem key={item.id} item={item} />;
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CateogoryTree);
