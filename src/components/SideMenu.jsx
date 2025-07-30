"use client";

import { getProductCateogrybyId } from "@/api/productApi";
import { useAuthStore } from "@/store/useAuthStore";
import React, { useEffect, useRef, useState } from "react";
import SideMenuItem from "./SideMenuItem";
import { useMenuStore } from "@/store/useCategoryStore";
import SideMenuSkeleton from "./Skeleton/SideMenuSkeleton";

const SideMenu = ({}) => {
  // const [sideMenu, setSideMenu] = useState();
  const [subCategory, setSubCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const sideMenu = useMenuStore((state) => state.sideMenu);
  const setSideMenu = useMenuStore((state) => state.setSideMenu);

  const hasRunOnce = useRef(false);

  const CategoryById = async (id) => {
    if (hasRunOnce.current) return;
    hasRunOnce.current = true;
    const data = await getProductCateogrybyId(1);
    // console.log("CategoryById", data?.data?.sub_categories);

    if (data?.status == 200) {
      setSubCategory(data?.data?.sub_categories);
      // localStorage.setItem(
      //   "subCateogry",
      //   JSON.stringify(data?.data?.sub_categories)
      // );
      setSideMenu(data?.data?.sub_categories);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      const stored = localStorage.getItem("subCateogry");
      const paresed = JSON.parse(stored);
      if (paresed?.length > 0) {
        setSubCategory(paresed);
        setSideMenu(paresed);
        setLoading(false);
      } else {
        CategoryById();
      }
    }, 10);
  }, []);
  console.log("CategoryById", sideMenu);

  return (
    <div className="category-sidebar">
      <div className="hide_Mobi_sidebar">
        <div className="bg-white mt-5 text-white">
          <h4 className="mb-4">Shop</h4>
          {loading ? (
            <SideMenuSkeleton />
          ) : (
            <nav>
              {/* ==========  Dynamic Side Menu =============== */}
              <ul
                className="list-unstyled category-sidebar  "
                style={{
                  backgroundColor: "white",
                  // padding: "15px",
                }}
              >
                {sideMenu?.map((item, index) => {
                  const parentPath = []; // ✅ define root path
                  return (
                    <>
                      {item.status == 1 && (
                        <SideMenuItem
                          key={item.id}
                          item={item}
                          level={1}
                          isFirst={index === 0}
                          parentPath={[...parentPath]}
                        />
                      )}
                    </>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SideMenu);
