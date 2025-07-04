"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ProductLists } from "@/store/product";
import { getProductCateogry } from "@/api/productApi";
import { createUrl } from "@/constant";
import { useMenuStore } from "@/store/useCategoryStore";

const SideMenuItem = ({
  item,
  level = 1,
  isFirst = false,
  parentPath = [],
}) => {
  const router = useRouter();
  const params = useParams();
  const allParams = params?.params || [];
  const priceIndex = allParams.findIndex((p) => p === "price");
  const categoryIds =
    priceIndex !== -1
      ? allParams.slice(0, priceIndex).map(Number)
      : allParams.map(Number);

  // console.log("All Params", params, categoryIds, allParams, priceIndex);
  const [selectedFilter, setSelectedFilter] = useState({
    variations: 0,
    color: 0,
  });

  const sortOrder = priceIndex !== -1 ? allParams[priceIndex + 1] : "asc";
  const limit = priceIndex !== -1 ? allParams[priceIndex + 2] : 15;
  const page = priceIndex !== -1 ? allParams[priceIndex + 3] : 1;
  const slugWithExt =
    priceIndex !== -1 ? allParams[priceIndex + 4] : "all-product";
  const cleanSlug = slugWithExt?.replace(/\.htm+$/i, "") || "all-product";

  const { subCategoryMap, setSubCategory } = useMenuStore();
  const { setProducts, setCategory, setHeading, setAllProduct } = ProductLists(
    (state) => state
  );
  const { loading, setLoading } = useMenuStore.getState();

  const fullPathToItem = [...parentPath, item.id];
  const isExpanded = categoryIds.includes(item.id);
  const isSelected =
    JSON.stringify(categoryIds) === JSON.stringify(fullPathToItem);

  const subCategories = subCategoryMap[item.id] || [];

  const handleClick = (item) => {
    console.log("Handle Clicked Item", item);
    setHeading(item.name);
    let newPath;
    const indexInPath = categoryIds.indexOf(item.id);

    if (indexInPath > -1 && categoryIds.length > fullPathToItem.length) {
      // Collapse: remove children
      newPath = categoryIds.slice(0, indexInPath + 1);
    } else {
      // Expand or Select
      newPath = fullPathToItem;
    }

    const newUrl = createUrl(newPath, item.slug, sortOrder, limit, page);
    router.push(newUrl, { scroll: false });

    if (item?.children?.length > 0) {
      // setCategory(item.children);
      console.log("Side Menu");
      getProductByCategory(item.id, selectedFilter);
    } else {
      getProductByCategory(item.id, selectedFilter);
      console.log("Side Menu");
    }
  };

  const getProductByCategory = async (id, selectedFilter) => {
    setLoading(true);
    setProducts([]);
    setCategory([]);
    if (id && selectedFilter && Object.keys(selectedFilter).length > 0) {
      const data = await getProductCateogry(id, selectedFilter);
      console.log("Product Data", data.data);

      if (data?.status === 200) {
        setAllProduct(data.data);
        if (data.data.products && data.data.products.length > 0) {
          setProducts(data.data.products);
        } else if (
          data?.data?.sub_categories &&
          data?.data?.sub_categories.length > 0
        ) {
          setCategory(data.data.sub_categories);
        }
        window.scrollTo({
          top: 500,
          behavior: "smooth", // Optional: for smooth scrolling animation
        });
        // setProducts(data.data.products || []);
        console.log("Product Data", data.data);
      } else {
        setProducts([]);
        setCategory([]);
        window.scrollTo({
          top: 500,
          behavior: "smooth", // Optional: for smooth scrolling animation
        });
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    if (item.children && item.children.length > 0 && !subCategoryMap[item.id]) {
      setSubCategory(item.id, item.children);
    }
  }, [item, subCategoryMap, setSubCategory]);

  useEffect(() => {
    const lastId = categoryIds[categoryIds.length - 1];
    if (lastId && lastId === item.id) {
      console.log("🔁 Triggering getProductByCategory for lastId:", lastId);
      getProductByCategory(lastId, selectedFilter);
      console.log("Side Menu");
    }
    const data = localStorage.getItem("filterdData");
    if (data) {
      const parsedData = JSON.parse(data);
      setSelectedFilter({
        color: parsedData?.color || 0,
        variations: parsedData?.variations || 0,
      });
      console.log("Parsed Data", parsedData);
    }
    console.log("Filter Data", data, selectedFilter);
  }, []);
  return (
    <li
      className={`mb-3 list-unstyled ${level === 1 ? "top-level-li" : ""}  `}
      style={{
        padding: 0,
        padding: "10px 30px 0px",
      }}
    >
      <a
        onClick={() => handleClick(item)}
        className={`list-unstyled category-sidebar 
    ${isSelected ? "activeSIdeBar" : level >= 3 ? "level-3" : "nonActiveBar"}
  `}
        style={{ cursor: "pointer", textTransform: "uppercase" }}
      >
        {item.name}
      </a>

      {isExpanded && subCategories.length > 0 && (
        <ul style={{ paddingLeft: "2px" }}>
          {subCategories.map((child) => (
            <React.Suspense key={child.id} fallback={<li>Loading...</li>}>
              <SideMenuItem
                item={child}
                level={level + 1}
                parentPath={fullPathToItem}
              />
            </React.Suspense>
          ))}
        </ul>
      )}
    </li>
  );
};

export default React.memo(SideMenuItem);
