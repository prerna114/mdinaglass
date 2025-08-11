import { fetchGlobal } from "./fetchAPI";

export const exploreCateory = async (id) => {
  const data = await fetchGlobal(`api/get-category`, {
    method: "GET",
  });
  return data;
};
export const sliderSetting = async (id) => {
  const data = await fetchGlobal(`api/get-web-setting`, {
    method: "GET",
  });
  return data;
};
