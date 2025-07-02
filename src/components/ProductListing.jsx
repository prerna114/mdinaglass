"use client";

import { getAllProduct } from "@/api/productApi";
import { createUrl } from "@/constant";
import { ProductLists } from "@/store/product";
import { useAuthStore } from "@/store/useAuthStore";
import { useMenuStore } from "@/store/useCategoryStore";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";

import React, { useEffect, useRef, useState } from "react";

const ProductListing = ({ onDataLoaded }) => {
  const [productList, setProductList] = useState([]);
  const params = useParams();
  // console.log("currentCategoryId", params);

  // const [category, , sortOrder, limit, page, slug] = params?.params || [];
  const [paginationList, setPaginationList] = useState([1, 2, 3]);
  const initialLimit = 15;
  const [filterData, setFilterData] = useState({
    limit: initialLimit,
  });

  const router = useRouter();
  const handleFilter = (name, value) => {
    setFilterData((prev) => ({
      ...prev,
      [name]: name === "limit" ? Number(value) : value,
    }));
  };

  // console.log(
  //   "dskmkmk ohrna",
  //   { category, sortOrder, limit, page, slug },
  //   filterData
  // );
  // const [loading, setLoading] = useState(false);
  const { menu } = useAuthStore((state) => state);
  const { loading, setLoading } = useMenuStore.getState();

  const initialPage = 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const { setProducts, products, category, setCategory, allProduct } =
    ProductLists((state) => state);
  // const [subCategory, setSubCategory] = useState([]);

  // const getProductList = async () => {
  //   setLoading(true);

  //   console.log("getProductList");

  //   let data = "";
  //   if (slug == "all-product.htm") {
  //     console.log("With Slug");
  //     data = await getAllProduct("", filterData, currentPage);
  //   } else {
  //     data = await getAllProduct(category, filterData, currentPage);
  //     console.log("Without Slug", slug);
  //   }
  //   if (data) {
  //     console.log("Get Prouct api s calling");
  //     console.log("Product Lsiting", category);

  //     const newURL = createUrl(
  //       category,
  //       slug,
  //       "",
  //       filterData?.limit,
  //       currentPage
  //     );

  //     // router.replace(newURL);
  //     // router.refresh();

  //     // router.push(newURL);
  //     setProductList(data?.data?.data);
  //     setLoading(false);
  //   } else {
  //     setProductList([]);
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   getProductList();
  //   console.log("Filter data", filterData, currentPage);
  // }, [filterData, currentPage]);

  const handlePagination = (item, action) => {
    const totalLEnght = productList?.meta?.total;
    //  if(item> )
    let array = [];
    console.log("TH elnght ", item, action);
    if (action == "prev" && item > 1) {
      array = [item - 2, item - 1, item];
    } else if (action == "next" && item > 1) {
      array = [item, item + 1, item + 2];
    } else if (item == 1) {
      setPaginationList([1, 2, 3]);
    } else {
      if (item > 1) {
        array = [item, item + 1, item + 2];
      }
    }
    setPaginationList(array);
  };

  const handlePrevious = (currentPage) => {
    if (currentPage == paginationList[0]) {
      setCurrentPage((prev) => prev - 1);

      const array = [currentPage - 2, currentPage - 1, currentPage];
      setPaginationList(array);
    } else {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = (currentPage) => {
    if (currentPage == paginationList[paginationList?.length - 1]) {
      setCurrentPage((prev) => prev + 1);
      const array = [currentPage, currentPage + 1, currentPage + 2];
      setPaginationList(array);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    if (typeof onDataLoaded === "function") {
      const timer = setTimeout(() => {
        // onDataLoaded();
        console.log("✅ onDataLoaded function called");
      }, 50);

      // Cleanup on unmount
      return () => clearTimeout(timer);
    }
  }, [onDataLoaded]);

  const buildCategoryPath = (id) => {
    const { parentMap } = useMenuStore.getState();
    const path = [id];
    let current = id;

    while (parentMap[current]) {
      current = parentMap[current];
      path.unshift(current);
    }

    // expandCategoriesSequentially();
    console.log("qqqqqqqqqqqq");
    return path;
  };
  useEffect(() => {
    const hasLoaded =
      (Array.isArray(products) && products.length > 0) ||
      (Array.isArray(category) && category.length > 0) ||
      (!products.length && !category.length); // Handles "no results" case

    if (hasLoaded) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setLoading(true);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    console.log("");
  }, [products, category]);
  useEffect(() => {
    setLoading(true);
  }, []);
  // console.log("allProduct", category?.length, products?.length, loading);
  return (
    <div className="productListing">
      {/* Filter Controls */}
      <div className="filter-are">
        <div className="row mb-4">
          <div className="side-bar-mobi">
            <div className="row">
              <div className="col-12">
                <select
                  className="form-select mt-2"
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const data = menu.filter((item) => item.id == selectedId);
                    console.log("Select edimd", selectedId, data);
                    setSubCategory(data[0]?.children);

                    const selectedProduct = menu.find(
                      (m) => m.id === selectedId
                    );
                    const href = createUrl(data[0].id, data[0]?.slug);
                    // console.log("HREF TAG", href);
                    router.push(href); // or use <Link> separately
                  }}
                >
                  <option
                  // key={product.id}
                  // onClick={(e) => {
                  //   console.log("Eeeeeee", e);
                  // }}
                  // value={product.id}
                  >
                    Select
                  </option>
                  {menu?.length > 0 &&
                    menu?.map((product) => (
                      <option
                        key={product.id}
                        onClick={(e) => {
                          // console.log("Eeeeeee", e);
                        }}
                        value={category ? category : product.id}
                      >
                        {product.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {(category?.length == 0 ||
            (category?.length == 0 && products?.length == 0)) && (
            <>
              <div className="col-md-4 col-lg-3">
                <select className="form-select  mt-2">
                  <option>SHAPE</option>
                  <option>Round</option>
                  <option>Square</option>
                  <option>Oval</option>
                </select>
              </div>
              <div className="col-md-4 col-lg-3">
                <select className="form-select  mt-2">
                  <option>ALL COLOURS</option>
                  <option>Blue</option>
                  <option>Amber</option>
                  <option>Green</option>
                  <option>Clear</option>
                </select>
              </div>
              <div className="col-md-4 col-lg-3">
                <select className="form-select  mt-2">
                  <option>ALL PRICES</option>
                  <option>Under €20</option>
                  <option>€20 - €50</option>
                  <option>Over €50</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Sort and Items Control */}
      {category?.length == 0 ||
        (category.length == 0 && productList?.length == 0 && (
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
                          }
                        }}
                      >
                        <option>Price</option>
                        <option>Name</option>
                        <option value={"Newest"}>Newest</option>
                        <option>Popular</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex  sorting-item align-items-center justify-content-end">
                      <span>Items</span>
                      <select
                        className="form-select w-auto me-3"
                        value={filterData?.limit}
                        onChange={(e) => {
                          handleFilter("limit", e.target.value);
                          // console.log("New", e.target.value);
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
              {true && (
                <div className="col-md-12 col-lg-5">
                  <nav aria-label="Product pagination">
                    <ul className="pagination">
                      {currentPage == 1 ? (
                        <></>
                      ) : (
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => {
                              if (currentPage > 1) {
                                handlePrevious(currentPage);
                              }
                            }}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>
                        </li>
                      )}

                      {paginationList.map((item, index) => {
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
                                // console.log("eeeeeee", e);
                                // if (currentPage == currentPage) {
                                // } else if (currentPage < item) {
                                // }
                                setCurrentPage(item);
                                if (
                                  paginationList[paginationList?.length - 1] ==
                                  item
                                ) {
                                  handlePagination(item, "next");
                                } else if (
                                  paginationList[0] == item &&
                                  item > 1
                                ) {
                                  handlePagination(item, "prev");
                                }
                              }}
                            >
                              {item}
                            </button>
                          </li>
                        );
                      })}

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
            </div>

            {/* Items Count */}
            <div className="mb-3">
              <small className="text-muted">Items 1-9 of 9 total</small>
            </div>
          </>
        ))}

      {loading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "5rem", height: "5rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Category Grid */}
      <div className="row">
        {category?.length > 0 &&
          !loading &&
          category?.map((product) => (
            <div key={product.id} className="col-lg-4 col-md-6 mb-4">
              <div className=" product-card">
                <div className="position-relative">
                  <img
                    src={
                      product.logo_image
                        ? product.logo_image
                        : "/assets/lamp.png"
                    }
                    className="card-img-top"
                    alt={product.name}
                    style={{}}
                  />
                  {/* {product.hasOptions && (
                  <div className="m-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`options-${product.id}`}
                      />
                      <label
                        className="form-check-label small text-muted"
                        htmlFor={`options-${product.id}`}
                      >
                        Click for more options
                      </label>
                    </div>
                  </div>
                )} */}
                </div>
                <div className="card-body text-center">
                  <a
                    style={{
                      cursor: "pointer",
                    }}
                    // href={{
                    //   pathname: `/product-details/webshop/${product?.id}`,
                    //   query: { sku: product?.sku },
                    // }}
                    href={"#"}
                    onClick={() => {
                      // console.log("dsada", product);
                      const pathToId = buildCategoryPath(product?.id);
                      useMenuStore.getState().setExpanded(pathToId);
                      const newUrl = createUrl(pathToId, product.slug);

                      // console.log("New url ,", newUrl);
                      router.push(newUrl);
                    }}
                  >
                    <h6 className="card-title mb-3">{product.name}</h6>
                  </a>
                  {/* <h6 className="card-title mb-3">{product.name}</h6> */}
                  <p className="card-text text-info fw-bold">
                    Price {product.min_price ? product.min_price : "120"}
                  </p>
                </div>
              </div>
            </div>
          ))}

        {products?.length == 0 && category?.length == 0 && !loading && (
          <div className="no-data-found">
            <h1>No data found</h1>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="row">
        {products?.length > 0 &&
          !loading &&
          products?.map((product) => (
            <div key={product.id} className="col-lg-4 col-md-6 mb-4">
              <div className=" product-card">
                <div className="position-relative">
                  <img
                    src={"/assets/bg-image.png"}
                    className="card-img-top"
                    alt={product.name}
                    style={{}}
                  />
                  {/* {product.hasOptions && (
                  <div className="m-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`options-${product.id}`}
                      />
                      <label
                        className="form-check-label small text-muted"
                        htmlFor={`options-${product.id}`}
                      >
                        Click for more options
                      </label>
                    </div>
                  </div>
                )} */}
                </div>
                <div className="card-body text-center">
                  <Link
                    href={{
                      pathname: `/product-details/webshop/${product?.id}`,
                      query: { sku: product?.sku },
                    }}
                    // href={"#"}
                    onClick={() => {
                      // console.log("dsada", product);
                    }}
                  >
                    <h6 className="card-title mb-3">{product.name}</h6>
                  </Link>
                  {/* <h6 className="card-title mb-3">{product.name}</h6> */}
                  <p className="card-text text-info fw-bold">
                    Price {product.min_price}
                  </p>
                </div>
              </div>
            </div>
          ))}

        {/* {(category?.length == 0 || products.length == 0) && !loading && (
          <div className="no-data-found">
            <h1>No data found</h1>
          </div>
        )} */}
      </div>

      {/* Sort and Items Control */}
      {category?.length == 0 ||
        (category?.length == 0 && products?.length == 0 && (
          <div className="row mb-3">
            <div className="col-md-12 col-lg-7">
              <div className="row">
                <div className="col-md-6 col-lg-6">
                  <div className="d-flex sorting-style align-items-center">
                    <span>Sort by</span>
                    <select className="form-select w-auto">
                      <option>Price</option>
                      <option>Name</option>
                      <option>Newest</option>
                      <option>Popular</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="d-flex  sorting-item align-items-center justify-content-end">
                    <span>Items</span>
                    <select
                      className="form-select w-auto me-3"
                      value={filterData?.limit}
                      onChange={(e) => {
                        handleFilter("limit", e.target.value);
                        // console.log("New", e.target.value);
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
            {true && (
              <div className="col-md-12 col-lg-5">
                <nav aria-label="Product pagination">
                  <ul className="pagination">
                    {currentPage == 1 ? (
                      <></>
                    ) : (
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => {
                            if (currentPage > 1) {
                              handlePrevious(currentPage);
                            }
                          }}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                    )}

                    {paginationList.map((item, index) => {
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
                              // console.log("eeeeeee", e);
                              // if (currentPage == currentPage) {
                              // } else if (currentPage < item) {
                              // }
                              setCurrentPage(item);
                              if (
                                paginationList[paginationList?.length - 1] ==
                                item
                              ) {
                                handlePagination(item, "next");
                              } else if (
                                paginationList[0] == item &&
                                item > 1
                              ) {
                                handlePagination(item, "prev");
                              }
                            }}
                          >
                            {item}
                          </button>
                        </li>
                      );
                    })}

                    {/* <li
                  className={`page-item ${currentPage === 2 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(2)}
                  >
                    2
                  </button>
                </li>
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(3)}
                  >
                    3
                  </button>
                </li> */}
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
          </div>
        ))}
    </div>
  );
};

export default ProductListing;
