"use client";
import { createUrl } from "@/constant";
import { ProductLists } from "@/store/product";
import { useMenuStore } from "@/store/useCategoryStore";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const FilterProduct = ({ down }) => {
  const [data, setData] = useState(null);
  const initialPage = 1;
  const [paginationList, setPaginationList] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const loading = useMenuStore((state) => state.loading);
  const setLoading = useMenuStore((state) => state.setLoading);

  const {
    products,
    allProductwithFilter,
    paginationOption,
    setPagination,
    setAllProductwithFilter,
  } = ProductLists((state) => state);
  const router = useRouter();
  const params = useParams();
  const allParams = useMemo(() => params?.params || [], [params]);

  const priceIndex = allParams.findIndex((p) => p === "price");
  const limit = parseInt(allParams[priceIndex + 3]);
  console.log("Limti1234", limit);

  const handleClick = (sortName, newSortOrder, newLimit, newPage) => {
    const allParams = params?.params || [];
    const sortByName = paginationOption.sort_by;

    console.log("paginationOption.sort_by", paginationOption.sort_by);
    const priceIndex = allParams.findIndex((p) => p === sortByName);

    if (priceIndex === -1 || allParams.length < priceIndex + 5) return;

    // Extract from URL
    const categoryIds = allParams.slice(0, priceIndex).map(Number);
    const slug = allParams[priceIndex + 4] || "all-product.htm";

    // Apply new values or fallback to existing
    const sortOrder = newSortOrder || allParams[priceIndex + 1];
    const limit = newLimit || parseInt(allParams[priceIndex + 2]);
    const page = newPage || parseInt(allParams[priceIndex + 3]);
    const sortBy = sortName || allParams[priceIndex];
    console.log("All params", allParams, sortOrder, sortBy, newLimit);

    const newUrl = createUrl(categoryIds, slug, sortOrder, limit, page, sortBy);
    router.push(newUrl, { scroll: false });
    if (newLimit) {
      setPagination({
        per_page: newLimit,
      });
    } else if (page) {
      setPagination({
        page: page,
      });
    } else if (sortName) {
      setPagination({
        sort_by: sortName,
      });
    }

    console.log("New Url", newUrl);
  };

  useEffect(() => {
    const pagination = allProductwithFilter?.pagination;
    if (pagination && pagination.last_page) {
      setPaginationList(
        Array.from({ length: pagination.last_page }, (_, i) => i + 1)
      );
    }
  }, [allProductwithFilter]); // depends on this, not just once on mount

  console.log("paginationOption", allProductwithFilter);
  const startItem =
    (allProductwithFilter?.pagination?.current_page - 1) *
      allProductwithFilter?.pagination?.per_page +
    1;
  const endItem = Math.min(
    allProductwithFilter?.pagination?.total,
    allProductwithFilter?.pagination?.current_page *
      allProductwithFilter?.pagination?.per_page
  );
  // console.log(
  //   "paginationOption",
  //   paginationOption,
  //   paginationList.slice(
  //     paginationOption.page == 1
  //       ? paginationOption.page - 1
  //       : paginationOption.page - 2,
  //     paginationOption.page + 3
  //   )
  // );

  console.log(
    "paginationOption",
    paginationOption,
    paginationList,
    allProductwithFilter
  );
  return (
    <>
      <div className="row mb-3">
        <div className="col-md-12 col-lg-7">
          {!down && (
            <div className="row">
              <div className="col-md-6">
                <div className="d-flex sorting-style align-items-center">
                  <span>Sort by</span>
                  <select
                    className="form-select w-auto"
                    onChange={(e) => {
                      // sortProductsByPriceLowToHigh(products);
                      handleClick(e.target.value, "", "", "");
                    }}
                    defaultValue={paginationOption?.sort_by}
                  >
                    <option>Select</option>
                    <option value={"price"}>Price</option>
                    <option value={"name"}>Name</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex  sorting-item align-items-center justify-content-end">
                  <span>Items</span>
                  <label htmlFor="currency-select" className="visually-hidden">
                    Select Items
                  </label>
                  <select
                    id="currency-select"
                    className="form-select w-auto me-3"
                    onChange={(e) => {
                      handleClick("", "", e.target.value, "");
                      // setPagination({
                      //   per_page: e.target.value,
                      // });
                      console.log("lmit", e.target.value);
                    }}
                    defaultValue={paginationOption?.per_page}
                  >
                    <option value={15}>15 Items</option>
                    <option value={30}>30 Items</option>
                    <option value={60}>60 Items</option>
                  </select>
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className="d-flex sorting-style align-items-center">
                  <span>Colors</span>
                  <select
                    className="form-select w-auto"
                    onChange={(e) => {
                      // sortProductsByPriceLowToHigh(products);
                      handleClick(e.target.value, "", "", "");
                    }}
                    defaultValue={paginationOption?.sort_by}
                  >
                    <option>Select</option>
                    <option value={"price"}>Price</option>
                    <option value={"name"}>Name</option>
                  </select>
                </div>
              </div> */}
            </div>
          )}
        </div>

        {/* Pagination */}
      </div>

      {/* Items Count */}
      {!down && (
        <div className="mb-3">
          <small className="text-muted">
            Items {startItem}-{endItem} of{" "}
            {allProductwithFilter?.pagination?.total} total
          </small>
        </div>
      )}

      {products?.length == allProductwithFilter?.pagination?.total ||
      products?.length == 0 ? (
        <div></div>
      ) : (
        <div className="col-md-12 col-lg-6">
          <nav aria-label="Product pagination">
            <ul className="pagination">
              {paginationOption?.page > 1 && (
                <li
                  className={`page-item ${
                    paginationOption?.page === 1 ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => {
                      if (paginationOption?.page > 1) {
                        handleClick("", "", "", paginationOption?.page - 1);
                        // setPagination({
                        //   page: paginationOption?.page - 1,
                        // });
                      }
                    }}
                  >
                    Previous
                  </button>
                </li>
              )}

              {paginationList
                .slice(
                  paginationOption.page == 1
                    ? paginationOption.page - 1
                    : paginationOption.page - 2,
                  paginationOption.page + 3
                )
                ?.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={`page-item ${
                        paginationOption?.page === item ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={(e) => {
                          handleClick("", "", "", item);
                          // setPagination({
                          //   page: item,
                          // });
                          console.log("Item", item);
                        }}
                      >
                        {item}
                      </button>
                    </li>
                  );
                })}

              {allProductwithFilter?.pagination?.last_page ===
              paginationOption?.page ? (
                <div></div>
              ) : (
                <li className="page-item">
                  <button
                    className={`page-link ${
                      allProductwithFilter?.pagination?.last_page ===
                      paginationOption?.page
                        ? "disabled"
                        : ""
                    }`}
                    onClick={() => {
                      handleClick("", "", "", paginationOption?.page + 1);
                      // setPagination({
                      //   page: paginationOption?.page + 1,
                      // });
                    }}
                  >
                    Next &gt;
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default FilterProduct;
