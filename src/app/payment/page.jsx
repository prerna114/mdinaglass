"use client";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [method, setMethod] = useState("");
  return (
    <div
      style={{
        background: "#f1f1f1",
      }}
    >
      <div className="header-product bg-white">
        <h1>Checkout: Select Delivery Method</h1>
      </div>
      <div className="container">
        <div className="login-signup">
          <div className="row">
            <div className="col-md-12">
              <div className="login-sec  checkout-sec">
                <h2>4. Select Payment Type</h2>
                <p>Select your Payment Method by selecting option below:</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="login-signup">
          <div className="row">
            <div className="shipping-Container">
              <div className="col-md-6 mb-4">
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    name="checkoutType"
                    value="visa"
                    checked={method === "visa"}
                    onChange={(e) => {
                      setMethod(e.target.value);
                      console.log("on click e", e.target.value);
                    }}
                  />
                  <label className="seller-Text mb-0">Pay by</label>
                  <img
                    src="/assets/visa.png"
                    alt="Visa"
                    style={{ height: 30, width: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="login-signup">
          <div className="row">
            <div className="shipping-Container">
              <div className="col-md-6 mb-4">
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    name="checkoutType"
                    checked={method === "paypal"}
                    value="paypal"
                    onChange={(e) => {
                      setMethod(e.target.value);
                      console.log("on click e", e.target.value);
                    }}
                  />
                  <label className="seller-Text mb-0">Pay by</label>
                  <img
                    src="/assets/paypal.png"
                    alt="Visa"
                    style={{ height: 30, width: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="login-signup">
          <div className="row">
            <div className="shipping-Container">
              <div className="col-md-6 mb-4">
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    name="checkoutType"
                    value="cash"
                    checked={method === "cash"}
                    onChange={(e) => {
                      setMethod(e.target.value);
                      console.log("on click e", e.target.value);
                    }}
                  />
                  <label className="seller-Text mb-0">Pay by</label>
                  <label className="cash-Text mb-0">Cash on Delivery</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="login-signup">
          <div className="col-md-12">
            <div
              className="d-flex pb-3 mt-3"
              style={{ justifyContent: "space-between" }}
            >
              <Link href={"#"}>
                <button className="btn btn-shop btn-primary back-button">
                  Back
                </button>
              </Link>

              <Link href={`/orderReview?method=${method}`}>
                <button className="btn btn-cart btn-info text-white back-button">
                  Continue
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
