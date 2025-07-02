import { buildProductUrl } from "./utils/buildProductUrl";
export const API_BASE_URL = "https://mdinaglasses.blackbullsolution.com/";
export const products = [
  {
    id: 1,
    orderId: "OrderId1234",
    price: 37.0,
    qty: 2,
    orderDate: "25 May 2024",
    orderStatus: "In-Transit",
  },
  {
    id: 2,
    orderId: "OrderId1234",
    price: 48.5,
    qty: 3,
    orderDate: "25 May 2024",
    orderStatus: "In-Transit",
  },
  {
    id: 3,
    orderId: "OrderId1234",
    price: 21.0,
    qty: 1,
    orderDate: "25 May 2024",
    orderStatus: "In-Transit",
  },
  {
    id: 4,
    orderId: "OrderId1234",
    price: 20.5,
    qty: 1,
    orderDate: "25 May 2024",
    orderStatus: "In-Transit",
  },
];
export const createUrl = (
  categoryID,
  slug,
  thesortORder,
  theLimit,
  thePage
) => {
  console.log("dsadadsadadsada", categoryID);
  let sortOrder = thesortORder ? thesortORder : "asc";
  let limit = theLimit ? theLimit : 15;
  let page = thePage ? thePage : 1;
  // console.log(
  //   "the params in create url",
  //   categoryID,
  //   slug,
  //   thesortORder,
  //   theLimit,
  //   thePage
  // );

  const idPath = Array.isArray(categoryID)
    ? categoryID.join("/")
    : String(categoryID);
  console.log("rohanrohanrohan123", categoryID);
  const cleanSlug = slug ? slug.replace(/\.htm+$/i, "") : "all-product";
  return buildProductUrl(idPath, sortOrder, limit, page, cleanSlug);
};
