"use client";
import { ProductLists } from "@/store/product";
import { useMenuStore } from "@/store/useCategoryStore";
import React, { useEffect, useState } from "react";

const FilterProduct = ({ apiCall }) => {
  const [data, setData] = useState(null);
  const initialPage = 1;

  const loading = useMenuStore((state) => state.loading);
  const setLoading = useMenuStore((state) => state.setLoading);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const {
    setProducts,
    products,
    allProductwithFilter,
    paginationOption,
    setAllProductwithFilter,
  } = ProductLists((state) => state);

  console.log("paginationList Filter", paginationOption);
  return (
    <>
      <div className="row mb-3">
        <div className="col-md-12 col-lg-7">
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex sorting-style align-items-center">
                <span>Sort by</span>
                <select
                  className="form-select w-auto"
                  onChange={(e) => {
                    if (e.target.value) {
                      if (e.target.value == "Price") {
                        // sortProductsByPriceLowToHigh(products);
                      }
                      console.log("Selected value", e.target.value);
                    }
                  }}
                >
                  <option>Select</option>
                  <option>Price</option>
                  <option>Name</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex  sorting-item align-items-center justify-content-end">
                <span>Items</span>
                <label htmlFor="currency-select" className="visually-hidden">
                  Select currency
                </label>
                <select
                  id="currency-select"
                  className="form-select w-auto me-3"
                  // value={filterData?.limit}
                  onChange={(e) => {
                    // handleFilter("limit", e.target.value);
                    // console.log("New", e.target.value);
                    setAllProductwithFilter(per_page, e.target.value);
                  }}
                >
                  <option value={15}>15 Items</option>
                  <option value={30}>30 Items</option>
                  <option value={60}>60 Items</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
      </div>

      {/* Items Count */}
      <div className="mb-3">
        <small className="text-muted">Items 1-9 of 9 total</small>
      </div>

      {products?.length > 15 && (
        <div className="col-md-12 col-lg-5">
          <nav aria-label="Product pagination">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => {
                    // if (currentPage > 1) {
                    //   handlePrevious(currentPage);
                    // }
                  }}
                  // disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>

              {/* {paginationList.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === item ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={(e) => {
                        setCurrentPage(item);
                        if (
                          paginationList[paginationList?.length - 1] == item
                        ) {
                          handlePagination(item, "next");
                        } else if (paginationList[0] == item && item > 1) {
                          handlePagination(item, "prev");
                        }
                      }}
                    >
                      {item}
                    </button>
                  </li>
                );
              })} */}

              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handleNext(currentPage)}
                >
                  Next &gt;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default FilterProduct;
