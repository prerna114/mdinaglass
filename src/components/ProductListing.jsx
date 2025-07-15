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
const ProductListing = ({ onDataLoaded }) => {
  const [productList, setProductList] = useState([]);
  const [categoryidList, setCategoryidList] = useState([]);
  const [cateogryArray, setCateogryArray] = useState([]);
  const [theLastI, setTheLastI] = useState("");

  const pathname = usePathname();
  const params = useParams();
  const allParams = useMemo(() => params?.params || [], [params]);

  const priceIndex = useMemo(
    () => allParams.findIndex((p) => p === "price"),
    [params]
  );

  const sku = useMemo(() => allParams[allParams.length - 1], [allParams]);
  const getProductByCategory = async (id, filter) => {
    localStorage.setItem("filterdData", JSON.stringify(filter));

    setLoading(true);

    if (id && filter && Object.keys(filter).length > 0) {
      console.log("=================Inside Prodct listing");
      const data = await getProductCateogry(id, filter);
      if (data?.status === 200) {
        const FilterData = data.data || [];

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
      // console.log(
      //   "IdELse nsde",
      //   id,
      //   filter,
      //   Object.keys(filter).length,
      //   products?.length,
      //   category?.length
      // );
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
      getProductByCategory(lastId, filterData);
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

  const loading = useMenuStore((state) => state.loading);
  const setLoading = useMenuStore((state) => state.setLoading);
  const sideMenu = useMenuStore((state) => state.sideMenu);

  const [levels, setLevels] = useState([]);

  const initialPage = 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [selectedFilter, setSelectedFilter] = useState({
    variations: 0,
    color: 0,
  });

  const {
    setProducts,
    filterOption,
    products,
    category,
    setCategory,
    allProduct,
    setFilterOption,
    setHeading,
  } = ProductLists((state) => state);
  const renderedDropdowns = useMemo(
    () => (
      <>
        {levels?.length > 0 &&
          levels.map((levelItems, index) => (
            <select
              key={index}
              className="form-select mt-2"
              value={cateogryArray[index] ?? ""} // 👈 Set selected value
              onChange={(e) => {
                const selectedId = Number(e.target.value);
                const element = levelItems.find((cat) => cat.id == selectedId);
                console.log("Selected Category", element);
                // handleClick(element);

                // Replace category IDs after this level
                const newArray = [...cateogryArray.slice(0, index), selectedId];
                setCateogryArray(newArray);
                //  const selectedId = Number(e.target.value);
                const newPath = [...cateogryArray.slice(0, index), selectedId];
                setCateogryArray(newPath);

                // Get selected item for slug
                const selectedItem = levels[index].find(
                  (cat) => cat.id === selectedId
                );
                const slug = selectedItem?.slug || "category";

                // Push to new URL
                const newUrl = createUrl(newPath, slug);
                console.log("New URL", newUrl);
                setProducts([]);
                setCategory([]);
                getProductByCategory(selectedId, filterData);

                router.push(newUrl, { scroll: false, shallow: false });
                setHeading(element?.name);

                // Optional: update URL here or use router.push(...)
              }}
            >
              <option value="">Select</option>
              {levelItems?.length > 0 &&
                levelItems.map((cat, index) => (
                  <option key={index} value={cat?.id}>
                    {cat?.name}
                  </option>
                ))}
            </select>
          ))}
      </>
    ),
    [levels, cateogryArray]
  );

  const SaveColor = () => {
    // const colors = allProduct?.filterable?.find((item) => item.code == "color");
    // const variation = allProduct?.filterable?.find(
    //   (item) => item.code == "variations"
    // );
    // console.log("Colors", variation?.options);
    // if (colors?.options?.length > 0) {
    //   setColorOptions(colors?.options);
    // }
    // if (variation?.options?.length > 0) {
    //   setVariationOption(variation?.options);
    // }
  };

  function sortProductsByPriceLowToHigh(products) {
    const data = [...products].sort(
      (a, b) =>
        parseFloat(a.prices.final.price) - parseFloat(b.prices.final.price)
    );
    console.log("Sorted Products by Price", data);
    setProducts(data);
  }
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

  const getLevels = () => {
    console.log("GetLEVELcall");
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

  // const handleClick = (item) => {
  //   const newPath = [...cateogryArray.slice(0, index), selectedId];
  //   setCategoryArray(newPath);

  //   // Get selected item for slug
  //   const selectedItem = levels[index].find((cat) => cat.id === selectedId);
  //   const slug = selectedItem?.slug || "category";

  //   // Push to new URL
  //   const newUrl = createUrl(newPath, slug);
  //   console.log("New URL", newUrl);
  //   // if (indexInPath > -1 && cateogryArray.length > fullPathToItem.length) {
  //   //   // Collapse: remove children
  //   //   newPath = cateogryArray.slice(0, indexInPath + 1);
  //   // } else {
  //   //   // Expand or Select
  //   //   newPath = fullPathToItem;
  //   // }

  //   // const newUrl = createUrl(newPath, item.slug, sortOrder, limit, page);
  //   // router.push(newUrl, { scroll: false });
  //   // console.log("New URL", newUrl);

  //   // if (item?.children?.length > 0) {
  //   //   // setCategory(item.children);
  //   //   console.log("===========Side Menu45", products);
  //   //   getProductByCategory(item.id, selectedFilter);
  //   // } else {
  //   //   getProductByCategory(item.id, selectedFilter);
  //   //   console.log("========= Side Menu1111", products);
  //   // }
  // };
  console.log("filterOption", category);
  return (
    <div className="productListing">
      {/* Filter Controls */}
      <div className="filter-are">
        <div className="row mb-4">
          <div className="side-bar-mobi">
            <div className="row">
              <div className="col-12">
                <h4 className="mb-3">Filter</h4>
                {/* {levels?.length > 0 &&
                  levels.map((levelItems, index) => (
                    <select
                      key={index}
                      className="form-select mt-2"
                      value={cateogryArray[index] ?? ""} // 👈 Set selected value
                      onChange={(e) => {
                        const selectedId = Number(e.target.value);
                        const element = levelItems.find(
                          (cat) => cat.id == selectedId
                        );
                        console.log("Selected Category", element);
                        // handleClick(element);

                        // Replace category IDs after this level
                        const newArray = [
                          ...cateogryArray.slice(0, index),
                          selectedId,
                        ];
                        setCateogryArray(newArray);
                        //  const selectedId = Number(e.target.value);
                        const newPath = [
                          ...cateogryArray.slice(0, index),
                          selectedId,
                        ];
                        setCateogryArray(newPath);

                        // Get selected item for slug
                        const selectedItem = levels[index].find(
                          (cat) => cat.id === selectedId
                        );
                        const slug = selectedItem?.slug || "category";

                        // Push to new URL
                        const newUrl = createUrl(newPath, slug);
                        console.log("New URL", newUrl);
                        getProductByCategory(selectedId, filterData);

                        router.push(newUrl, { scroll: false, shallow: false });
                        setHeading(element?.name);

                        // Optional: update URL here or use router.push(...)
                      }}
                    >
                      <option value="">Select</option>
                      {levelItems?.length > 0 &&
                        levelItems.map((cat, index) => (
                          <option key={index} value={cat?.id}>
                            {cat?.name}
                          </option>
                        ))}
                    </select>
                  ))} */}
                {renderedDropdowns}
              </div>
            </div>
          </div>

          {(category?.length == 0 ||
            (category?.length == 0 && products?.length == 0)) && (
            <>
              {filterOption?.colors?.length > 0 && (
                <div className="col-md-4 col-lg-3">
                  <select
                    defaultValue={selectedFilter.color}
                    className="form-select  mt-2"
                    onChange={(e) => {
                      console.log("Selected Color", e.target.value);
                      setSelectedFilter((prev) => ({
                        ...prev,
                        ["color"]: e.target.value,
                      }));
                      setProducts([]);
                      setCategory([]);
                      getProductByCategory(theLastI, {
                        ...selectedFilter,
                        color: e.target.value,
                      });
                    }}
                  >
                    <option value="0">ALL COLOURS</option>

                    {filterOption?.colors?.length > 0 &&
                      filterOption?.colors?.map((item, index) => (
                        <option value={item.id} key={index}>
                          {item.label}
                        </option>
                      ))}
                  </select>
                </div>
              )}
              {/* <div className="col-md-4 col-lg-3">
                <select className="form-select  mt-2">
                  <option>ALL PRICES</option>
                  <option>Under €20</option>
                  <option>€20 - €50</option>
                  <option>Over €50</option>
                </select>
              </div> */}
              {filterOption?.variations?.length > 0 && (
                <div className="col-md-4 col-lg-3">
                  <select
                    defaultValue={selectedFilter.variations}
                    className="form-select  mt-2"
                    onChange={(e) => {
                      console.log("Selected Color", e.target.value);
                      setSelectedFilter((prev) => ({
                        ...prev,
                        ["variations"]: e.target.value,
                      }));
                      setProducts([]);
                      setCategory([]);
                      getProductByCategory(theLastI, {
                        ...selectedFilter,
                        variations: e.target.value,
                      });
                      // getProductByCategory(theLastI);
                    }}
                  >
                    <option value={0}>All Variations</option>
                    {filterOption?.variations?.length > 0 &&
                      filterOption?.variations?.map((item, index) => (
                        <option value={item.id} key={index}>
                          {item.label}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/* Sort and Items Control */}
      {category?.length == 0 && (
        <>
          <FilterProduct />
        </>
      )}
      {products?.length > 15 && (
        <div className="col-md-12 col-lg-5">
          <nav aria-label="Product pagination">
            <ul className="pagination">
              {currentPage == 1 ? (
                <></>
              ) : (
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
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

      {loading && (
        // <div
        //   className="d-flex justify-content-center align-items-center"
        //   style={{ height: "50vh" }}
        // >
        //   <div
        //     className="spinner-border text-primary"
        //     role="status"
        //     style={{ width: "5rem", height: "5rem" }}
        //   >
        //     <span className="visually-hidden">Loading...</span>
        //   </div>
        // </div>
        <ListingSkeleton />
      )}

      {/* Category Grid */}
      {/* <div className="row">
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
                </div>
                <div className="card-body text-center">
                  <a
                    style={{
                      cursor: "pointer",
                    }}
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
                  <p className="card-text text-info fw-bold">
                    Price €
                    {product.min_price
                      ? Number(product.min_price).toFixed(2)
                      : "120.00"}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div> */}
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
      {category?.length == 0 ||
        (category?.length == 0 && products?.length == 0 && <FilterProduct />)}
    </div>
  );
};

export default ProductListing;
