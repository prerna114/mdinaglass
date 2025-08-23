import { API_BASE_URL } from "@/constant"; // Ensure this contains the base URL
import { appAxios } from "./intercepter";
import { fetchGlobal } from "./fetchAPI";

export const getAllProduct = async (pagination) => {
  console.log("getAllProduct", pagination);
  const raw = {
    per_page: pagination?.per_page || 15,
    page: pagination?.page || 1,
    sort_by: pagination?.sort_by || "price",
    sort_dir: pagination?.sort_dir || "asc",
  };
  const data = await fetchGlobal(
    `api/blackbull/products?per_page=${raw?.per_page}&page=${raw?.page}&sort_by=${raw?.sort_by}&sort_dir=${raw?.sort_dir}`,
    {
      method: "GET",
    }
  );

  return data;
};

export const getProductByID = async (id) => {
  const data = await fetchGlobal(`api/blackbull/products/${id}`, {
    method: "GET",
  });
  return data;
};

export const getProductCateogry = async (id, pagination, color) => {
  const filter =
    localStorage.getItem("filterdData") &&
    JSON.parse(localStorage.getItem("filterdData"));
  const filterData = {
    color: filter?.color || 0,
    variations: filter?.variations || 0,
  };
  console.log("Inside ProductlIst", pagination);
  const data = {
    id: id,
    per_page: pagination.per_page || 15,
    page: pagination.page || 1,
    sort_by: pagination.sort_by || "price",
    sort_dir: pagination.sort_dir || "asc",
    filters: {
      ...(pagination?.size !== undefined &&
        pagination?.size && { size: pagination.size }),
      // ...(filterData != undefined &&
      //   filterData?.color !== 0 && { color: filterData?.color }),
      // ...(filterData?.variations !== undefined &&
      //   filterData?.variations !== 0 && {
      //     variations: filterData?.variations,
      //   }),

      // // variations: 22,
      // per_page: 10,
      // page: 1,
    },
  };
  const response = await fetchGlobal("api/categories/products-with-filters", {
    method: "POST",
    body: data,
  });
  return response;
};

export const getProductCateogrybyId = async (id) => {
  const data = await fetchGlobal(`api/categories/${id}`);
  return data;
};

export const getNewArrivalProduct = async () => {
  const raw = {
    per_page: 10,
    page: 1,
    sort_by: "price",
    sort_dir: "dsc",
  };
  const response = await fetchGlobal(
    "api/blackbull/products/newArrivalProducts",
    {
      method: "POST",
      body: raw,
    }
  );
  return response;
};

export const getRangeProduct = async (sku, id) => {
  console.log("getRangeProduct", sku, id);
  const raw = {
    category_id: id,
    product_sku: sku,
  };
  const response = await fetchGlobal(
    `api/blackbull/products/otherRangeProducts?range`,
    {
      method: "POST",
      body: raw,
    }
  );
  return response;
};
export const getSearchProduct = async (input, page, limit) => {
  const raw = {
    query: input,
    per_page: limit,
    page: page ? page : 1,
  };
  const data = await fetchGlobal("api/products/search", {
    method: "POST",
    body: raw,
  });
  console.log("Search Data Data", raw);
  return data;
};

export const addItemWIshlist = async (sku) => {
  const raw = {
    sku: sku,
  };
  const data = await fetchGlobal("api/blackbull/cart/addToWishlist", {
    method: "POST",
    body: raw,
  });
  console.log("WIshlist Data Data", raw);
  return data;
};

export const getWishList = async (id) => {
  const data = await fetchGlobal(`api/blackbull/cart/getWishlist`);
  return data;
};

export const removeItemWIshlist = async (id) => {
  const raw = {
    wishlist_item_id: id,
  };
  const data = await fetchGlobal("api/blackbull/cart/removeWishlistItem", {
    method: "POST",
    body: raw,
  });
  console.log("WIshlist Data Data", raw);
  return data;
};
