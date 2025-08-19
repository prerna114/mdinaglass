import { API_BASE_URL, products } from "@/constant";
import { useAuthStore } from "@/store/useAuthStore";
import { fetchGlobal } from "./fetchAPI";

// Use Zustand's getState() outside React components
const { logout } = useAuthStore.getState(); //
// export const addToTheCart = async (product, qty) => {
//   const tokenData = localStorage.getItem("token");
//   const parsed = tokenData ? JSON.parse(tokenData) : null;
//   const accessToken = parsed?.token;
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("Authorization", `Bearer ${accessToken}`);

//   const raw = JSON.stringify({
//     sku: product?.sku,
//     qty: qty,
//   });

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   try {
//     if (accessToken) {
//       const response = await fetch(
//         `${API_BASE_URL}api/blackbull/cart/add`,
//         requestOptions
//       );
//       if (response.status == 200) {
//         const result = await response.json(); // or use response.text() if needed
//         return {
//           status: response.status, // ✅ status code like 200, 401, etc.
//           result, // ✅ actual response payload
//         };
//       } else {
//         console.log("Response", response);

//         return response;
//       }
//     } else {
//     }
//   } catch (error) {
//     console.error("Add to cart error:", error.status);
//     return error;
//   }
// };

// export const getCartListing = async (sku, qty) => {
//   console.log("getCartListing");
//   const tokenData = localStorage.getItem("token");
//   const parsed = tokenData ? JSON.parse(tokenData) : null;
//   const accessToken = parsed?.token;
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("Authorization", `Bearer ${accessToken}`);

//   const requestOptions = {
//     method: "GET",
//     headers: myHeaders,

//     redirect: "follow",
//   };
//   const response = await fetch(
//     `${API_BASE_URL}api/blackbull/cart`,
//     requestOptions
//   );
//   if (response.status == 200) {
//     console.log("response", response);
//     const text = await response.text(); // first read as text to inspect

//     try {
//       const result = JSON.parse(text); // then try to parse manually
//       return {
//         status: response.status,
//         result,
//       };
//     } catch (e) {
//       console.error("Invalid JSON response. Raw body:", text);
//       return null;
//     }
//   } else if (response.status == 401) {
//     // logout();
//   } else {
//     return null;
//   }
// };

export const RemoveItemCart = async (id) => {
  const tokenData = localStorage.getItem("token");
  const parsed = tokenData ? JSON.parse(tokenData) : null;
  const accessToken = parsed?.token;
  const myHeaders = new Headers();
  const raw = JSON.stringify({
    item_id: id,
  });
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  const response = await fetch(
    `${API_BASE_URL}api/blackbull/cart/remove`,
    requestOptions
  );
  console.log("response123", response);
  if (response.status == 200) {
    console.log("response", response);
    const text = await response.text(); // first read as text to inspect

    try {
      const result = JSON.parse(text); // then try to parse manually
      return {
        status: response.status,
        result,
      };
    } catch (e) {
      console.error("Invalid JSON response. Raw body:", text);
      return null;
    }
  } else if (response.status == 401) {
    // logout();
  } else {
    return null;
  }
};

export const updateQuantityAPi = async (data) => {
  console.log("Update Data", data);
  let items = data.map((item) => ({
    item_id: item.id,
    qty: item.quantity ? item.quantity : item.qty, // Ensure quantity is set to 1 if not provided
  }));
  console.log("Items", items);
  const raw = {
    items: items,
  };
  const response = await fetchGlobal("api/blackbull/cart/update", {
    method: "PUT",
    body: raw,
  });
  console.log("Update Data", response);
  return response;
};
// export const updateQuantity = async (id, qty) => {
//   const tokenData = localStorage.getItem("token");
//   const parsed = tokenData ? JSON.parse(tokenData) : null;
//   const accessToken = parsed?.token;
//   const myHeaders = new Headers();
//   const raw = {
//     item_id: id,
//     qty: qty,
//   };

//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("Authorization", `Bearer ${accessToken}`);

//   const requestOptions = {
//     method: "PUT",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };
//   const response = await fetch(
//     `${API_BASE_URL}api/blackbull/cart/update`,
//     requestOptions
//   );
//   if (response.status == 200) {
//     console.log("response", response);
//     const text = await response.text(); // first read as text to inspect

//     try {
//       const result = JSON.parse(text); // then try to parse manually
//       return {
//         status: response.status,
//         result,
//       };
//     } catch (e) {
//       console.error("Invalid JSON response. Raw body:", text);
//       return null;
//     }
//   } else if (response.status == 401) {
//     // logout();
//   } else {
//     return null;
//   }
// };

export const getCartListing = async () => {
  const data = await fetchGlobal("api/blackbull/cart");

  return data;
};

export const addToTheCart = async (sku, qty, chooseSku) => {
  const raw = {
    sku: sku,
    qty: qty,
  };
  const data = await fetchGlobal("api/blackbull/cart/add", {
    method: "POST",
    body: raw,
  });
  return data;
};

export const checkOut = async () => {
  const billing = localStorage.getItem("billingaddress");
  const billingParse = JSON.parse(billing);

  const shipping = localStorage.getItem("shiipingaddreess");
  const shippingParse = JSON.parse(shipping);

  const raw = {
    billing: {
      first_name: billingParse.firstName,
      last_name: billingParse.lastName,
      email: billingParse.email,
      address: billingParse.addressOne + billingParse.addressTwo,
      city: billingParse.city,
      state: billingParse.state,
      country: billingParse.country,
      postcode: billingParse.zipCode,
      phone: billingParse.telePhone,
    },
    shipping: {
      first_name: shippingParse.firstName,
      last_name: shippingParse.lastName,
      email: shippingParse.email,
      address: shippingParse.addressOne + shippingParse.addressTwo,
      city: shippingParse.city,
      state: shippingParse.state,
      country: shippingParse.country,
      postcode: shippingParse.zipCode,
      phone: shippingParse.telePhone,
    },
    shipping_method: "eSeller International",
    payment_method: "cashondelivery",
  };
  const data = await fetchGlobal("api/blackbull/checkout", {
    method: "POST",
    body: raw,
  });
  console.log("Update Data", data);
  return data;
};

export const getOrderList = async () => {
  const data = await fetchGlobal("api/blackbull/orders");
  return data;
};

export const addCartGuest = async (product, qty, token) => {
  const raw = {
    sku: product,
    qty: qty,
  };

  const data = await fetchGlobal("api/blackbull/cart/guestAdd", {
    method: "POST",
    body: raw,

    headers: {
      "guest-token": token ? token : "",
    },
  });
  console.log("Update Data", data);
  return data;
};

export const getCartGuest = async (token) => {
  console.warn("getCartGuest token", token);

  const data = await fetchGlobal("api/blackbull/cart/guestCart", {
    method: "GET",
    // body: raw,
    headers: {
      "guest-token": token ? token : "",
    },
  });
  console.log("Update Data", data);
  return data;
};

export const updateGuestCart = async (data) => {
  console.log("Update Data updateGuestCart", data);
  let items = data.map((item) => ({
    sku: item.sku,
    qty: item.quantity ? item.quantity : item.qty, // Ensure quantity is set to 1 if not provided
  }));
  console.log("Items", items);
  const raw = {
    items: items,
  };
  const response = await fetchGlobal("api/blackbull/cart/guestUpdate", {
    method: "POST",
    body: raw,
    headers: {
      "guest-token": localStorage.getItem("guestToken") || "",
    },
  });
  console.log("Update Data", response);
  return response;
};

export const RemoveGuestCart = async (sku) => {
  console.log("Items", sku);
  const raw = {
    sku: sku,
  };
  const response = await fetchGlobal("api/blackbull/cart/guestRemove", {
    method: "POST",
    body: raw,
    headers: {
      "guest-token": localStorage.getItem("guestToken") || "",
    },
  });
  console.log("Update Data", response);
  return response;
};

export const guestcheckOut = async (guestToken, price, shippingMethod) => {
  const billing = localStorage.getItem("billingaddress");
  const billingParse = JSON.parse(billing);

  const shipping = localStorage.getItem("shiipingaddreess");
  const shippingParse = JSON.parse(shipping);

  const raw = {
    billing: {
      first_name: billingParse.firstName,
      last_name: billingParse.lastName,
      email: billingParse.email,
      address: billingParse.addressOne + billingParse.addressTwo,
      city: billingParse.city,
      state: billingParse.state,
      country: billingParse.country,
      postcode: billingParse.zipCode,
      phone: billingParse.telePhone,
    },
    shipping: {
      first_name: shippingParse.firstName,
      last_name: shippingParse.lastName,
      email: shippingParse.email,
      address: shippingParse.addressOne + shippingParse.addressTwo,
      city: shippingParse.city,
      state: shippingParse.state,
      country: shippingParse.country,
      postcode: shippingParse.zipCode,
      phone: shippingParse.telePhone,
    },
    shipping_method: shippingMethod,
    payment_method: "cashondelivery",
    shipping_price: JSON.stringify(price),
    guest_token: guestToken,
  };
  const data = await fetchGlobal("api/blackbull/guest-checkout", {
    method: "POST",
    body: raw,
  });
  console.log("Update Data", data);
  return data;
};

export const getShippingRate = async (
  itemWeightInGrams,
  destinationCountryIsoCode
) => {
  try {
    const response = await fetch(
      `/api/shippingRate?itemWeightInGrams=${itemWeightInGrams}&destinationCountryIsoCode=${destinationCountryIsoCode}`
    );

    const data = await response.json();

    return {
      ok: response.ok, // true if status is 2xx
      status: response.status,
      statusText: response.statusText,
      headers: response.headers, // You can access headers if needed
      data,
    };
  } catch (error) {
    console.error("Error fetching shipping rate:", error);
    return {
      ok: false,
      status: 0,
      error: error.message || "Unknown error",
      data: null,
    };
  }
};

export const getInsuranceRate = async (insuranceValue) => {
  try {
    console.log("insuranceValue", insuranceValue, typeof insuranceValue);
    const response = await fetch(`/api/insuranceRate?value=${insuranceValue}`);

    const data = await response.json();

    return {
      ok: response.ok, // true if status is 2xx
      status: response.status,
      statusText: response.statusText,
      headers: response.headers, // You can access headers if needed
      data,
    };
  } catch (error) {
    console.error("Error fetching shipping rate:", error);
    return {
      ok: false,
      status: 0,
      error: error.message || "Unknown error",
      data: null,
    };
  }
};
