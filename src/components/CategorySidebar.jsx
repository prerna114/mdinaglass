"use client";

import { getMenuCategories } from "@/api/menuAPI";
import { getProductCateogry } from "@/api/productApi";
import { createUrl } from "@/constant";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CategorySidebar = (cateogryId) => {
  const [sideMenu, setSideMenu] = useState();
  const { menu } = useAuthStore((state) => state);
  const [subCategory, setSubCategory] = useState([]);
  const [subCartId, setSubCartId] = useState("");
  const [catergoryTheId, setCategoryTheId] = useState("");
  const [categoryDetails, setCategoryDetails] = useState({});
  const { params } = useParams();
  const [categoryId, setCategoryId] = useState(
    typeof params?.[0] !== "undefined" ? params[0] : cateogryId?.cateogryId
  );
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

  const [showID, setShowID] = useState();
  console.log(
    "subCartId",
    subCartId,
    categoryId,
    Array.isArray(subCategory),
    subCategory,
    showID
  );
  return (
    <div className="category-sidebar">
      <div className="hide_Mobi_sidebar">
        <div className="bg-white mt-5 text-white">
          <h4 className="mb-4">Shop</h4>
          <nav>
            {/* ==========  Dynamic Side Menu =============== */}
            <ul className="list-unstyled category-sidebar">
              {menu?.length > 0 &&
                menu.map((item, index) => {
                  console.log(
                    "TheChildere",
                    item.children?.some((item) => item.id == categoryId)
                  );
                  return (
                    <li className="mb-2" key={item?.id}>
                      <Link
                        // href={"#"}
                        href={createUrl(item?.id, item?.slug)}
                        onClick={() => {
                          console.log(
                            "Item cateogry",
                            // item.children.map((data) =>
                            //   console.log("the data", data)
                            // )
                            item.id
                          );
                          setShowID(item.id);
                          localStorage.setItem(
                            "categoryID",
                            JSON.stringify(item.id)
                          );
                        }}
                        className="text-white text-decoration-none"
                      >
                        {item?.name}
                      </Link>
                      {(item?.id == categoryId ||
                        item.children?.some(
                          (child) => child.id == categoryId
                        ) ||
                        (item?.id == showID &&
                          subCategory.find((item) => item.id == categoryId))) &&
                        item?.children?.map((child) => (
                          <ul
                            className="list-unstyled subcate-gories ms-3 mt-2"
                            key={child?.id}
                          >
                            <li className="mb-1">
                              <Link
                                style={{ cursor: "pointer" }}
                                href={createUrl(child?.id, child?.slug)}
                                onClick={() => {
                                  console.log("theone", child?.id, child?.slug);
                                  getProductByCategory(child?.id, categoryId);
                                  setCategoryDetails({
                                    id: child?.id,
                                    slug: child.slug,
                                  });
                                }}
                                className={`text-white text-decoration-none small ${
                                  child.id == categoryId
                                    ? "activeSIdeBar"
                                    : "nonActiveBar"
                                }`}
                              >
                                {child?.name}
                              </Link>
                            </li>

                            {child.id == subCartId && (
                              <ul className="list-unstyled subcate-gories ms-3">
                                {subCategory.map((item) => {
                                  const url = createUrl(item?.id, item?.slug);
                                  if (!url || typeof url !== "string")
                                    return null;

                                  return (
                                    <li className="pt-0" key={item.id}>
                                      <Link
                                        href={url}
                                        onClick={() =>
                                          console.log("Navigating to", url)
                                        }
                                        className={`text-white text-decoration-none small ${
                                          item.id == categoryId
                                            ? "activeSIdeBar"
                                            : "nonActiveBar"
                                        }`}
                                      >
                                        {typeof item.name === "object"
                                          ? item.name.en
                                          : item.name}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </ul>
                        ))}

                      {/* {item?.id == showID &&
                        subCategory.find((item) => item.id == categoryId) &&
                        item?.children?.map((child) => (
                          <ul
                            className="list-unstyled subcate-gories ms-3 mt-2"
                            key={child?.id}
                          >
                            <li className="mb-1"></li>
                            <Link
                              style={{
                                cursor: "pointer",
                              }}
                              href={createUrl(child?.id, child?.slug)}
                              // href={""}

                              onClick={() => {
                                console.log(
                                  "dsdschild",
                                  child?.id,
                                  child?.slug
                                );
                                getProductByCategory(child?.id, categoryId);
                                setCategoryDetails({
                                  id: child?.id,
                                  slug: child.slug,
                                });

                                // const newUrl = createUrl(
                                //   child?.id,
                                //   child?.slug
                                // );
                                // console.log("NewURL", newUrl);
                                // router.push(newUrl);
                              }}
                              className={`text-white text-decoration-none small ${
                                child.id == categoryId
                                  ? "activeSIdeBar"
                                  : "nonActiveBar"
                              }`}
                            >
                              {child?.name}
                            </Link>

                            {child.id == subCartId && (
                              <ul className="list-unstyled subcate-gories ms-3">
                                {subCategory.map((item) => {
                                  const url = createUrl(item?.id, item?.slug);
                                  console.log(
                                    "createUrl output:",
                                    url,
                                    typeof url,
                                    typeof item
                                  );

                                  if (!url || typeof url !== "string")
                                    return null;

                                  return (
                                    <li className="pt-0" key={item.id}>
                                      <Link
                                        href={url}
                                        onClick={() => {
                                          console.log("Navigating to", url);
                                        }}
                                        className={`text-white text-decoration-none small ${
                                          item.id == categoryId
                                            ? "activeSIdeBar"
                                            : "nonActiveBar"
                                        }`}
                                      >
                                        {typeof item.name === "object"
                                          ? item.name.en
                                          : item.name}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </ul>
                        ))} */}
                    </li>
                  );
                })}

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
