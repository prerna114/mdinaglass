"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ProductLists } from "@/store/product";
import { getProductCateogry } from "@/api/productApi";
import { createUrl } from "@/constant";
import { useMenuStore } from "@/store/useCategoryStore";

const CategoryItem = ({ item, onDataLoaded, level = 1, isFirst = false }) => {
  const router = useRouter();
  const params = useParams();

  const priceIndex = params?.params?.findIndex((p) => p === "price") ?? -1;
  const categoryIds =
    priceIndex !== -1 ? params.params.slice(0, priceIndex).map(Number) : [];

  const {
    expandedIds,
    subCategoryMap,
    toggleExpanded,
    setSubCategory,
    hydrateFromStorage,
  } = useMenuStore();

  const { setProducts, setCategory, setAllProduct } = ProductLists(
    (state) => state
  );

  const isExpanded = expandedIds.includes(item.id);
  const subCategories = subCategoryMap[item.id] || [];

  const getProductByCategory = async (id, slug, isInitial = false) => {
    setProducts([]);
    setCategory([]);

    const data = await getProductCateogry(id);
    if (data?.status === 200) {
      const subCats = data?.data?.sub_categories || [];
      setSubCategory(id, subCats);
      setAllProduct(data?.data);
      if (!isInitial) {
        toggleExpanded(id);
        const pathToId = buildCategoryPath(id);
        useMenuStore.getState().setExpanded(pathToId);
        const newUrl = createUrl(pathToId, slug);
        router.push(newUrl);
        // const newUrl = createUrl([...expandedIds, id], slug);
        // router.push(newUrl);
      }

      if (subCats.length > 0) {
        setCategory(subCats);
        setProducts([]);
      } else if (data?.data?.products?.length > 0) {
        setProducts(data.data.products);
        setCategory([]);
      } else {
        setCategory([]);
        setProducts([]);
      }
      if (typeof onDataLoaded === "function") {
        // onDataLoaded();
      }
    }
  };
  // Only hydrate Zustand store once
  useEffect(() => {
    hydrateFromStorage();
  }, []);

  // On first load, expand if this item is in the URL
  useEffect(() => {
    const shouldExpand = categoryIds.includes(item.id);
    const hasNoChildren = !subCategories.length;

    if (shouldExpand && hasNoChildren) {
      getProductByCategory(item.id, item.slug, true);
    }
  }, [categoryIds.join("-")]);
  const expandCategoriesSequentially = async () => {
    useMenuStore.getState().setLoading(true);
    let newExpandedIds = [...expandedIds];

    for (let i = 0; i < categoryIds.length; i++) {
      const catId = categoryIds[i];

      // Check if already fetched
      const hasSubCats = subCategoryMap[catId];
      if (!hasSubCats) {
        const data = await getProductCateogry(catId);
        if (data?.status === 200) {
          const subCats = data?.data?.sub_categories || [];
          setSubCategory(catId, subCats);

          // Set only for last in the path
          const isLast = i === categoryIds.length - 1;

          if (isLast) {
            if (subCats.length > 0) {
              setCategory(subCats);
              setProducts([]);
            } else if (data?.data?.products?.length > 0) {
              setProducts(data.data.products);
              setCategory([]);
            } else {
              setCategory([]);
              setProducts([]);
            }
          }
        }
      }

      // Add to expanded list (if not already)
      if (!newExpandedIds.includes(catId)) {
        newExpandedIds.push(catId);
      }
      if (typeof onDataLoaded == "function") {
        // onDataLoaded();
      }
    }

    useMenuStore.getState().setExpanded(newExpandedIds);

    // Update URL for consistency
    const lastId = categoryIds[categoryIds.length - 1];

    const lastSlug = item.slug;
    const newUrl = createUrl(newExpandedIds, lastSlug);
    router.push(newUrl);
    // useMenuStore.getState().setLoading(false);
  };
  useEffect(() => {
    // Only root component should trigger recursive category expansion
    if (item.id !== categoryIds[0]) return;
    expandCategoriesSequentially();
  }, []);
  const buildCategoryPath = (id) => {
    const { parentMap } = useMenuStore.getState();
    const path = [id];
    let current = id;
    while (parentMap[current]) {
      current = parentMap[current];
      path.unshift(current);
    }

    expandCategoriesSequentially();
    return path;
  };

  console.log("shouldExpand", params, expandedIds, subCategoryMap);
  return (
    <li
      className={`mb-1 list-unstyled ${level === 1 ? "top-level-li" : ""}`}
      style={{
        padding: 0,
        paddingTop: "7px",
      }}
    >
      <span
        onClick={() => getProductByCategory(item.id, item.slug)}
        style={{
          cursor: "pointer",
        }}
        className={`list-unstyled category-sidebar ${
          isExpanded || (level === 1 && isFirst)
            ? "activeSIdeBar"
            : "nonActiveBar"
        }`}
      >
        {item.name}
      </span>

      {isExpanded && subCategories.length > 0 && (
        <ul>
          {subCategories.map((child) => (
            <React.Suspense key={child.id} fallback={<li>Loading...</li>}>
              <CategoryItem
                level={(level || 1) + 1}
                key={child.id}
                item={child}
              />
            </React.Suspense>
          ))}
        </ul>
      )}
    </li>
  );
};

export default React.memo(CategoryItem);
