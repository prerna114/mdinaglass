"use client";

import { getMenuCategories } from "@/api/menuAPI";
import { getProductCateogry } from "@/api/productApi";
import { createUrl } from "@/constant";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CategorySidebar = (cateogryId) => {
  const [sideMenu, setSideMenu] = useState();
  const { menu } = useAuthStore((state) => state);
  const [subCategory, setSubCategory] = useState([]);
  const [subCartId, setSubCartId] = useState("");
  const [catergoryTheId, setCategoryTheId] = useState("");

  const { params } = useParams();
  const [categoryId, setCategoryId] = useState(
    typeof params?.[0] !== "undefined" ? params[0] : cateogryId?.cateogryId
  );

  const getProductByCategory = async (id, categoryId) => {
    localStorage.setItem("subCartId", JSON.stringify(id));
    localStorage.setItem("categoryId", JSON.stringify(categoryId));
    setSubCartId(id);
    setCategoryTheId(categoryId);
    const data = await getProductCateogry(id);
    setSubCategory(data?.sub_categories);
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
    setCategoryTheId(JSON.parse(theCaterygoryID));
    console.log("useSubCart", thesubcartID);
    setSubCartId(JSON.parse(thesubcartID));
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
  console.log("subCartId", subCartId);
  return (
    <div className="category-sidebar">
      <div className="hide_Mobi_sidebar">
        <div className="bg-white mt-5 text-white">
          <h4 className="mb-4">Shop</h4>
          <nav>
            {/* ==========  Dynamic Side Menu =============== */}
            <ul className="list-unstyled category-sidebar">
              {menu?.length > 0 &&
                menu.map((item, index) => (
                  <li className="mb-2" key={item?.id}>
                    <Link
                      // href={"#"}
                      href={createUrl(item?.id, item?.slug)}
                      onClick={() => {
                        console.log("Item", item);
                      }}
                      className="text-white text-decoration-none"
                    >
                      {item?.name}
                    </Link>
                    {(item.children?.find((item) => item.id == categoryId) ||
                      item?.id == categoryId) &&
                      item?.children?.map((child) => (
                        <ul
                          className="list-unstyled subcate-gories ms-3 mt-2"
                          key={child?.id}
                        >
                          <li className="mb-1">
                            <a
                              style={{
                                cursor: "pointer",
                              }}
                              // href={createUrl(child?.id, child?.slug)}
                              // href={""}
                              onClick={() => {
                                console.log("dsdschild", child?.id, subCartId);
                                getProductByCategory(child?.id, categoryId);
                              }}
                              className={`text-white text-decoration-none small ${
                                child.id == categoryId ||
                                child.id == catergoryTheId
                                  ? "activeSIdeBar"
                                  : "nonActiveBar"
                              }`}
                            >
                              {child?.name}
                            </a>
                          </li>
                          <ul className="list-unstyled subcate-gories ms-3">
                            {child.id == subCartId &&
                              subCategory.map((item) => (
                                <li className="pt-0" key={item.id}>
                                  <Link
                                    key={item.id}
                                    onClick={() => {
                                      console.log(
                                        "creaturl",
                                        createUrl(item?.id, item?.slug)
                                      );
                                    }}
                                    // href={"#"}
                                    // onClick={() => {
                                    //   console.log("dsdschild", child);
                                    //   getProductByCategory(child?.id);
                                    // }}

                                    href={createUrl(item?.id, item?.slug)}
                                    className={`text-white text-decoration-none small ${
                                      item.id == "229"
                                        ? "activeSIdeBar"
                                        : "nonActiveBar"
                                    }`}
                                  >
                                    {item?.name}
                                  </Link>
                                  ;
                                </li>
                              ))}
                          </ul>
                        </ul>
                      ))}
                  </li>
                ))}

              {/* ===========  Static  Side Menu =========== */}

              {/* <li className="mb-2">
                <a href="#" className="text-white text-decoration-none">
                  Glass Blowing & Sculpting
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none">
                  Fusion
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none">
                  Lampwork
                </a>
              </li>
              <li className="mb-3 jewels">
                <a href="#" className="text-white text-decoration-none ">
                  Jewellery
                </a>
                <ul className="list-unstyled subcate-gories ms-3 mt-2">
                  <li className="mb-1">
                    <a
                      href="#"
                      className="text-white text-decoration-none small"
                    >
                      BRACELETS
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      href="#"
                      className="text-white text-decoration-none small"
                    >
                      EARRINGS
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      href="#"
                      className="text-white text-decoration-none small"
                    >
                      NECKLACES
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      href="#"
                      className="text-white text-decoration-none small"
                    >
                      SETS
                    </a>
                  </li>
                </ul>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none">
                  Christmas
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none">
                  Valentine's
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none">
                  Legacy: 50 Years of Mdina Glass (Book)
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none">
                  Gift Vouchers
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none">
                  Sale
                </a>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CategorySidebar);
