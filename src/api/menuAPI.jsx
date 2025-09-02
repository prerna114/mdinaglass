import { API_BASE_URL } from "@/constant";
import { appAxios } from "./intercepter";
import { fetchGlobal } from "./fetchAPI";

// export const getMenuCategories = async () => {
//   console.log("Get Catrogires is clling");
//   const myHeaders = new Headers();
//   const requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//     redirect: "follow",
//   };

//   try {
//     const res = await fetch(
//       "https://mdinaglasses.blackbullsolution.com/api/menu-categories",
//       requestOptions
//     );
//     const data = await res.json(); // ✅ this is what you need

//     console.log("data", data[0]?.children);

//     localStorage.setItem("cart", JSON.stringify(data[0]?.children));

//     if (data[0]?.children) {
//       setShowMenu(true);
//     }
//   } catch (error) {
//     console.log("eror", error);
//   }
// };
export const getMenuCategories = async () => {
  const data = await fetchGlobal("api/menu-categories");
  return data;
};

export const getCarrerList = async () => {
  const data = await fetchGlobal("api/blackbull/get-careers-list");
  return data;
};
