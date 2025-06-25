import Link from "next/link";
import React from "react";

const page = () => {
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
                <h2>4. Shipping Method</h2>
                <p>Select your Shipping Method by selecting option below:</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="login-signup">
          <div className="row">
            <div className="col-md-12">
              <div className="shipping-Container">
                <input type="radio" name="checkoutType" />{" "}
                <label className="seller-Text">
                  eSeller International - €39.02
                </label>
                <br></br>
                <span className="shipping-info">
                  A reliable, cost effective service with tracking number.
                  Delivery aim from dispatch is approx. 10 working days for
                  European destinations and from 21 working days for the rest of
                  the world.
                </span>
                <p className="delivery-condition">
                  The above times are based on indications by MaltaPost and
                  Mdina Glass is not responsible for actual delivery times.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div>
          <h5 className="gift-text mt-2">
            Do you have any gift items in your order?
          </h5>
          <div className="Terms_condition">
            <input
              type="checkbox"
              name="checkoutType"
              className="custom-checkbox"
            />{" "}
            <label className="shipping-Checkbox-text">
              &nbsp; Add Gift Options
            </label>
          </div>
        </div>
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

            <Link href={"/payment"}>
              <button className="btn btn-cart btn-info text-white back-button">
                Continue
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
