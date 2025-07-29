"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { ProductLists } from "@/store/product";
import { createUrl } from "@/constant";
import { useMenuStore } from "@/store/useCategoryStore";

const SideMenuItem = ({ item, level = 1, parentPath = [] }) => {
  const router = useRouter();
  const params = useParams();
  const allParams = useMemo(() => params?.params || [], [params]);

  const priceIndex = allParams.findIndex((p) => p === "price");
  const categoryIds = useMemo(
    () =>
      priceIndex !== -1
        ? allParams.slice(0, priceIndex).map(Number)
        : allParams.map(Number),
    [allParams, priceIndex]
  );

  const sortOrder = priceIndex !== -1 ? allParams[priceIndex + 1] : "asc";
  const limit = priceIndex !== -1 ? allParams[priceIndex + 2] : 15;
  const page = priceIndex !== -1 ? allParams[priceIndex + 3] : 1;

  const [selectedFilter, setSelectedFilter] = useState({
    variations: 0,
    color: 0,
  });
  const { subCategoryMap, setSubCategory } = useMenuStore();

  const { setHeading, setFilterOption, setPagination } = ProductLists(
    (state) => state
  );

  const fullPathToItem = useMemo(
    () => [...parentPath, item.id],
    [parentPath, item.id]
  );
  const isExpanded = categoryIds.includes(item.id);
  const isSelected = useMemo(
    () => JSON.stringify(categoryIds) === JSON.stringify(fullPathToItem),
    [categoryIds, fullPathToItem]
  );

  const subCategories = subCategoryMap[item.id] || [];

  const handleClick = (item) => {
    setHeading(item.name);
    console.log("levellevel", level, item);
    const indexInPath = categoryIds.indexOf(item.id);
    const newPath =
      indexInPath > -1 && categoryIds.length > fullPathToItem.length
        ? categoryIds.slice(0, indexInPath + 1)
        : fullPathToItem;
    setPagination({
      per_page: 15,
      page: 1,
      sort_by: "price",
      sort_dir: "asc",
    });
    const newUrl = createUrl(newPath, item.slug, sortOrder, limit, page);
    router.push(newUrl, { scroll: false });
  };

  useEffect(() => {
    if (item.children?.length && !subCategoryMap[item.id]) {
      setSubCategory(item.id, item.children);
    }
  }, [item, subCategoryMap, setSubCategory]);

  useEffect(() => {
    const lastId = categoryIds[categoryIds.length - 1];
    if (lastId === item.id) {
      const data = localStorage.getItem("filterdData");
      if (data) {
        const parsedData = JSON.parse(data);
        setSelectedFilter({
          color: parsedData?.color || 0,
          variations: parsedData?.variations || 0,
        });
        setFilterOption(parsedData);
      }
    }
  }, [categoryIds, item.id, setFilterOption]);

  console.log("subCategories", subCategories);
  return (
    <li
      className={`mb-3 list-unstyled ${level === 1 ? "top-level-li" : ""}`}
      style={{ padding: "5px 10px" }}
    >
      <div
        onClick={() => handleClick(item)}
        className={`category-sidebar ${
          isSelected ? "activeSIdeBar" : level >= 3 ? "level-3" : "nonActiveBar"
        } ${level > 1 ? "fontFamily" : ""}`}
        style={{
          cursor: "pointer",
          textTransform: "uppercase",
        }}
      >
        <p style={{ margin: 0 }}>{item.name}</p>
      </div>

      {isExpanded && subCategories.length > 0 && (
        <ul style={{ paddingLeft: "2px" }}>
          {subCategories.map((child) => {
            return (
              <>
                {child.status == 1 && (
                  <React.Suspense key={child.id} fallback={<li>Loading...</li>}>
                    <SideMenuItem
                      item={child}
                      level={level + 1}
                      parentPath={fullPathToItem}
                    />
                  </React.Suspense>
                )}
              </>
            );
          })}
        </ul>
      )}
    </li>
  );
};

export default React.memo(SideMenuItem);
