import { API_BASE_URL } from "@/constant";
import { appAxios } from "./intercepter";

export const registerCustomer = async (id) => {
  const data = {
    email: "customer@example.com",
    first_name: "John",
    last_name: "Doe",
    password: "customer123",
    password_confirmation: "customer123",
  };

  try {
    const response = await appAxios.post(
      `${API_BASE_URL}api/v1/customer/register`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Data", response.data.data); // Optional: for debugging
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export const Login = async (userName, password) => {
  const credentials = {
    email: userName,
    password: password,
  };

  try {
    const response = await axios.appAxios(
      `${API_BASE_URL}api/customer/login`,
      credentials,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: false, // 🔒 Ensure cookies aren't sent
      }
    );

    console.log("✅ Token:", response.data.token);
    return response;
  } catch (error) {
    // console.error("❌ Login failed:", error.response?.data || error.message);
    return error;
  }
};
