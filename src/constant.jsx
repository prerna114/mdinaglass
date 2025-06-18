import { buildProductUrl } from "./utils/buildProductUrl";

export const products = [
  {
    id: 1,
    orderId: "OrderId1234",
    price: 37.0,
    qty: 2,
    orderDate: "25 May 2024",
    orderStatus: "Deliver",
  },
  {
    id: 2,
    orderId: "OrderId1234",
    price: 48.5,
    qty: 3,
    orderDate: "25 May 2024",
    orderStatus: "Deliver",
  },
  {
    id: 3,
    orderId: "OrderId1234",
    price: 21.0,
    qty: 1,
    orderDate: "25 May 2024",
    orderStatus: "Deliver",
  },
  {
    id: 4,
    orderId: "OrderId1234",
    price: 20.5,
    qty: 1,
    orderDate: "25 May 2024",
    orderStatus: "Deliver",
  },
];
export const createUrl = (categoryID, slug) => {
  // console.log("dsada", slu g, categoryID);
  let sortOrder = "asc";
  let limit = 15;
  let page = 1;
  return buildProductUrl(categoryID, sortOrder, limit, page, slug);
};
