"use client";

import { useCartStore } from "@/store";
import React, { useEffect, useMemo, useState } from "react";
import { CustomToast, SuccessToast } from "./CustomToast";
import {
  getCartGuest,
  getCartListing,
  getInsuranceRate,
  getShippingRate,
  updateGuestCart,
  updateQuantityAPi,
} from "@/api/CartApi";
import { CountryList } from "@/constant";
import { useNavigationStore } from "@/store/useNavigationstore";
import { useShippingStore } from "@/store/shippingStore";
import { useAuthStore } from "@/store/useAuthStore";
import { removeCoupon, verfiyCoupon } from "@/api/productApi";
import { fetchCart } from "@/app/hooks/useCart";

const AddToCart = ({ localCart }) => {
  const {
    cart,
    addToCart,
    setInsurance,
    clearCart,
    insurance,
    cartTotal,
    setCartTotal,
    setAllCart,
    allCart,
  } = useCartStore((state) => state);
  const [cartWieght, setCartWeight] = useState();
  const [loading, setLoading] = useState(false);
  const [shippingRate, setShippingRate] = useState();
  const [countryCode, setCountryCode] = useState("");
  const setNavigating = useNavigationStore((s) => s.setNavigating);
  const isNavigating = useNavigationStore((s) => s.isNavigating);
  const [apiCall, setAPICall] = useState("0");

  const [userDetails, setUserDetails] = useState();
  // const setNavigating = useNavigationStore((s) => s.setNavigating);
  const { setShippingStore, shippingStore, setshiipingCost } = useShippingStore(
    (state) => state
  );
  const { setPaymentMethods, paymentMethods } = useAuthStore.getState(); //
  const [method, setMethod] = useState(paymentMethods);

  let totalPrice = 0;
  (totalPrice = useMemo(() =>
    cart.reduce((sum, item) => sum + parseFloat(item.total), 0)
  )),
    [];

  function getGrandTotal(cartItems) {
    let total = 0;

    for (const item of cartItems) {
      // Handle various price sources
      let rawPrice =
        item?.prices?.final?.price ??
        item?.price ??
        parseFloat(item?.min_price?.replace("$", "")) ??
        0;

      // Ensure price is a number
      const price =
        typeof rawPrice === "string" ? parseFloat(rawPrice) : rawPrice;

      // Handle various quantity keys
      const quantity = item?.quantity ?? item?.qty ?? 1;

      if (!isNaN(price) && !isNaN(quantity)) {
        total += price * quantity;
      }
    }

    console.log("Total", total);
    return total; // Return string like "58.00"
  }

  function getTotalWeight() {
    let total = 0;

    for (const item of cart) {
      // Handle various price sources

      total = Number(total) + Number(item?.product?.weight); // Assuming weight is a property of each item
    }

    console.log("Total gram", total);
    setCartWeight(total);
    // Return string like "58.00"
  }

  const updateCart = async () => {
    const tokenData = localStorage.getItem("token");
    const parsed = tokenData ? JSON.parse(tokenData) : null;
    const accessToken = parsed?.token;
    console.log("accessToken Updatecart", accessToken);
    setLoading(true);

    if (accessToken && accessToken !== "undefined") {
      const response = await updateQuantityAPi(localCart);
      console.log("Update cart repsonse", response);
      if (response.status == 200) {
        SuccessToast(response.data?.message, "top-right");
        setLoading(false);
        insrunaceRate();
        fetchCart();
      } else {
        CustomToast("Something went wrong", "top-right");
        setLoading(false);
      }
    } else {
      guestCartUpdate();
    }
  };

  const guestCartUpdate = async () => {
    const tokenData = localStorage.getItem("guestToken");
    console.log("guestCartUpdate", tokenData);
    if (tokenData && tokenData !== "undefined") {
      const response = await updateGuestCart(localCart);
      console.log("Update guest cart response", response);
      SuccessToast(response.data?.message, "top-right");
      insrunaceRate();
      fetchCart();
      setLoading(false);
    } else {
      CustomToast("Something went wrong", "top-right");
      setLoading(false);
    }
  };
  const shiipingRate = async (code) => {
    setNavigating(true);
    console.log("Cart Wiri", cartWieght);
    if (Number(cartWieght) && Number(cartWieght) > 0) {
      setNavigating(true);
      const data = await getShippingRate(cartWieght, code);
      if (data?.status == 200) {
        console.log("datadata", data?.data);
        if (data?.data?.Message == "An error has occurred.") {
          setAPICall((prev) => prev + 1);
          if (apiCall < 2) {
            shiipingRate(countryCode);
          }
        }
        if (data?.data) setShippingRate(data?.data);
        setShippingStore(data?.data);
        insrunaceRate();
        if (data?.data?.Messages?.length > 0) {
          console.log("Datadatadata", data?.data);
          CustomToast(data?.data?.Messages[0], "top-right");
        }
        setNavigating(false);
      } else {
        setNavigating(false);
      }
    }
    // console.log("Shipping Rate", data);
  };
  const insrunaceRate = async () => {
    setNavigating(true);
    if (Object.keys(shippingStore)?.length > 0 && shippingStore?.Value) {
      const totalCost =
        Number(Number(shippingStore?.Value?.[0]?.Price).toFixed(2)) +
        Number(Number(cartTotal)?.toFixed(2));
      setInsurance(Number(totalCost)?.toFixed(2));

      if (totalCost >= 600) {
        const percentcost = (Number(totalCost).toFixed(2) / 100) * 2.5;
        setInsurance(Number(percentcost).toFixed(2));
        setNavigating(false);

        console.log("percentcost", percentcost);
      } else {
        setInsurance(15);
        setNavigating(false);
      }

      const percentcost = (Number(totalCost).toFixed(2) / 100) * 2.5;
      console.log(
        "percentcost",
        Number(percentcost).toFixed(2),
        "frfr",
        totalCost
      );
      // console.log("Price issue", shippingStore?.Value?.[0]?.Price, cartTotal);
    } else {
      if (cartTotal >= 600) {
        const percentCost = (Number(cartTotal).toFixed(2) / 100) * 2.5;
        console.log("Percent COuntry not selected", percentCost);
        setInsurance(percentCost);
        setNavigating(false);
      } else {
        setInsurance(15);
        setNavigating(false);
      }
    }

    const percentCost = (Number(cartTotal).toFixed(2) / 100) * 2.5;
    console.log("Percent id", percentCost, cartTotal);
    // const response = await getInsuranceRate(getGrandTotal(cart).toFixed(2));
    // console.log("Insurance Rate Response", response);
    // if (response?.status == 200) {
    //   setInsurance(response?.data?.Rate);
    //   setNavigating(false);
    // } else {
    //   setNavigating(false);
    //   CustomToast("Something went wrong in insurance", "top-right");
    // }
  };

  const removeTheCoupon = async (code) => {
    const guest_token = localStorage.getItem("guestToken");

    const data = await removeCoupon(code, guest_token);
    console.log("applyTheCoupon", data);
    if (data?.status == 200) {
      SuccessToast(data?.data?.message, "top-right");
      // getCart();
      console.log("Fetch Cart add to cart");
      fetchCart();
    }
    console.log("Verify coupoun", data);
  };

  useEffect(() => {
    // setInsurance(15.0);
    getTotalWeight();
    insrunaceRate();
    const data = localStorage.getItem("token");
    const parseData = JSON.parse(data);
    if (parseData) {
      setUserDetails(parseData);
      if (parseData?.address?.country) {
        setCountryCode(parseData?.address?.country);
        console.log("parseData?.address?.country", parseData?.address?.country);
        if (cartWieght) {
          shiipingRate(parseData?.address?.country);
        }
      }
    }
  }, [cartWieght]);

  useEffect(() => {
    // setInsuranceCost(insurance);
    if (shiipingRate?.Value?.length >= 0) {
      setshiipingCost(shippingRate?.Value[0]?.Price);
    }
  }, [insurance, shippingRate]);

  // console.log("Cart Items", cart, shippingRate);
  // console.log("shippingStore", insurance);
  // console.log("userDetails", userDetails);
  // console.log("totalPrice", totalPrice);
  // console.log("isNavigating", isNavigating);

  const couponCode =
    allCart?.cart?.coupon_code ?? allCart?.cart?.[0]?.coupon_code;

  // console.log(
  //   "cartallcart",
  //   cartTotal,
  //   insurance,
  //   shippingStore?.value
  //   // allCart?.cart[0]?.coupon_code
  // );

  console.log("insurance", localCart);

  return (
    <div className="container my-4">
      <div className="col-md-12">
        <div className="row">
          {/* Left Side */}
          <div className="col-md-12">
            <div className="d-flex float-right mb-5 ">
              <a href="/">
                <button className="btn btn-shop btn-primary me-3">
                  Continue Shopping
                </button>
              </a>

              <button
                className="btn btn-cart btn-info text-white"
                onClick={() => {
                  updateCart();
                }}
              >
                {loading ? (
                  <div
                    className="spinner-border text-light"
                    role="status"
                  ></div>
                ) : (
                  <div>Update Shopping Cart</div>
                )}
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-4 shiiping-box border bg-white">
              <h4 className="mb-3" style={{ color: "#195E88" }}>
                Enter your delivery country to calculate shipping cost
              </h4>
              <select
                className="form-select mb-3"
                onChange={(e) => {
                  console.log("Selected Country", e.target.value);

                  setCountryCode(e.target.value);
                  shiipingRate(e.target.value);
                }}
                value={countryCode ?? ""}
              >
                <option>Select Country</option>
                {CountryList.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.country}
                  </option>
                ))}
              </select>
              {/* <div className="header-of-cart">
                <button
                  className="btn btn-cart btn-info text-white mb-3"
                  onClick={() => shiipingRate(countryCode)}
                >
                  Calculate Delivery Price
                </button>
              </div> */}

              <p className="small text-muted">
                Our shipping weight is made up of the item(s) you would like to
                order, plus the packaging to best ensure their safe passage and
                arrival. Whilst this means that the overall weight can increase
                by up to 2–3 kilos in some instances, the materials used for
                shipping are strong and robust. The last thing we want is for a
                unique piece, made with so much care and attention, to arrive
                damaged. If you are ordering from outside the EU you might be
                subject to duties or import taxes in your country once you
                receive the parcel.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-md-6">
            <div className="p-4 billing-table border bg-white">
              <table className="table mb-0">
                <tbody>
                  <tr>
                    <td>Subtotal:</td>
                    <td className="text-end">
                      €
                      {/* {isNaN(totalPrice)
                        ? getGrandTotal(cart).toFixed(2)
                        : totalPrice} */}
                      {Number(cartTotal)?.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Discount:{" "}
                      {couponCode && (
                        <div
                          className="btn btn-link text-danger p-0"
                          onClick={() => {
                            removeTheCoupon(allCart?.cart?.coupon_code);
                          }}
                        >
                          Remove coupon
                        </div>
                      )}
                    </td>
                    <td className="text-end">
                      €{" "}
                      {/* {allCart?.cart?.coupon_code &&
                        Number(allCart?.cart?.discount_amount).toFixed(2)}
                      {allCart?.cart[0]?.discount_amount &&
                        Number(allCart?.cart[0]?.discount_amount).toFixed(2)} */}
                      {allCart?.cart?.coupon_code
                        ? Number(allCart?.cart?.discount_amount)?.toFixed(2)
                        : "0.00"}
                    </td>
                  </tr>
                  <tr>
                    <td>Shipping Price:</td>
                    <td className="text-end">
                      €
                      {Object.keys(shippingStore)?.length > 0
                        ? shippingStore?.Price
                          ? shippingStore?.Price
                          : shippingStore?.Value?.[0]?.Price
                          ? Number(shippingStore.Value[0].Price).toFixed(2)
                          : "0.00"
                        : "0.00"}
                    </td>
                  </tr>
                  <tr>
                    <td>Insurance:</td>
                    <td className="text-end">€{insurance}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold" style={{ color: "#175E84" }}>
                      Grand Total Excl. Tax:
                    </td>
                    <td
                      className="text-end fw-bold"
                      style={{ color: "#175E84" }}
                    >
                      €
                      {Number(
                        Number(cartTotal) +
                          insurance +
                          (shippingStore?.Value?.length > 0
                            ? Number(shippingStore.Value[0].Price)
                            : 0)
                      ).toFixed(2)}
                      {/* €{totalPrice + insurance} */}
                    </td>
                  </tr>

                  <tr>
                    <td className="fw-bold" style={{ color: "#175E84" }}>
                      Grand Total Incl. Tax:
                    </td>
                    <td
                      className="text-end fw-bold"
                      style={{ color: "#175E84" }}
                    >
                      €
                      {Number(
                        Number(cartTotal) +
                          insurance +
                          (shippingStore?.Value?.length > 0
                            ? Number(shippingStore.Value[0].Price)
                            : 0)
                      ).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="form-check font-quicksand mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked
                  onChange={() => {
                    if (insurance == 0) {
                      insrunaceRate(getGrandTotal(cart).toFixed(2));
                    } else {
                      setInsurance(0);
                    }
                  }}
                />
                <label className="insurance form-check-label small">
                  <strong>
                    Untick this box if you do not require insurance for your
                    order.
                  </strong>
                  <br />
                  Need more info before deciding? <a href="#">Click here</a> to
                  learn more.
                </label>
              </div>

              <div className="alert alert-info mt-3 small">
                <span className="text-danger">❗</span> VAT is applicable on
                orders destined for EU countries and not charged for all non-EU
                countries. For non-EU countries, taxes and duties may apply at
                destination.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
