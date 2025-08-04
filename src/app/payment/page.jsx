"use client";
import { CustomToast } from "@/components/CustomToast";
import { useNavigationStore } from "@/store/useNavigationstore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

// Use Zustand's getState() outside React components
const page = () => {
  const [method, setMethod] = useState("");
  const setNavigating = useNavigationStore((s) => s.setNavigating);
  const { setPaymentMethods } = useAuthStore.getState(); //

  const router = useRouter();
  const handleButton = () => {
    if (method?.length == 0) {
      CustomToast("Please Select Payment Method");
    } else {
      setNavigating(true);

      router.push(`/orderReview?method=${method}`);
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
                      setPaymentMethods(e.target.value);
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
                      setPaymentMethods(e.target.value);
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
                      setPaymentMethods(e.target.value);
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

              {/* <Link href={`/orderReview?method=${method}`}> */}
              <button
                onClick={() => {
                  handleButton();
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
