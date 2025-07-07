"use client";

import AddToCart from "@/components/AddToCart";
import GiftVoucher from "@/components/GiftVoucher";
import { useCartStore } from "@/store";
import Link from "next/link";
import React from "react";

const page = () => {
  const { cart } = useCartStore((state) => state);
  const subtotal = (price, qty) => (price * qty).toFixed(2);

  return (
    <div
      style={{
        background: "#f1f1f1",
      }}
    >
      <div className="header-product bg-white">
        <h1>Checkout: Order Review</h1>
      </div>
      <div className="container">
        <div className="login-signup">
          <div className="row">
            <div className="col-md-12">
              <div className="login-sec  checkout-sec">
                <h2>6. Order Review</h2>
                <p>
                  Please confirm your order below before proceeding to payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="subContainer">
          <div
            className="row mt-3"
            style={{
              backgroundColor: "white",
              padding: 20,
            }}
          >
            {/* Billing Info Box 1 */}
            <div className="col-12 col-md-4">
              <div className=" p-3 mb-3 h-100">
                <div className="d-flex justify-content-between">
                  <h5 className="billing-text">Billing Information:</h5>
                </div>
                <p className="mb-1 billing-text-name">Rohan Rohan</p>
                <p className="mb-1 billing-text-name">dec5377@gmail.com</p>
                <p className="mb-1 billing-text-name">
                  B 64 A Vikas Vihar Kakrolla
                </p>
                <p className="mb-1 billing-text-name">Address 2</p>
                <p className="mb-1 billing-text-name">
                  New Delhi, Delhi, 110078, India
                </p>
                <p className="mb-0 billing-text-name">Tel: 07011391100</p>
                <a href="#" className="text-primary">
                  Edit
                </a>
              </div>
            </div>

            {/* Billing Info Box 2 */}
            <div className="col-12 col-md-4">
              <div className="p-3 mb-3 h-100">
                <div className="d-flex justify-content-between">
                  <h5 className="billing-text">Shipping Information</h5>
                </div>
                <p className="mb-1 billing-text-name ">Rohan Rohan</p>
                <p className="mb-1 billing-text-name ">dec5377@gmail.com</p>
                <p className="mb-1 billing-text-name ">
                  B 64 A Vikas Vihar Kakrolla
                </p>
                <p className="mb-1 billing-text-name ">Address 2</p>
                <p className="mb-1 billing-text-name ">
                  New Delhi, Delhi, 110078, India
                </p>
                <p className="mb-0 billing-text-name ">Tel: 07011391100</p>
                <a href="#" className="text-primary">
                  Edit
                </a>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="p-3 mb-3 h-100">
                <div className="d-flex justify-content-between">
                  <h5 className="billing-text">Shipping Method:</h5>
                </div>
                <p className="mb-1 billing-text-name ">eSeller International</p>
                <a href="#" className="text-primary">
                  Edit
                </a>
                <div>
                  <div className="d-flex justify-content-between">
                    <h5 className="billing-text mt-2">Payment Method:</h5>
                  </div>
                  <p className="mb-1 billing-text-name ">
                    Card Payment (Using Trust Payments 3D Secure Hosted
                    Checkout)
                  </p>
                  <a href="#" className="text-primary">
                    Edit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {cart?.length != 0 && (
        <div
          className="cart-page-main"
          style={{
            background: "#f1f1f1",
          }}
        >
          <div className="container">
            <div className="align-cart">
              <div className="table-responsive-sm">
                <table className="table cart-table table-bordered">
                  <thead className="thead-dark">
                    <tr className="tr-bg">
                      <th>PRODUCT NAME</th>
                      <th>PRICE</th>
                      <th>QTY</th>
                      <th>SUBTOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        {/* <td>
                          <img src={item.image} alt={item.name} width="80" />
                        </td> */}
                        <td>{item.name}</td>
                        <td>€{item.price.toFixed(2)}</td>
                        <td>
                          <input
                            type="number"
                            value={item.qty}
                            min="1"
                            className="form-control"
                            style={{ width: "70px" }}
                            onChange={(e) =>
                              updateQuantity(item.id, parseInt(e.target.value))
                            }
                          />
                        </td>
                        <td>€{subtotal(item.price, item.qty)}</td>
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
              {/* 
              <AddToCart />
              <GiftVoucher /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
