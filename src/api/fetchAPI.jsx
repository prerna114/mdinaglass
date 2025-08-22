import { API_BASE_URL } from "@/constant";
import { useAuthStore } from "@/store/useAuthStore"; // ✅ Import the store
import { CustomToast, SuccessToast } from "@/components/CustomToast";

// utils/fetchGlobal.js
export const fetchGlobal = async (
  url,
  { method = "GET", body, headers = {}, cache = "no-cache", params = {} } = {}
) => {
  let accessToken;

  // ✅ Prevent localStorage access during SSR or if `window` is undefined
  if (typeof window !== "undefined") {
    const tokenData = localStorage.getItem("token");
    const parsed = tokenData ? JSON.parse(tokenData) : null;
    accessToken = parsed?.token;
  }

  const queryString = new URLSearchParams(params).toString();
  const fullUrl = `${API_BASE_URL}${url}${
    queryString ? `?${queryString}` : ""
  }`;
  console.log("Method", method);
  try {
    const res = await fetch(`${fullUrl}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        // Accept: "application/json",

        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...headers,
        redirect: "follow",
      },
      ...(body && { body: JSON.stringify(body) }),
      cache,
    });

    const contentType = res.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    const data = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      if (res.status === 500 && typeof window !== "undefined") {
        CustomToast("Session expired Please login again", "top-right");
      }
      return {
        success: false,
        status: res.status,
        error: data?.message || data || "Request failed",
        errorData: data,
      };
    }

    return { success: true, status: res.status, data };
  } catch (err) {
    return { success: false, status: 500, error: err.message };
  }
};
