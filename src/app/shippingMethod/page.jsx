"use client";
import { CustomToast } from "@/components/CustomToast";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigationStore } from "@/store/useNavigationstore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [giftOption, setGiftOption] = useState(false);
  const [seller, setSeller] = useState(false);

  const router = useRouter();
  const setGiftMessage = useAuthStore((state) => state.setGiftMessage);
  const setNavigating = useNavigationStore((s) => s.setNavigating);

  const handleChange = (e) => {
    setGiftMessage(e);
  };
  const handleClick = () => {
    console.log("seller", seller);
    if (seller) {
      router.push("/payment");
      setNavigating(true);
    } else {
      CustomToast("Please Select shipping Method", "top-right");
    }
  };
  useEffect(() => {
    setNavigating(false);
  }, []);
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
                <input
                  type="radio"
                  name="checkoutType"
                  onChange={() => {
                    setSeller(!seller);
                  }}
                />{" "}
                <label className="seller-Text">
                  eSeller International - €21.51
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
        <div className="login-signup">
          <h5 className="gift-text mt-4">
            Do you have any gift items in your order?
          </h5>
          <div className="Terms_condition">
            <input
              type="checkbox"
              name="checkoutType"
              className="custom-checkbox"
              onChange={(e) => {
                console.log("Log", e.target.value);
                setGiftOption(!giftOption);
              }}
            />{" "}
            <label className="shipping-Checkbox-text">
              &nbsp; Add Gift Options
            </label>
          </div>
          {giftOption && (
            <textarea
              required
              onChange={(e) => console.log("EEE", handleChange(e.target.value))}
              style={{ paddingLeft: 10, height: 150, width: "23%" }} // you can adjust height as needed
              placeholder="Gift Message*"
              rows={5}
            />
          )}
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

              {/* <Link href={"/payment" }> */}
              <button
                onClick={() => {
                  handleClick();
                }}
                className="btn btn-cart btn-info text-white back-button"
              >
                Continue
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
