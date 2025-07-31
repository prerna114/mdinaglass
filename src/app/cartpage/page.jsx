"use client";

import AddToCart from "@/components/AddToCart";

import GiftVoucher from "@/components/GiftVoucher";
import React, { useEffect, useMemo, useState } from "react";
import CartHeading from "@/components/CartHeading";
import Link from "next/link";
import { useCartStore } from "@/store";
import { CustomToast, SuccessToast } from "@/components/CustomToast";
import { useAuthStore } from "@/store/useAuthStore";
import { RemoveItemCart, updateQuantity } from "@/api/CartApi";
import dynamic from "next/dynamic";
// import TrustPaymentForm from "@/components/TrustPaymentForm";
const TrustPaymentForm = dynamic(
  () => import("../../components/TrustPaymentForm"),
  {
    ssr: false,
  }
);

const PaymentLink = dynamic(() => import("../../components/PaymentLink"), {
  ssr: false,
});

const page = () => {
  const { cart, removeFromCart, updateQuantity } = useCartStore(
    (state) => state
  );
  const { isLogin } = useAuthStore((state) => state);

  console.log("isLogin", isLogin);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Glass Bead Necklace & Bracelet Set",
      price: 29.0,
      qty: 1,
      image: "/assets/bracelet1.png",
      gift: false,
    },
    {
      id: 2,
      name: "Frosted Glass Bead Bracelet",
      price: 12.0,
      qty: 1,
      image: "/assets/bracelet1.png",
      gift: false,
    },
  ]);

  const updateTheQuantity = (id, newQty) => {
    console.log("ID", id, newQty);

    updateQuantity(id, newQty);
  };

  const toggleGift = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, gift: !item.gift } : item
      )
    );
  };

  const removeTheItem = (id) => {
    removeFromCart(id);
    SuccessToast("Item Remove succusfully", "top-right");
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    const tokenData = localStorage.getItem("token");
    const parsed = tokenData ? JSON.parse(tokenData) : null;
    const accessToken = parsed?.token;
    if (confirmed && accessToken) {
      removeItem(id);
      // User clicked "Yes"
      console.log("Item deleted");
    } else if (confirmed && !accessToken) {
      removeTheItem(id);
    } else {
      // User clicked "No"
      console.log("Action cancelled");
    }
  };

  const removeItem = async (id) => {
    const data = await RemoveItemCart(id);
    console.log("Data", data);
    if (data.status == 200) {
      SuccessToast("Item Remove succusfully", "top-right");
      removeFromCart(id);
      console.log("removeFromCart", id);
    } else {
      CustomToast("Something went wrong", "top-right");
    }
  };

  const subtotal = (price, qty) => {
    console.log("Sub totle", price, qty);
    return Number(price * qty).toFixed(2);
  };

  console.log("Cart", cart);
  return (
    <div>
      {/* <Header /> */}
      {/* <MegaMenu /> */}
      <CartHeading />

      {cart?.length == 0 && (
        <div
          style={{
            marginBottom: "60px",
            color: "#666",
          }}
        >
          <h1 className="text-center"> Shopping Cart is Empty.</h1>
          <p className="text-center">
            You have no items in your shopping cart.
          </p>
          <div>
            <div className="text-center  header-of-cart">
              <Link href="/">
                <button className="btn btn-info text-white">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {cart?.length != 0 && (
        <div
          className="cart-page-main"
          style={{
            background: "#f1f1f1",
          }}
        >
          <div className="container">
            <div className="align-cart">
              <div className="header-of-cart">
                <div className="row align-items-center">
                  <div className="col-md-8"></div>

                  <div className="col-md-4">
                    <div className="text-right button-margin float-right mb-3 mt-5">
                      <Link href={isLogin ? "/checkout" : "/loginCheckoutPage"}>
                        <button className="btn btn-info text-white">
                          Proceed To Checkout
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="table-responsive-sm">
                <table className="table cart-table table-bordered">
                  <thead className="thead-dark">
                    <tr className="tr-bg">
                      <th>ITEM</th>
                      <th>PRODUCT NAME</th>
                      <th>UNIT PRICE</th>
                      <th>SUBTOTAL</th>
                      <th>QTY</th>
                      <th>GIFT</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={index}>
                        <td>
                          {item?.images?.length > 0 &&
                            item?.images[0]?.small_image_url && (
                              <img
                                src={item?.images[0]?.small_image_url}
                                alt={item.name}
                                width="80"
                              />
                            )}
                        </td>
                        <td>{item.name}</td>
                        <td>
                          €
                          {isNaN(Number(item?.price))
                            ? parseFloat(
                                item?.min_price?.replace(/[^0-9.]/g, "")
                              )
                            : Number(item.price).toFixed(2)}
                        </td>
                        <td>
                          €
                          {subtotal(
                            item.min_price
                              ? parseFloat(
                                  item.min_price?.replace(/[^0-9.]/g, "")
                                )
                              : item.price,
                            item.quantity ? item?.quantity : item.qty
                          )}
                        </td>
                        <td>
                          <input
                            type="number"
                            value={item.quantity ? item.quantity : item.qty}
                            min="1"
                            className="form-control"
                            style={{ width: "70px" }}
                            onChange={(e) =>
                              updateTheQuantity(
                                item.id,
                                parseInt(e.target.value)
                              )
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={item.gift}
                            onChange={() => toggleGift(item.id)}
                          />
                        </td>
                        <td className="text-center">
                          <span
                            className="text-info"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(item.id)}
                          >
                            &times;
                          </span>
                          <div className="fonsizee" style={{ color: "grey" }}>
                            Remove
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <table className="checkout-table table-row-1 checkout-table-mobile">
                <thead>
                  <tr>
                    <td className="col-item">Item</td>
                    <td className="col-name">Product Name</td>
                    <td className="col-price">Unit Price</td>
                    <td className="col-subtotal">Subtotal</td>
                  </tr>
                </thead>
              </table>

              <div className="table-row-3">
                <div className="row">
                  <div className="col-item">
                    <div>
                      <img src="/assets/bracelet1.png" className="w-100" />
                    </div>
                  </div>

                  <div className=" col-name">
                    <h6>Dog (standing) - Brown</h6>
                  </div>
                  <div className=" col-price">
                    <h6>€17.00</h6>
                  </div>

                  <div className=" col-subtotal">
                    <h6>€17.00</h6>
                  </div>

                  <div className="col-input mt-3">
                    <h6>
                      Qty{" "}
                      <span>
                        <input type="number"></input>
                      </span>
                    </h6>
                  </div>

                  <div className="col-gift mt-3">
                    <h6>
                      Gift{" "}
                      <span>
                        <input type="checkbox"></input>
                      </span>
                    </h6>
                  </div>
                  <div className="col-remove mt-3">
                    <h6>x Remove</h6>
                  </div>
                </div>
              </div>
              <hr className="display-option" />
              <div className="table-row-3">
                <div className="row">
                  <div className="col-item">
                    <div>
                      <img src="/assets/bracelet1.png" className="w-100" />
                    </div>
                  </div>

                  <div className=" col-name">
                    <h6>Dog (standing) - Brown</h6>
                  </div>
                  <div className=" col-price">
                    <h6>€17.00</h6>
                  </div>

                  <div className=" col-subtotal">
                    <h6>€17.00</h6>
                  </div>

                  <div className="col-input mt-3">
                    <h6>
                      Qty{" "}
                      <span>
                        <input type="number"></input>
                      </span>
                    </h6>
                  </div>

                  <div className="col-gift mt-3">
                    <h6>
                      Gift{" "}
                      <span>
                        <input type="checkbox"></input>
                      </span>
                    </h6>
                  </div>
                  <div className="col-remove mt-3">
                    <h6>x Remove</h6>
                  </div>
                </div>
              </div>

              <AddToCart />
              <GiftVoucher />
            </div>
          </div>
        </div>
      )}
      <TrustPaymentForm />
      {/* <PaymentLink /> */}

      {/* <Footer /> */}
    </div>
  );
};

export default page;
