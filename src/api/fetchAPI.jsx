import { API_BASE_URL } from "@/constant";

// utils/fetchGlobal.js
export const fetchGlobal = async (
  url,
  { method = "GET", body, headers = {}, cache = "no-cache" } = {}
) => {
  const tokenData = localStorage.getItem("token");
  const parsed = tokenData ? JSON.parse(tokenData) : null;
  const accessToken = parsed?.token;
  console.log("Method", method);
  try {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...headers,
        redirect: "follow",
      },
      ...(body && { body: body }),
      cache,
    });

    const contentType = res.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    const data = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        error: data?.message || data || "Request failed",
      };
    }

    return { success: true, status: res.status, data };
  } catch (err) {
    return { success: false, status: 500, error: err.message };
  }
};
