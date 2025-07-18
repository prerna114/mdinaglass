import { API_BASE_URL } from "@/constant";
import { appAxios } from "./intercepter";
import { fetchGlobal } from "./fetchAPI";

// export const registerCustomer = async (userDetails) => {
//   const data = {
//     email: userDetails.email,
//     first_name: userDetails.firstName,
//     last_name: userDetails.lastName,
//     password: userDetails.password,
//     password_confirmation: userDetails.confirmPassword,
//   };

//   try {
//     const response = await appAxios.post(
//       `${API_BASE_URL}api/customer/register`,
//       data,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       }
//     );
//     console.log("Data", response); // Optional: for debugging
//     return response;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return error.response.data.message;
//   }
// };

// export const Login = async (userName, password) => {
//   const credentials = {
//     email: userName,
//     password: password,
//   };

//   try {
//     const response = await appAxios.post(
//       `${API_BASE_URL}api/customer/login`,
//       credentials,
//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         withCredentials: false, // 🔒 Ensure cookies aren't sent
//       }
//     );

//     console.log("✅ Token:", response.data.token);
//     return response;
//   } catch (error) {
//     // console.error("❌ Login failed:", error.response?.data || error.message);
//     return error;
//   }
// };

// export const CmsInformation = async (slug) => {
//   try {
//     const response = await appAxios.get(
//       `${API_BASE_URL}api/blackbull/cms/${slug}`,

//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("✅ CMS:", response);
//     return response;
//   } catch (error) {
//     console.error("❌ Login failed:", error.response?.data || error.message);
//     return error;
//   }
// };

export const Login = async (userName, password) => {
  const credentials = {
    email: userName,
    password: password,
  };
  const data = await fetchGlobal("api/customer/login", {
    method: "POST",
    body: credentials,
  });
  return data;
};

export const CmsInformation = async (slug) => {
  const data = await fetchGlobal(`api/blackbull/cms/${slug}`, {
    method: "GET",
  });
  return data;
};

// api/customer/register
export const registerCustomer = async (userDetails) => {
  const raw = {
    email: userDetails.email,
    first_name: userDetails.firstName,
    last_name: userDetails.lastName,
    password: userDetails.password,
    password_confirmation: userDetails.confirmPassword,
  };

  const data = await fetchGlobal("api/customer/register", {
    method: "POST",
    body: raw,
  });
  return data;
};
