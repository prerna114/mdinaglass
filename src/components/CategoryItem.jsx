"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ProductLists } from "@/store/product";
import { getProductCateogry } from "@/api/productApi";
import { createUrl } from "@/constant";
import { useMenuStore } from "@/store/useCategoryStore";

const CategoryItem = ({ item }) => {
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

  const { setProducts, setCategory } = ProductLists((state) => state);

  const isExpanded = expandedIds.includes(item.id);
  const subCategories = subCategoryMap[item.id] || [];

  const getProductByCategory = async (id, slug, isInitial = false) => {
    const data = await getProductCateogry(id);
    if (data?.status === 200) {
      const subCats = data?.data?.sub_categories || [];
      setSubCategory(id, subCats);

      if (!isInitial) {
        toggleExpanded(id);
        const newUrl = createUrl([...expandedIds, id], slug);
        router.push(newUrl);
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

  return (
    <li className="mb-1 list-unstyled">
      <span
        onClick={() => getProductByCategory(item.id, item.slug)}
        style={{ cursor: "pointer", color: "black" }}
        className={`list-unstyled category-sidebar ${
          isExpanded ? "activeSIdeBar" : "nonActiveBar"
        }`}
      >
        {item.name}
      </span>

      {isExpanded && subCategories.length > 0 && (
        <ul>
          {subCategories.map((child) => (
            <CategoryItem key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CategoryItem;
