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
  const data = {
    id: id,
    filters: {
      color: 24,
      variations: 22,
      per_page: 10,
      page: 1,
    },
  };
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
