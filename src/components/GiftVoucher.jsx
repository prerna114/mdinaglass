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
    const data = await verfiyCoupon(couponCode);
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
    const guest_token = localStorage.getItem("guestToken");

    const data = await applyCoupon(couponCode, guest_token);
    console.log("applyTheCoupon", data);
    if (data?.status == 200) {
      SuccessToast(data?.data?.message, "top-right");
      getCart();
    }
    console.log("Verify coupoun", data);
  };

  const getCart = async () => {
    const tokenData = localStorage.getItem("token");
    const parsed = tokenData ? JSON.parse(tokenData) : null;
    const accessToken = parsed?.token;
    console.log("accessToken", accessToken);
    if (accessToken && accessToken !== "undefined") {
      const data = await getCartListing();
      console.log("getCart Header123", data.data?.cart);

      if (data?.status == 200) {
        clearCart();
        // console.log("getCart Header", data.data);
        console.log("getCart Header ", data.data.items);
        setCartTotal(data?.data?.cart?.grand_total);
        setAllCart(data?.data);
        setDiscountAmount(data?.data?.cart?.discount_amount);

        // addToCart(data.result.items);
        data.data.items.forEach((item) => {
          addToCart(item);
        });
        setNavigating(false);
      } else {
        setNavigating(false);
      }
    } else {
      const tokenData = localStorage.getItem("guestToken");
      console.log("guestToken", tokenData);

      if (tokenData) {
        getGUesstCart();
      }
    }
  };

  const getGUesstCart = async () => {
    const tokenData = localStorage.getItem("guestToken");
    console.log("guestToken", tokenData);
    if (tokenData) {
      const response = await getCartGuest(tokenData);
      // console.log("getCartGuest", );
      if (response.status == 200) {
        setCartTotal(response?.data?.cart[0]?.grand_total);
        setAllCart(response?.data);

        setDiscountAmount(response?.data?.cart?.discount_amount);

        clearCart();
        response?.data?.cart[0]?.items?.forEach((item) => {
          addToCart(item);
        });
        setNavigating(false);
      } else {
        setNavigating(false);
      }
    }
  };
  return (
    <div className="container">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6">
            <div className="discount-section">
              <h4>Discount Codes</h4>
              <p>Enter your coupon code if you have one.</p>

              <input
                type="text"
                onChange={(e) => {
                  console.log("Errr", e.target.value);
                  setCouponCode(e.target.value);
                }}
                className="w-100"
              ></input>

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
              <p>Enter your coupon code if you have one.</p>

              <input type="text" className="w-100"></input>

              <button>Apply Voucher</button>
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
