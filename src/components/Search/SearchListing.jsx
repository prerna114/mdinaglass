"use client";

import { ProductLists } from "@/store/product";
import { useMenuStore } from "@/store/useCategoryStore";
import dynamic from "next/dynamic";
import { useParams, useRouter, usePathname } from "next/navigation";

import React, { useEffect, useMemo, useRef, useState } from "react";
import ListingSkeleton from "../Skeleton/ListingSkeleton";
import { useNavigationStore } from "@/store/useNavigationstore";
const SearchFilter = dynamic(() => import("../Search/SearchFilter"), {
  ssr: true,
  loading: () => <span className="visually-hidden">Loading...</span>,
});

const SearchGrid = dynamic(() => import("../Search/SearchGrid"), {
  ssr: true,
  loading: () => <ListingSkeleton />,
});

const AboveMenu = dynamic(() => import("../Products/AboveMenu"), {
  ssr: true,
  loading: () => <span className="visually-hidden">Loading...</span>,
});

const SearchListing = ({ SearchData }) => {
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

  console.log("All Params", params);
  const { searchProduct, category, allProduct } = ProductLists(
    (state) => state
  );

  const sku = useMemo(() => allParams[allParams.length - 1], [allParams]);

  const paginationOption = () => {
    // const params = useParams();

    const sortOrder = allParams[priceIndex + 1];
    const limit = parseInt(allParams[priceIndex + 2]);
    const page = parseInt(allParams[priceIndex + 3]);
    const sortBy = allParams[priceIndex];

    console.log("paginationOption", sortBy, sortOrder, limit, page);
  };

  const loading = useMenuStore((state) => state.loading);

  useEffect(() => {
    if (allProduct?.filterable?.length > 0) {
      console.log("All Product Filterable", allProduct?.filterable);
    }
  }, [allProduct]);

  useEffect(() => {
    paginationOption();
  }, []);

  console.log("searchProductArray", searchProduct);
  return (
    <div className="productListing">
      {/* Filter Controls */}
      <AboveMenu />
      {/* Sort and Items Control */}

      {!loading && searchProduct?.products?.length != 0 && (
        <SearchFilter down={false} />
      )}

      {loading && <ListingSkeleton />}
      {!loading && searchProduct?.products?.length > 0 && (
        <SearchGrid
          products={searchProduct?.products}
          categoryidList={categoryidList}
          theloading={loading}
        />
      )}
      {searchProduct?.products?.length == 0 && !loading && (
        <div className="no-data-found">
          <h1>No data found </h1>
        </div>
      )}

      {/* Sort and Items Control */}

      {!loading && searchProduct?.products?.length != 0 && (
        <SearchFilter down={false} />
      )}
    </div>
  );
};

export default SearchListing;
