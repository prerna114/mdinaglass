import axios from "axios";
import { API_BASE_URL } from "@/constant"; // Ensure this contains the base URL

export const getAllProduct = async (filterData, currentPage) => {
  const data = {
    limit: filterData?.limit,
    page: currentPage,
  };
  try {
    const response = await axios.get(`${API_BASE_URL}api/products`, {
      params: {
        limit: filterData?.limit,
        page: currentPage,
      },
    });
    console.log("Data", response); // Optional: for debugging
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export const getProductByID = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}api/products`, {
      params: {
        sku: id,
      },
    });
    console.log("Data", response.data.data); // Optional: for debugging
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};
