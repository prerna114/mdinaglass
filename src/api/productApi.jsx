import axios from "axios";
import { API_BASE_URL } from "@/constant"; // Ensure this contains the base URL

export const getAllProduct = async (category, filterData, currentPage) => {
  const data = {
    limit: filterData?.limit,
    page: currentPage,
  };
  try {
    const response = await axios.get(`${API_BASE_URL}api/products`, {
      params: {
        limit: filterData?.limit,
        page: currentPage,
        category_id: category,
      },
    });
    console.log("Data", response); // Optional: for debugging
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export const getProductByID = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}api/blackbull/products/${id}`
    );
    console.log("Data", response.data.data); // Optional: for debugging
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export const getProductCateogry = async (id) => {
  console.log("getProductCateogryData"); // Optional: for debugging
  const filter =
    localStorage.getItem("filterdData") &&
    JSON.parse(localStorage.getItem("filterdData"));
  const filterData = {
    color: filter?.color || 0,
    variations: filter?.variations || 0,
  };

  const data = {
    id: id,
    filters: {
      ...(filterData != undefined &&
        filterData?.color !== 0 && { color: filterData?.color }),
      ...(filterData?.variations !== undefined &&
        filterData?.variations !== 0 && {
          variations: filterData?.variations,
        }),

      // variations: 22,
      per_page: 10,
      page: 1,
    },
  };
  // console.log("getProductCateogryData", data, filter); // Optional: for debugging
  try {
    const response = await axios.post(
      `${API_BASE_URL}api/categories/products-with-filters`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("getProductCateogry", response); // Optional: for debugging
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export const getProductCateogrybyId = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}api/categories/${id}`);
    console.log("getProductCateogry", response); // Optional: for debugging
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};
