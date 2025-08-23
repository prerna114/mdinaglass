"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { ProductLists } from "@/store/product";
import { createUrl } from "@/constant";
import { useMenuStore } from "@/store/useCategoryStore";
import Link from "next/link";
import InstantLink from "./InstantClick";

const SideMenuItem = ({
  item,
  level = 1,
  parentPath = [],
  cateogoryParents,
}) => {
  const router = useRouter();
  const params = useParams();
  const allParams = useMemo(() => params?.params || [], [params]);
  const pathname = usePathname();
  // console.log("pathnameSideMenu", cateogoryParents);

  const priceIndex =
    !pathname.includes("search") && allParams.findIndex((p) => p === "price");
  const computedCategoryIds = useMemo(() => {
    if (cateogoryParents) return cateogoryParents;
    return priceIndex !== -1
      ? allParams.slice(0, priceIndex).map(Number)
      : allParams.map(Number);
  }, [cateogoryParents, allParams, priceIndex]);

  const categoryIds = computedCategoryIds;

  const sortOrder = priceIndex !== -1 ? allParams[priceIndex + 1] : "asc";
  const limit = priceIndex !== -1 ? allParams[priceIndex + 2] : 15;
  const page = priceIndex !== -1 ? 1 : 1;

  const { subCategoryMap, setSubCategory } = useMenuStore();

  const { setHeading, setFilterOption, setPagination, setDescription } =
    ProductLists((state) => state);

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
    setDescription(item.description);
    // console.log("levellevel", level, item);
    const indexInPath = categoryIds.indexOf(item.id);

    setPagination({
      per_page: 15,
      page: 1,
      sort_by: "price",
      sort_dir: "asc",
    });
    // setHeading(item.slug);

    // console.log("New Url")
    // router.push(newUrl, { scroll: false });
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

        setFilterOption(parsedData);
      }
    }
  }, [categoryIds, item.id, setFilterOption]);

  const urlSave = (fullPathToItem, slug, sortOrder, limit, page) => {
    const currentUrl = createUrl(fullPathToItem, slug, sortOrder, limit, page);
    // On first render or route change:
    const prevUrl = localStorage.getItem("currentUrl");
    if (prevUrl) {
      localStorage.setItem("currentUrl", prevUrl); // Save old as previous
    }
    localStorage.setItem("currentUrl", currentUrl);
    // console.log("currentUrl", currentUrl);
  };
  // console.log("subCategoriesSIdeMenu", categoryIds, fullPathToItem);
  return (
    <li
      className={`mb-3 list-unstyled ${level === 1 ? "top-level-li" : ""}`}
      style={{ padding: "0px 15px" }}
    >
      <div>
        <InstantLink
          href={createUrl(fullPathToItem, item.slug, sortOrder, limit, page)}
          style={{ margin: 0 }}
        >
          <p
            onClick={(e) => {
              urlSave(fullPathToItem, item.slug, sortOrder, limit, page);
              // e.preventDefault(); // optional if handleClick does router.push
              // handleClick(item);
              handleClick(item);
            }}
            className={`category-sidebar ${
              isSelected
                ? "activeSIdeBar"
                : level >= 3
                ? "level-3"
                : "nonActiveBar"
            } ${level > 1 ? "fontFamily" : level == 1 ? "Level-1" : ""}`}
            style={{
              cursor: "pointer",
              textTransform: "uppercase",
              fontSize: level == 1 ? "18px" : "13px",
            }}
          >
            {item.name}
          </p>
        </InstantLink>
        {/* </Link> */}
      </div>

      {isExpanded && subCategories.length > 0 && (
        <ul style={{ paddingLeft: "2px" }}>
          {subCategories.map((child) => {
            return (
              child.status == 1 && (
                <React.Suspense key={child.id} fallback={<li>Loading...</li>}>
                  <SideMenuItem
                    item={child}
                    level={level + 1}
                    parentPath={fullPathToItem}
                    cateogoryParents={cateogoryParents}
                  />
                </React.Suspense>
              )
            );
          })}
        </ul>
      )}
    </li>
  );
};

export default React.memo(SideMenuItem);
