"use client";
import { applyCoupon, verfiyCoupon } from "@/api/productApi";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CustomToast, SuccessToast } from "./CustomToast";
import { getCartGuest, getCartListing } from "@/api/CartApi";
import { useCartStore } from "@/store";
import { useNavigationStore } from "@/store/useNavigationstore";
import { fetchCart } from "@/app/hooks/useCart";

const GiftVoucher = () => {
  const { isLogin } = useAuthStore((state) => state);
  const setNavigating = useNavigationStore((s) => s.setNavigating);

  const [guestToken, setGuestToken] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const {
    addToCart,
    cart,
    clearCart,
    setCartTotal,
    setAllCart,
    setDiscountAmount,
    allCart,
  } = useCartStore((state) => state);
  const router = useRouter();
  const processCheck = () => {
    console.log("guestTokenguestToken", guestToken);

    if (guestToken) {
      router.push("/checkout");
    } else if (isLogin) {
      // return "/checkout";
      router.push("/checkout");
    } else {
      router.push("/loginCheckoutPage");
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("guestToken");
    if (data) {
      setGuestToken(data);
    }
  }, []);

  const verfiyTheCoupon = async () => {
    setNavigating(true);
    // const guest_token = localStorage.getItem("guestToken");
    const data = await verfiyCoupon(allCart?.cart?.coupon_code || couponCode);
    if (data?.status == 200) {
      applyTheCoupon();
    } else if (data?.status == 404) {
      setNavigating(false);
      CustomToast(data?.error, "top-right");
    } else {
      setNavigating(false);

      CustomToast("Something went wrong", "top-right");
    }
    console.log("Verify coupoun", data);
  };

  const applyTheCoupon = async () => {
    setNavigating(true);

    const guest_token = localStorage.getItem("guestToken");
    const code = allCart?.cart?.coupon_code
      ? allCart?.cart?.coupon_code
      : couponCode;
    const data = await applyCoupon(code, guest_token);
    console.log("applyTheCoupon", data);
    if (data?.status == 200) {
      SuccessToast(data?.data?.message, "top-right");
      fetchCart();
    } else if (data?.status == 404) {
      setNavigating(false);
      CustomToast(data?.error, "top-right");
    } else if (data?.status == 400) {
      setNavigating(false);
      CustomToast(data?.error, "top-right");
    } else {
      setNavigating(false);

      CustomToast("Something went wrong", "top-right");
    }
    console.log("Verify coupoun", data);
  };

  console.log("allCart", allCart);

  return (
    <div className="container">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6">
            <div className="discount-section">
              <h4>Discount Codes</h4>
              <p>Enter your coupon code if you have one.</p>
              <div
                className="login-sec"
                style={{
                  padding: 0,
                  marginTop: 0,
                }}
              >
                <input
                  type="text"
                  style={{
                    height: "40px",
                  }}
                  onChange={(e) => {
                    console.log("Errr", e.target.value);
                    setCouponCode(e.target.value);
                  }}
                  className="w-100"
                ></input>
              </div>

              <button
                onClick={() => {
                  applyTheCoupon();
                }}
              >
                Apply Voucher
              </button>
            </div>
          </div>

          <div className="col-md-6">
            <div className="discount-section">
              <h4>Gift Cards</h4>
              <p>Enter your Gift card code if you have one.</p>

              <div
                className="login-sec"
                style={{
                  padding: 0,
                  marginTop: 0,
                }}
              >
                <input
                  type="text"
                  style={{
                    height: "40px",
                  }}
                  onChange={(e) => {
                    // console.log("Errr", e.target.value);
                    // setCouponCode(e.target.value);
                  }}
                  className="w-100"
                ></input>
              </div>

              <button>Apply Gift Card</button>
            </div>
          </div>
        </div>

        <div className="header-of-cart mt-0">
          <div className="row align-items-center">
            <div className="col-md-8"></div>

            <div className="col-md-4">
              <div className="text-right button-margin float-right mb-3">
                <button
                  className="btn btn-info text-white"
                  onClick={() => {
                    processCheck();
                  }}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftVoucher;
