"use client";

import { getCategories, getMenuCategories } from "@/api/menuAPI";
import { getProductCateogry, getProductCateogrybyId } from "@/api/productApi";
import { createUrl } from "@/constant";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import SideMenuItem from "./SideMenuItem";
import { Menu } from "lucide-react";
import { useMenuStore } from "@/store/useCategoryStore";

const SideMenu = ({ cateogryId }) => {
  // const [sideMenu, setSideMenu] = useState();
  const { menu } = useAuthStore((state) => state);
  const { sideMenu, setSideMenu } = useMenuStore((state) => state);
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

  const CategoryById = async (id) => {
    const data = await getProductCateogrybyId(1);
    console.log("CategoryById", data?.data?.sub_categories);

    if (data?.status == 200) {
      setSubCategory(data?.data?.sub_categories);
      localStorage.setItem(
        "subCateogry",
        JSON.stringify(data?.data?.sub_categories)
      );
      setSideMenu(data?.data?.sub_categories);
    }
  };
  useEffect(() => {
    const stored = localStorage.getItem("subCateogry");
    const paresed = JSON.parse(stored);
    if (paresed?.length > 0) {
      setSubCategory(paresed);
      setSideMenu(paresed);
    } else {
      CategoryById();
    }
  }, []);
  console.log("CategoryById", subCategory);

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
                // padding: "15px",
              }}
            >
              {subCategory?.map((item, index) => {
                const parentPath = []; // ✅ define root path
                return (
                  <SideMenuItem
                    key={item.id}
                    item={item}
                    level={1}
                    isFirst={index === 0}
                    parentPath={[...parentPath]}
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

export default React.memo(SideMenu);
