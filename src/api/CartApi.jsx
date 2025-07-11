import { API_BASE_URL } from "@/constant";

export const addToTheCart = async (sku, qty) => {
  const tokenData = localStorage.getItem("token");
  const parsed = tokenData ? JSON.parse(tokenData) : null;
  const accessToken = parsed?.token;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const raw = JSON.stringify({
    sku: "85-23E-FR",
    qty: 1,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${API_BASE_URL}api/blackbull/cart/add`,
      requestOptions
    );
    if (response.status == 200) {
      const result = await response.json(); // or use response.text() if needed
      return {
        status: response.status, // ✅ status code like 200, 401, etc.
        result, // ✅ actual response payload
      };
    }
  } catch (error) {
    console.error("Add to cart error:", error);
    return null;
  }
};

export const getCartListing = async (sku, qty) => {
  const tokenData = localStorage.getItem("token");
  const parsed = tokenData ? JSON.parse(tokenData) : null;
  const accessToken = parsed?.token;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,

    redirect: "follow",
  };
  const response = await fetch(
    `${API_BASE_URL}api/blackbull/cart`,
    requestOptions
  );
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
  } else {
    return null;
  }
};
