"use client";
import { getSearchProduct } from "@/api/productApi";
import { createUrl } from "@/constant";
import { ProductLists } from "@/store/product";
import { useMenuStore } from "@/store/useCategoryStore";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const SearchFilter = ({ down }) => {
  const [paginationList, setPaginationList] = useState([]);
  const loading = useMenuStore((state) => state.loading);
  const setLoading = useMenuStore((state) => state.setLoading);

  const { paginationOption, setPagination, setSearchProduct, searchProduct } =
    ProductLists((state) => state);
  const router = useRouter();
  const params = useParams();
  const allParams = useMemo(() => params?.params || [], [params]);
  const [page, setPage] = useState(allParams[0]);
  const [limit, setLimit] = useState(allParams[2] || 15);

  useEffect(() => {
    const pagination = searchProduct?.pagination;
    console.log("paginationOption123", searchProduct?.pagination?.last_page);

    if (pagination && pagination.last_page) {
      setPaginationList(
        Array.from({ length: pagination.last_page }, (_, i) => i + 1)
      );
    }
  }, [searchProduct]); // depends on this, not just once on mount

  const startItem =
    (searchProduct?.pagination?.current_page - 1) *
      searchProduct?.pagination?.per_page +
    1;
  const endItem = Math.min(
    searchProduct?.pagination?.total,
    searchProduct?.pagination?.current_page *
      searchProduct?.pagination?.per_page
  );

  const searchItem = async (page) => {
    setLoading(true);
    console.log("allParamsAPI", allParams, page, limit);
    router.push(`/search/${allParams[0]}/${page}/${limit}`);

    const data = await getSearchProduct(allParams[0], page, limit);
    if (data.status == 200) {
      setSearchProduct(data.data);

      setLoading(false);
    } else {
      setLoading(false);
      CustomToast("Something went wrong", "top-right");
    }
    console.log("Data", data);
  };

  console.log(
    "paginationOptiontotal",
    allParams,
    // searchProduct?.pagination?.total,
    limit,
    page
  );
  useEffect(() => {
    if (allParams[1]) {
      setPage(allParams[1]);
    }
  }, [allParams]);

  console.log("searchProduct", searchProduct);
  return (
    <>
      <div className="row mb-3">{/* Pagination */}</div>

      {/* Items Count */}

      <div className="mb-3">
        <small className="text-muted">
          Items {startItem}-{endItem} of {searchProduct?.pagination?.total}{" "}
          total
        </small>
      </div>

      <div className="row mb-3">
        {searchProduct?.length == searchProduct?.pagination?.total ||
        searchProduct?.length == 0 ? (
          <div></div>
        ) : (
          <div className="col-md-12 col-lg-6">
            <nav aria-label="Product pagination">
              <ul className="pagination">
                {page > 1 && (
                  <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => {
                        if (page > 1) {
                          searchItem(page - 1);
                          // setPagination({
                          //   page: page - 1,
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
                    searchProduct?.pagination?.current_page == 1
                      ? searchProduct?.pagination?.current_page - 1
                      : searchProduct?.pagination?.current_page - 2,
                    searchProduct?.pagination?.current_page + 3
                  )
                  ?.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className={`page-item ${page == item ? "active" : ""}`}
                      >
                        <button
                          className="page-link"
                          onClick={(e) => {
                            window.location.href = `/search//${allParams[0]}/${item}/${limit}`;

                            console.log("Item", item);
                          }}
                        >
                          {item}
                        </button>
                      </li>
                    );
                  })}

                {searchProduct?.pagination?.last_page ===
                paginationOption?.page ? (
                  <div></div>
                ) : (
                  <li className="page-item">
                    <button
                      className={`page-link ${
                        searchProduct?.pagination?.last_page ===
                        paginationOption?.page
                          ? "disabled"
                          : ""
                      }`}
                      onClick={() => {
                        //   handleClick("", "", "", paginationOption?.page + 1);
                        searchItem(page + 1);
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
        <div className="col-md-4">
          <div className="d-flex  sorting-item align-items-center justify-content-end">
            <span>Items</span>
            <label htmlFor="currency-select" className="visually-hidden">
              Select Items
            </label>
            <select
              id="currency-select"
              className="form-select w-auto me-3"
              onChange={(e) => {
                // handleClick("", "", e.target.value, "");
                // // setPagination({
                // //   per_page: e.target.value,
                // // });
                // console.log("lmit", e.target.value);
                setLimit(e.target.value);
                router.push(
                  `/search/${allParams[0]}/${page}/${e.target.value}`
                );
              }}
              defaultValue={limit}
            >
              <option value={15}>15 Items</option>
              <option value={30}>30 Items</option>
              <option value={60}>60 Items</option>
              <option value={60}>120 Items</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilter;
