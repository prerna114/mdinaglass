"use client";

import { getAllProduct, getProductCateogry } from "@/api/productApi";
import { createUrl } from "@/constant";
import { ProductLists } from "@/store/product";
import { useAuthStore } from "@/store/useAuthStore";
import { useMenuStore } from "@/store/useCategoryStore";
import dynamic from "next/dynamic";
import { useParams, useRouter, usePathname } from "next/navigation";

import React, { useEffect, useMemo, useRef, useState } from "react";
import ListingSkeleton from "./Skeleton/ListingSkeleton";
import { useNavigationStore } from "@/store/useNavigationstore";
const FilterProduct = dynamic(
  () => import("../components/Products/FilterProduct"),
  {
    ssr: true,
    loading: () => <span className="visually-hidden">Loading...</span>,
  }
);

const ProductGrid = dynamic(
  () => import("../components/Products/ProductGrid"),
  {
    ssr: true,
    loading: () => <ListingSkeleton />,
  }
);

const CategoryGrid = dynamic(
  () => import("../components/Products/CategoryGrid"),
  {
    ssr: true,
    loading: () => <ListingSkeleton />,
  }
);
const AboveMenu = dynamic(() => import("./Products/AboveMenu"), {
  ssr: true,
  loading: () => <span className="visually-hidden">Loading...</span>,
});

const ProductListing = ({ SearchData }) => {
  const [productList, setProductList] = useState([]);
  const [categoryidList, setCategoryidList] = useState([]);
  const [cateogryArray, setCateogryArray] = useState([]);
  const [theLastI, setTheLastI] = useState("");
  const pagination = ProductLists.getState().paginationOption;
  const isNavigating = useNavigationStore((s) => s.isNavigating);

  const pathname = usePathname();
  const params = useParams();
  const allParams = useMemo(() => params?.params || [], [params]);
  const sortBy = pagination.sort_by;

  console.log("sortBysortBy", sortBy);
  const priceIndex = useMemo(
    () => allParams.findIndex((p) => p === sortBy),
    [params]
  );

  // console.log("All Params", sort_dir, per_page, page, slug);
  const {
    setProducts,
    setAllProductwithFilter,
    products,
    category,
    setCategory,
    allProduct,
    setFilterOption,
    setPagination,
  } = ProductLists((state) => state);

  const sku = useMemo(() => allParams[allParams.length - 1], [allParams]);

  const paginationOption = () => {
    // const params = useParams();

    const sortOrder = allParams[priceIndex + 1];
    const limit = parseInt(allParams[priceIndex + 2]);
    const page = parseInt(allParams[priceIndex + 3]);
    const sortBy = allParams[priceIndex];

    setPagination({
      per_page: limit,
      page: page,
      sort_by: sortBy,
      sort_dir: sortOrder,
    });
  };
  const getProductByCategory = async (id) => {
    // console.log("getProductByCategory", paginationOption);
    // localStorage.setItem("filterdData", JSON.stringify(filter));
    const pagination = ProductLists.getState().paginationOption;
    setLoading(true);
    console.log("getProductByCategory", pagination, id);

    if (id && pagination && Object.keys(pagination).length > 0) {
      console.log("getProductByCategory qwe", pagination);

      const data = await getProductCateogry(id, pagination);

      if (data?.status === 200) {
        // setAllProductwithFilter()
        const FilterData = data.data || [];
        setAllProductwithFilter(data.data);

        if (data.data.filterable?.length > 0) {
          const colors = FilterData?.filterable?.find(
            (item) => item.code == "color"
          );
          const variation = FilterData?.filterable?.find(
            (item) => item.code == "variations"
          );

          console.log("ColorsSideMenu", variation?.options, colors);
          if (colors?.options?.length > 0) {
            // setColorOptions(colors?.options);
            setFilterOption({
              colors: colors?.options,
            });
          }
          if (variation?.options?.length > 0) {
            setFilterOption({
              variations: variation?.options,
            });
            // setVariationOption(variation?.options);
          }
        }
        setProducts(data.data.products || []);
        setCategory(data.data.sub_categories || []);
        setLoading(false);
      } else {
        setProducts([]);
        setCategory([]);
        setLoading(false);
      }

      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  // console.log("Filter Option", filterOption);
  const fetchData = async () => {
    const data = await getAllProduct();
    console.log("Product car", data?.data?.data);
    if (data.status == 200) {
      setProducts(data?.data?.data);
      setLoading(false);
    } else {
      // setProductData([]);
    }
    setLoading(false);

    console.log("THe data", data);
  };

  const hasRunOnce = useRef(false);

  const intiziliaseDataChild = () => {
    console.log("Rohan0987");

    const categoryIds =
      priceIndex !== -1 ? allParams.slice(0, priceIndex).map(Number) : [];
    const lastId = categoryIds[categoryIds.length - 1];
    console.log("categoryIds", categoryIds, lastId);
    const subCateogry = localStorage.getItem("subCateogry");
    const parsedCateogry = subCateogry ? JSON.parse(subCateogry) : [];
    console.log("Category Ids", categoryIds, lastId, parsedCateogry);
    setCateogryArray(categoryIds);
    if (lastId) {
      setTheLastI(lastId);
    }
    const idPath = Array.isArray(categoryIds)
      ? categoryIds.join("/")
      : String(categoryIds);
    setCategoryidList(idPath);

    const findCategoryById = async (categories, targetId) => {
      for (const cat of categories) {
        if (cat.id === targetId) return cat;
        if (cat.children?.length) {
          const found = findCategoryById(cat.children, targetId);
          if (found) return found;
        }
      }
      return null;
    };
    const selectedCategory = findCategoryById(parsedCateogry, lastId);
    console.log("✅ selectedCategory", selectedCategory?.children);
    if (selectedCategory?.children?.length > 0) {
      setCategory(selectedCategory?.children);
      setProducts([]);
      setLoading(false);
      console.log("selectedCategory if");
    } else {
      console.log("selectedCategory else");
      setProducts([]);
      setCategory([]);

      getProductByCategory(lastId);
    }
  };
  // console.log("selectedCategory", hasRunOnce.current);
  useEffect(() => {
    const intiziliaseData = async () => {
      if (hasRunOnce.current) return;
      hasRunOnce.current = true;
      if (sku == "all-product.htm") {
        fetchData();
        console.log("Rohan123456");
      } else if (pathname == "/wishlist") {
        fetchData();
        console.log("Rohan123456");
      } else {
        intiziliaseDataChild();
      }
      const data = localStorage.getItem("filterdData");
      if (data) {
        const parsedData = JSON.parse(data);
        setSelectedFilter(parsedData);
        console.log("Parsed Data", parsedData);
      }
    };
    setTimeout(() => {
      intiziliaseData();
    }, 0);
  }, [pathname]);

  // const [category, , sortOrder, limit, page, slug] = params?.params || [];

  const loading = useMenuStore((state) => state.loading);
  const setLoading = useMenuStore((state) => state.setLoading);
  const sideMenu = useMenuStore((state) => state.sideMenu);

  const [levels, setLevels] = useState([]);

  const initialPage = 1;
  const [selectedFilter, setSelectedFilter] = useState({
    variations: 0,
    color: 0,
  });

  const getLevels = () => {
    console.log("GetLEVELcall", sideMenu, cateogryArray);
    if (!sideMenu || !Array.isArray(cateogryArray)) return;

    let currentLevel = Array.isArray(sideMenu) ? sideMenu : [];
    let newLevels = [];
    let children = [];

    for (let i = 0; i < cateogryArray.length; i++) {
      newLevels.push(currentLevel);

      const selectedId = Number(cateogryArray[i]);
      const match = currentLevel.find((cat) => cat.id == selectedId);
      console.log("currentLevel", match, selectedId);
      if (match) {
        console.log("currentLevel", currentLevel);
      }
      if (!match) {
        console.warn(`Category ID ${selectedId} not found at level ${i}`);
        currentLevel = [];
        break; // Stop further nesting
      }

      currentLevel = match.children || [];
    }

    console.log("Next Level", currentLevel);
    if (currentLevel.length > 0) {
      newLevels.push(currentLevel); // allow next level
    }

    setLevels(newLevels);
  };
  useEffect(() => {
    if (allProduct?.filterable?.length > 0) {
      // SaveColor();
      console.log("All Product Filterable", allProduct?.filterable);
    }
  }, [allProduct]);

  useEffect(() => {
    setTimeout(() => {
      getLevels();
    }, 0);
  }, [sideMenu, cateogryArray]);

  useEffect(() => {
    paginationOption();
  }, []);

  console.log("isNavigating", products);
  return (
    <div className="productListing">
      {/* Filter Controls */}
      <AboveMenu />
      {/* Sort and Items Control */}
      {products?.length > 0 && (
        <>
          <FilterProduct down={false} />
        </>
      )}

      {loading && <ListingSkeleton />}

      {category?.length > 0 && products?.length == 0 && !loading && (
        <CategoryGrid category={category} />
      )}

      {products?.length == 0 && category?.length == 0 && !loading && (
        <div className="no-data-found">
          <h1>No data found </h1>
        </div>
      )}

      {/* Product Grid */}

      {!loading && products?.length > 0 && (
        <ProductGrid
          products={products}
          categoryidList={categoryidList}
          theloading={loading}
        />
      )}

      {/* Sort and Items Control */}
      {products?.length > 0 && (
        <>
          <FilterProduct down={false} />
        </>
      )}
    </div>
  );
};

export default ProductListing;
