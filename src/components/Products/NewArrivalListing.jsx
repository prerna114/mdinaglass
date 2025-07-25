"use client";

import {
  getAllProduct,
  getNewArrivalProduct,
  getProductCateogry,
} from "@/api/productApi";
import { createUrl } from "@/constant";
import { ProductLists } from "@/store/product";
import { useAuthStore } from "@/store/useAuthStore";
import { useMenuStore } from "@/store/useCategoryStore";
import dynamic from "next/dynamic";
import { useParams, useRouter, usePathname } from "next/navigation";

import React, { useEffect, useMemo, useRef, useState } from "react";
import ListingSkeleton from "../Skeleton/ListingSkeleton";
const FilterProduct = dynamic(() => import("./FilterProduct"), {
  ssr: true,
  loading: () => <span className="visually-hidden">Loading...</span>,
});

const ProductGrid = dynamic(() => import("./ProductGrid"), {
  ssr: true,
  loading: () => <ListingSkeleton />,
});

const CategoryGrid = dynamic(() => import("./CategoryGrid"), {
  ssr: true,
  loading: () => <ListingSkeleton />,
});
const AboveMenu = dynamic(() => import("./AboveMenu"), {
  ssr: true,
  loading: () => <span className="visually-hidden">Loading...</span>,
});

const NewArrivalListing = ({ onDataLoaded }) => {
  const [productList, setProductList] = useState([]);
  const [categoryidList, setCategoryidList] = useState([]);
  const [cateogryArray, setCateogryArray] = useState([]);
  const pagination = ProductLists.getState().paginationOption;

  const loading = useMenuStore((state) => state.loading);
  const setLoading = useMenuStore((state) => state.setLoading);
  const sortBy = pagination.sort_by;

  console.log("sortBysortBy", sortBy);

  // console.log("All Params", sort_dir, per_page, page, slug);
  const { products, category, setHeading, setProducts } = ProductLists(
    (state) => state
  );

  const getNewProduct = async () => {
    const data = await getNewArrivalProduct();
    if (data.status == 200) {
      console.log("getNewProduct", data.data.data);
      setLoading(false);
      setProducts(data.data.data);
    }
  };

  useEffect(() => {
    setHeading("New Arrival");
    getNewProduct();
  }, []);

  // const [category, , sortOrder, limit, page, slug] = params?.params || [];

  console.log("Prodcts listing", products, categoryidList);

  return (
    <div className="productListing">
      {/* Filter Controls */}
      <AboveMenu />
      {/* Sort and Items Control */}
      {category?.length == 0 && (
        <>
          <FilterProduct down={false} />
        </>
      )}

      {loading && <ListingSkeleton />}

      {category?.length > 0 && !loading && <CategoryGrid category={category} />}

      {products?.length == 0 && category?.length == 0 && !loading && (
        <div className="no-data-found">
          <h1>No data found</h1>
        </div>
      )}

      {/* Product Grid */}

      {!loading && products?.length > 0 && category?.length == 0 && (
        <ProductGrid
          products={products}
          categoryidList={categoryidList}
          theloading={loading}
        />
      )}

      {/* Sort and Items Control */}
      {category?.length == 0 && (
        <>
          <FilterProduct down={true} />
        </>
      )}
    </div>
  );
};

export default NewArrivalListing;
