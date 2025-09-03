"use client";

import { getProductCateogrybyId } from "@/api/productApi";
import { useAuthStore } from "@/store/useAuthStore";
import React, { useEffect, useRef, useState } from "react";
import SideMenuItem from "./SideMenuItem";
import { useMenuStore } from "@/store/useCategoryStore";
import SideMenuSkeleton from "./Skeleton/SideMenuSkeleton";
import { getCategoryPath } from "@/constant";
import { useRouter } from "next/navigation";

const SideMenu = ({ productDetails }) => {
  // const [sideMenu, setSideMenu] = useState();
  const [subCategory, setSubCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const sideMenu = useMenuStore((state) => state.sideMenu);
  const setSideMenu = useMenuStore((state) => state.setSideMenu);
  const [cateogoryParents, setCateogryParents] = useState();
  const router = useRouter();

  const hasRunOnce = useRef(false);

  const CategoryById = async (id) => {
    if (hasRunOnce.current) return;
    hasRunOnce.current = true;
    const data = await getProductCateogrybyId(1);
    console.log("CategoryById", data);

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
  console.log("SideMenu productDetails", productDetails);

  const getCateogryIDs = () => {
    const data = getCategoryPath(productDetails);
    console.log("SideMenupath123", data);
    if (data) {
      const normalized =
        typeof data === "string"
          ? data.split("/").map((id) => Number(id))
          : Array.isArray(data)
          ? data.map((id) => Number(id))
          : [];
      // setCateogryParents(Array.isArray(data) ? data : [data]);
      setCateogryParents(normalized);
    }
  };
  useEffect(() => {
    if (productDetails) {
      getCateogryIDs();
    }
  }, [productDetails]);

  console.log("sideMenu12345", sideMenu);
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
                  marginTop: "30px",
                  // padding: "15px",
                }}
              >
                {sideMenu?.map((item, index) => {
                  const parentPath = []; // ✅ define root path
                  return item.status == 1 ? (
                    <SideMenuItem
                      key={item.id}
                      item={item}
                      level={1}
                      isFirst={index === 0}
                      parentPath={[...parentPath]}
                      cateogoryParents={cateogoryParents}
                    />
                  ) : null;
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
