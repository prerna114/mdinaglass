"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { ProductLists } from "@/store/product";
import { createUrl } from "@/constant";
import { useMenuStore } from "@/store/useCategoryStore";
import Link from "next/link";

const SideMenuItem = ({ item, level = 1, parentPath = [] }) => {
  const router = useRouter();
  const params = useParams();
  const allParams = useMemo(() => params?.params || [], [params]);
  const pathname = usePathname();
  console.log("pathnameSideMenu", pathname.includes("search"));

  const priceIndex =
    !pathname.includes("search") && allParams.findIndex((p) => p === "price");
  const categoryIds = useMemo(
    () =>
      priceIndex !== -1
        ? allParams.slice(0, priceIndex).map(Number)
        : allParams.map(Number),
    [allParams, priceIndex]
  );

  const sortOrder = priceIndex !== -1 ? allParams[priceIndex + 1] : "asc";
  const limit = priceIndex !== -1 ? allParams[priceIndex + 2] : 15;
  const page = priceIndex !== -1 ? 1 : 1;

  const [selectedFilter, setSelectedFilter] = useState({
    variations: 0,
    color: 0,
  });
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
        setSelectedFilter({
          color: parsedData?.color || 0,
          variations: parsedData?.variations || 0,
        });
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
    console.log("currentUrl", currentUrl);
  };
  console.log("subCategories", subCategories);
  return (
    <li
      className={`mb-3 list-unstyled ${level === 1 ? "top-level-li" : ""}`}
      style={{ padding: "0px 15px" }}
    >
      <div
      // onClick={() => handleClick(item)}
      // className={`category-sidebar ${
      //   isSelected ? "activeSIdeBar" : level >= 3 ? "level-3" : "nonActiveBar"
      // } ${level > 1 ? "fontFamily" : ""}`}
      // style={{
      //   cursor: "pointer",
      //   textTransform: "uppercase",
      // }}
      >
        {/* <Link href={"/"}> */}
        <Link
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
        </Link>
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
