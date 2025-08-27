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
    address1: userDetails?.addressOne,
    address2: userDetails?.addressTwo,
    city: userDetails?.city,
    state: userDetails?.state,
    country: userDetails?.country,
    postcode: userDetails?.zipCode,
    phone: userDetails?.telePhone,
  };

  const data = await fetchGlobal("api/customer/register", {
    method: "POST",
    body: raw,
  });
  return data;
};

export const forgotPassword = async (email) => {
  const raw = {
    email: email,
  };

  const data = await fetchGlobal("api/blackbull/customer/forgot-password", {
    method: "POST",
    body: raw,
  });
  return data;
};

export const resetUserPassword = async (userDetails, token) => {
  const raw = {
    email: userDetails?.email,
    token: token,
    password: userDetails?.password,
    password_confirmation: userDetails?.confirmPassword,
  };
  console.log("RAW Data", raw);
  const data = await fetchGlobal("api/blackbull/customer/reset-password", {
    method: "POST",
    body: raw,
  });
  return data;
};

export const UpdateProfile = async (loginUserDetails, address) => {
  const raw = {
    email: loginUserDetails?.email,
    first_name: loginUserDetails?.first_name,

    last_name: loginUserDetails?.last_name,

    password: loginUserDetails?.password || "",
    password_confirmation: loginUserDetails?.password_confirmation || "",
    billing_address: {
      address: address?.street,
      city: address?.city,
      state: address?.state,
      postcode: address?.postcode,
      country: address?.country,
      is_default: 1,
    },
  };

  console.log("Raw Data", raw);

  const data = await fetchGlobal("api/blackbull/customer/profile", {
    method: "PUT",
    body: raw,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};

// -----------------  Add Gift registry api
export const giftRegitry = async (userDetails, token) => {
  const raw = {
    title: "Wedding Registry",
    description: "Our wedding gift registry",
    event_date: "2025-06-15",
    event_type: "Wedding",
  };
  console.log("RAW Data", raw);
  const data = await fetchGlobal("api/blackbull/gift-registry/create", {
    method: "POST",
    body: raw,
  });
  return data;
};

export const addItemInGiftRegistry = async () => {
  const raw = {
    sku: "BUB-357-W6-SX",
    quantity: 21,
  };
  console.log("RAW Data", raw);
  const data = await fetchGlobal("api/blackbull/gift-registry/add-item", {
    method: "POST",
    body: raw,
  });
  return data;
};
