"use client";

import { getProductCateogrybyId } from "@/api/productApi";
import { useAuthStore } from "@/store/useAuthStore";
import React, { useEffect, useState } from "react";
import SideMenuItem from "./SideMenuItem";
import { useMenuStore } from "@/store/useCategoryStore";

const SideMenu = ({ cateogryId }) => {
  // const [sideMenu, setSideMenu] = useState();
  const { menu } = useAuthStore((state) => state);
  const { sideMenu, setSideMenu } = useMenuStore((state) => state);
  const [subCategory, setSubCategory] = useState([]);

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
