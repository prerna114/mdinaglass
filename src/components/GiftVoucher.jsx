"use client";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const GiftVoucher = () => {
  const { isLogin } = useAuthStore((state) => state);
  const [guestToken, setGuestToken] = useState(null);

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

  return (
    <div className="container">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6">
            <div className="discount-section">
              <h4>Discount Codes</h4>
              <p>Enter your coupon code if you have one.</p>

              <input type="text" className="w-100"></input>

              <button>Apply Voucher</button>
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
