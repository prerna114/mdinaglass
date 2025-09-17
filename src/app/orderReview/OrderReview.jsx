"use client";

import { checkOut, guestcheckOut } from "@/api/CartApi";
import { CustomToast, SuccessToast } from "@/components/CustomToast";
import TrustPaymentForm from "@/components/TrustPaymentForm";
import ModalPayment from "@/components/ModalPayment";

import { useCartStore } from "@/store";
import { useShippingStore } from "@/store/shippingStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigationStore } from "@/store/useNavigationstore";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useMemo, useState } from "react";

const OrderReview = () => {
  const searchParams = useSearchParams();
  console.log("searchParams", searchParams.get("method"));
  const giftMessage = useAuthStore((state) => state.giftMessage);
  const { setPaymentMethods, paymentMethods } = useAuthStore.getState(); //
  const [loader, setLoader] = useState(false);
  const [parsedParams, setParsedParams] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);
  const setNavigating = useNavigationStore((s) => s.setNavigating);
  const setShowModal = useNavigationStore((s) => s.setShowModal);

  const [voucherInCart, setVoucherInCart] = useState();

  const [modalTrue, setModalTrue] = useState(false);

  useEffect(() => {
    if (!searchParams) return;
    setModalTrue(true);

    // Convert query params → object
    const data = {};
    searchParams.forEach((value, key) => {
      data[key] = value;
    });

    // ✅ Only continue if Trust Payments returned something
    if (!("errorcode" in data || "requestreference" in data || "jwt" in data)) {
      setModalTrue(false);

      return; // exit early, normal page load
    }

    // If JWT is present, decode it
    if (data.jwt) {
      setShowModal(true);
      try {
        const base64Url = data.jwt.split(".")[1]; // JWT payload part
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = JSON.parse(
          decodeURIComponent(
            atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          )
        );
        data.jwtDecoded = jsonPayload;
      } catch (e) {
        console.error("JWT decode error:", e);
      }
    }

    setParsedParams(data);
    localStorage.setItem("trust-payment", JSON.stringify(data));

    // ✅ Only fire alerts if Trust Payments response present
    if (data?.errorcode == "0") {
      // alert(data?.errormessage || "Payment Success");
      SuccessToast("Payment Success", "top-center");
      PaymentSuccess();
    } else if (data?.errorcode == "30000") {
      setShowModal(false);
      CustomToast("Please Enter valid details", "top-center");
    } else if (data?.errorcode == "70000") {
      setShowModal(false);

      CustomToast("Payment was declined by your bank.", "top-center");
    } else if (data?.errorcode) {
      setShowModal(false);

      CustomToast(`Payment Failed ${data?.errormessage}`, "top-center");
    }
  }, [searchParams]);

  console.log("parsedParams", parsedParams);
  const {
    setShippingStore,
    shippingStore,
    setShippingMethod,
    shiipingCost,
    shippingMethod,
  } = useShippingStore((state) => state);

  const [billingAddress, setBillingAddress] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});
  const [voucherDetails, setVoucherDetails] = useState({});

  const [method, setMethod] = useState(paymentMethods);

  const router = useRouter();
  const {
    cart,
    setInsurance,
    removeFromCart,
    clearCart,
    insurance,
    cartTotal,
    allCart,
  } = useCartStore((state) => state);
  const subtotal = (price, qty) => {
    console.log("Price ", price, qty);
    return (price * qty).toFixed(2);
  };

  useEffect(() => {
    const bill = localStorage.getItem("billingaddress");
    const ship = localStorage.getItem("shiipingaddreess");
    const voucher = localStorage.getItem("voucherDetails");

    const parseBill = JSON.parse(bill);
    const parseShip = JSON.parse(ship);
    const parsevoucher = JSON.parse(voucher);
    // console.log("parse", parse.firstName);
    setBillingAddress(parseBill);
    setShippingAddress(parseShip);
    setVoucherDetails(parsevoucher);
  }, []);

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

  const PaymentSuccess = async () => {
    setModalMessage("Please wait while we are confirming your order");
    setNavigating(true);
    setLoader(true);
    const tokenData = localStorage.getItem("token");
    const parsed = tokenData ? JSON.parse(tokenData) : null;
    const accessToken = parsed?.token;
    console.log(
      "DSs",
      GrandTotal,
      insurance,
      shiipingCost,
      shippingMethod?.ServiceDescription
    );
    if (accessToken) {
      const parseData = localStorage.getItem("trust-payment");
      const transactionId = JSON.parse(parseData);
      const response = await checkOut(
        insurance,
        shippingMethod?.Price,
        shippingMethod?.ServiceDescription,
        method,
        transactionId?.transactionreference,
        giftMessage
      );
      console.log("Response", response);

      if (response.status == 200) {
        SuccessToast(response.data.message, "top-right");
        setLoader(false);
        router.replace("/");
        // window.location.replace("/");
        localStorage.removeItem("shipping-store");
        localStorage.removeItem("trust-payment");
        localStorage.removeItem("is_voucher");

        setNavigating(false);
        setShowModal(false);
        clearCart();
        localStorage.removeItem("the-cart-storage");
      } else {
        setNavigating(false);
        setShowModal(false);

        setLoader(false);

        CustomToast("Something went wrong", "top-right");
      }
    } else {
      setLoader(true);
      const guestToken = localStorage.getItem("guestToken");

      if (guestToken) {
        guestCheckoutAPI(guestToken);
      }
      // SuccessToast("Order Placed Successfully", "top-right");
      // router.push("/");

      // clearCart();
    }
  };

  const guestCheckoutAPI = async (guestToken) => {
    setNavigating(true);
    console.log("parsedParams transaction", parsedParams?.transactionreference);
    const price = getGrandTotal(cart) + insurance + shippingMethod?.Price;
    const parseData = localStorage.getItem("trust-payment");
    const transactionId = JSON.parse(parseData);
    console.log("Guestcheckout");
    const data = await guestcheckOut(
      guestToken,
      shippingMethod?.Price,
      shippingMethod?.ServiceDescription,
      insurance,
      method,
      transactionId?.transactionreference,
      giftMessage
    );
    console.log("Guest checkut", data);
    if (data?.status == 200) {
      SuccessToast(data.data.message, "top-right");
      localStorage.removeItem("is_voucher");

      setLoader(false);
      setShowModal(false);
      localStorage.removeItem("shipping-store");
      localStorage.removeItem("trust-payment");
      localStorage.removeItem("the-cart-storage");

      router.replace("/");
      // window.location.replace("/");

      clearCart();
      setNavigating(false);
    } else {
      CustomToast("Something Went Wrong", "top-right");
      setNavigating(false);
      setShowModal(false);

      setLoader(false);
    }
  };

  const insrunaceRate = async () => {
    setNavigating(true);
    if (shippingMethod && typeof shippingMethod === "object") {
      const totalCost =
        Number(Number(shippingMethod.Price).toFixed(2)) +
        Number(Number(cartTotal)?.toFixed(2));
      setInsurance(Number(totalCost)?.toFixed(2));

      if (totalCost >= 600) {
        const percentcost = (Number(totalCost).toFixed(2) / 100) * 2.5;
        setInsurance(Number(percentcost).toFixed(2));
        setNavigating(false);

        // console.log("percentcost", percentcost);
      } else {
        setInsurance(15);
        setNavigating(false);
      }

      const percentcost = (Number(totalCost).toFixed(2) / 100) * 2.5;
      // console.log(
      //   "percentcost",
      //   Number(percentcost).toFixed(2),
      //   "frfr",
      //   totalCost
      // );
      // console.log("Price issue", shippingStore?.Value?.[0]?.Price, cartTotal);
    }
  };
  console.log("method", shippingMethod?.Price);

  // const GrandTotal =
  //   Number(Number(getGrandTotal(cart)).toFixed(2)) +
  //   Number(Number(insurance).toFixed(2)) +
  //   Number(Number(shippingMethod?.Price).toFixed(2));

  const GrandTotal =
    Number(Number(cartTotal).toFixed(2)) +
    Number(Number(insurance).toFixed(2)) +
    (voucherInCart != 1 &&
    shippingMethod != undefined &&
    Object.keys(shippingMethod).length > 0
      ? Number(Number(shippingMethod?.Price).toFixed(2))
      : 0);

  useEffect(() => {
    // insrunaceRate();
    const data = localStorage.getItem("is_voucher");
    if (data == 1) {
      setShippingMethod({});
    }
    setVoucherInCart(data);
  }, []);
  console.log("total", Number(Number(cartTotal).toFixed(2)), insurance);
  console.log("billingAddress", method);

  return (
    <div
      style={{
        background: "#f1f1f1",
      }}
    >
      <ModalPayment message={modalMessage} />

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

      {billingAddress != null && (
        <div className="container">
          <div
            className="login-signup"
            style={{
              // width: "50%",
              // margin: "0 90px",
              marginBottom: "30px",
              padding: "11px",
            }}
          >
            <div
              className="row mt-3"
              style={{
                backgroundColor: "white",
                padding: 20,
              }}
            >
              {/* Billing Info Box 1 */}
              <div className="col-12 col-md-4">
                {billingAddress && (
                  <div className="p-3 mb-3 h-100">
                    <div className="d-flex justify-content-between">
                      <h5 className="billing-text">Billing Information</h5>
                    </div>
                    <p className="mb-1 billing-text-name ">
                      {billingAddress?.firstName}
                    </p>
                    <p className="mb-1 billing-text-name ">
                      {billingAddress?.email}
                    </p>
                    <p className="mb-1 billing-text-name ">
                      {billingAddress?.addressOne}
                    </p>
                    <p className="mb-1 billing-text-name ">
                      {billingAddress?.addressTwo}
                    </p>
                    <p className="mb-1 billing-text-name ">
                      {billingAddress.city}, {billingAddress?.state},{" "}
                      {billingAddress?.zipCode},{" "}
                      {billingAddress?.country?.country}
                    </p>
                    <p className="mb-0 billing-text-name ">
                      Tel: {billingAddress?.telePhone}
                    </p>
                    <Link href="/checkout?orderReview" className="text-primary">
                      Edit
                    </Link>
                  </div>
                )}
              </div>

              {/* Billing Info Box 2 */}
              <div className="col-12 col-md-4">
                <div className="p-3 mb-3 h-100">
                  <div className="d-flex justify-content-between">
                    <h5 className="billing-text">Shipping Information</h5>
                  </div>
                  <p className="mb-1 billing-text-name ">
                    {shippingAddress?.firstName}
                  </p>
                  <p className="mb-1 billing-text-name ">
                    {shippingAddress?.email}
                  </p>
                  <p className="mb-1 billing-text-name ">
                    {shippingAddress?.addressOne}
                  </p>
                  <p className="mb-1 billing-text-name ">
                    {shippingAddress?.addressTwo}
                  </p>
                  <p className="mb-1 billing-text-name ">
                    {shippingAddress.city}, {shippingAddress?.state},{" "}
                    {shippingAddress?.zipCode},{" "}
                    {shippingAddress?.country?.country}
                  </p>
                  <p className="mb-0 billing-text-name ">
                    Tel: {shippingAddress?.telePhone}
                  </p>
                  <Link href="/shipping?orderReview" className="text-primary">
                    Edit
                  </Link>
                </div>
              </div>

              {
                <div className="col-12 col-md-4">
                  <div className="p-3 mb-3 h-100">
                    {shippingMethod != null &&
                      Object.keys(shippingMethod)?.length > 0 && (
                        <div>
                          <div className="d-flex justify-content-between">
                            <h5 className="billing-text">Shipping Method:</h5>
                          </div>
                          <p className="mb-1 billing-text-name ">
                            {shippingMethod?.ServiceDescription}
                          </p>
                          <Link
                            href="/shippingMethod?orderReview"
                            className="text-primary"
                          >
                            Edit
                          </Link>
                        </div>
                      )}

                    <div>
                      <div className="d-flex justify-content-between">
                        <h5 className="billing-text mt-2">Payment Method:</h5>
                      </div>
                      <p className="mb-1 billing-text-name ">{method}</p>
                      <Link
                        href={"/payment?orderReview"}
                        className="text-primary"
                      >
                        Edit
                      </Link>
                    </div>

                    {giftMessage?.length > 0 && (
                      <div>
                        <div className="d-flex justify-content-between">
                          <h5 className="billing-text mt-2">Gift Message::</h5>
                        </div>
                        <p className="mb-1 billing-text-name ">{giftMessage}</p>
                      </div>
                    )}
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      )}

      {voucherDetails != null && billingAddress == null && (
        <div className="container">
          <div
            className="login-signup"
            style={{
              // width: "50%",
              // margin: "0 90px",
              marginBottom: "30px",
              padding: "11px",
            }}
          >
            <div
              className="row mt-3"
              style={{
                backgroundColor: "white",
                padding: 20,
              }}
            >
              {/* Billing Info Box 1 */}
              <div className="col-12 col-md-4">
                <div className="p-3 mb-3 h-100">
                  <div className="d-flex justify-content-between">
                    <h5 className="billing-text">Billing Information</h5>
                  </div>
                  <p className="mb-1 billing-text-name ">
                    {voucherDetails?.fromName}
                  </p>
                  <p className="mb-1 billing-text-name ">
                    {voucherDetails?.fromEmail}
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="p-3 mb-3 h-100">
                  <div className="d-flex justify-content-between">
                    <h5 className="billing-text">Shipping Information</h5>
                  </div>
                  <p className="mb-1 billing-text-name ">
                    {voucherDetails?.toName}
                  </p>
                  <p className="mb-1 billing-text-name ">
                    {voucherDetails?.toEmail}
                  </p>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="p-3 mb-3 h-100">
                  <div className="d-flex justify-content-between">
                    <h5 className="billing-text mt-2">Payment Method:</h5>
                  </div>
                  <p className="mb-1 billing-text-name ">
                    {/* Card Payment (Using Trust Payments 3D Secure Hosted
                    Checkout) */}
                    {method}
                  </p>
                  <Link href={"/payment?orderReview"} className="text-primary">
                    Edit
                  </Link>
                </div>
              </div>

              {/* Billing Info Box 2 */}

              {shippingAddress != null && (
                <div className="col-12 col-md-4">
                  <div className="p-3 mb-3 h-100">
                    <div className="d-flex justify-content-between">
                      <h5 className="billing-text">Shipping Information</h5>
                    </div>
                    <p className="mb-1 billing-text-name ">
                      {shippingAddress?.firstName}
                    </p>
                    <p className="mb-1 billing-text-name ">
                      {shippingAddress?.email}
                    </p>
                    <p className="mb-1 billing-text-name ">
                      {shippingAddress?.addressOne}
                    </p>
                    <p className="mb-1 billing-text-name ">
                      {shippingAddress?.addressTwo}
                    </p>
                    <p className="mb-1 billing-text-name ">
                      {shippingAddress.city}, {shippingAddress?.state},{" "}
                      {shippingAddress?.zipCode},{" "}
                      {shippingAddress?.country?.country}
                    </p>
                    <p className="mb-0 billing-text-name ">
                      Tel: {shippingAddress?.telePhone}
                    </p>
                    <Link href="/shipping?orderReview" className="text-primary">
                      Edit
                    </Link>
                  </div>
                </div>
              )}

              {Object.keys(shippingMethod)?.length > 0 && (
                <div className="col-12 col-md-4">
                  <div className="p-3 mb-3 h-100">
                    <div className="d-flex justify-content-between">
                      <h5 className="billing-text">Shipping Method:</h5>
                    </div>
                    <p className="mb-1 billing-text-name ">
                      {shippingMethod?.ServiceDescription}
                    </p>
                    <Link
                      href="/shippingMethod?orderReview"
                      className="text-primary"
                    >
                      Edit
                    </Link>
                    <div>
                      <div className="d-flex justify-content-between">
                        <h5 className="billing-text mt-2">Payment Method:</h5>
                      </div>
                      <p className="mb-1 billing-text-name ">
                        {/* Card Payment (Using Trust Payments 3D Secure Hosted
                    Checkout) */}
                        {method}
                      </p>
                      <Link
                        href={"/payment?orderReview"}
                        className="text-primary"
                      >
                        Edit
                      </Link>
                    </div>

                    {giftMessage?.length > 0 && (
                      <div>
                        <div className="d-flex justify-content-between">
                          <h5 className="billing-text mt-2">Gift Message::</h5>
                        </div>
                        <p className="mb-1 billing-text-name ">{giftMessage}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {cart?.length != 0 && (
        <div
          className="cart-page-main mt-3"
          style={{
            background: "#f1f1f1",
          }}
        >
          <div className="container">
            <div className="login-signup">
              <div className="table-responsive-sm">
                <table className="table cart-table table-order table-bordered">
                  <thead className="thead-dark">
                    <tr className="tr-bg">
                      <th>PRODUCT NAME</th>
                      <th>PRICE</th>
                      <th>QTY</th>
                      <th>TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.map((item) => {
                      console.log("The item", item);
                      return (
                        <tr key={item.id}>
                          {/* <td>
                          <img src={item.image} alt={item.name} width="80" />
                        </td> */}
                          <td>{item.name}</td>
                          <td>
                            €
                            {
                              item.price && Number(item?.price)?.toFixed(2)
                              // : item.min_price.replace(/[^0-9.]/g, "")
                            }
                          </td>
                          <td>
                            <input
                              disabled
                              type="number"
                              value={item.quantity ? item.quantity : item.qty}
                              min="1"
                              className="form-control bg-white"
                              style={{ width: "70px" }}
                              onChange={(e) =>
                                updateQuantity(
                                  item.id,
                                  parseInt(e.target.value)
                                )
                              }
                            />
                          </td>
                          <td>
                            €
                            {subtotal(
                              item.price,
                              item.quantity ? item.quantity : item.qty
                            )}
                            {/* {Number(cartTotal).toFixed(2)} */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <thead>
                    <tr key="2">
                      <td></td>
                      <td></td>

                      {/* <td> */}
                      {/* <h1>mkmk</h1> */}
                      {/* <img src={item.image} alt={item.name} width="80" /> */}
                      {/* </td> */}
                      <td
                        style={{
                          marginLeft: 10,
                        }}
                      >
                        Sub total
                      </td>

                      <td>€{Number(cartTotal)?.toFixed(2)}</td>
                    </tr>
                    <tr key="3">
                      <td></td>
                      <td></td>

                      {/* <td> */}
                      {/* <h1>mkmk</h1> */}
                      {/* <img src={item.image} alt={item.name} width="80" /> */}
                      {/* </td> */}
                      <td
                        style={{
                          marginLeft: 10,
                        }}
                      >
                        Discount
                      </td>

                      <td>
                        €
                        {allCart?.cart[0]
                          ? Number(allCart?.cart[0].discount_amount).toFixed(2)
                          : Number(allCart?.cart?.discount_amount).toFixed(2)}
                      </td>
                    </tr>
                    <tr key="4">
                      <td></td>
                      <td></td>

                      {/* <td> */}
                      {/* <h1>mkmk</h1> */}
                      {/* <img src={item.image} alt={item.name} width="80" /> */}
                      {/* </td> */}
                      <td
                        style={{
                          marginLeft: 10,
                        }}
                      >
                        Insurance
                      </td>

                      <td>€{insurance}</td>
                    </tr>

                    <tr key="5">
                      <td></td>
                      <td></td>

                      <td
                        style={{
                          marginLeft: 10,
                        }}
                      >
                        Shipping & Handling
                        {voucherInCart == 1 && " (Delivered via email)"}
                      </td>

                      <td>
                        €
                        {shippingMethod && typeof shippingMethod === "object"
                          ? shippingMethod.Price ?? 0.0 // show Price if exists, else empty
                          : shippingMethod}
                      </td>
                    </tr>

                    <tr key="6">
                      <td></td>
                      <td></td>
                      {/* <td>
                          <img src={item.image} alt={item.name} width="80" />
                        </td> */}
                      <td
                        style={{
                          marginLeft: 10,
                        }}
                      >
                        Grand Total
                      </td>

                      <td>€{Number(GrandTotal).toFixed(2)}</td>
                      {/* <td>€{GrandTotal}</td> */}
                    </tr>
                  </thead>
                </table>
              </div>

              <div
                className=""
                style={{
                  margin: "0 !important",
                  width: "100%",
                }}
              >
                <div
                  className="d-flex pb-3 mt-3"
                  style={{ justifyContent: "space-between" }}
                >
                  <div>
                    <Link href={"/payment"}>
                      <button className="btn btn-shop btn-primary back-button">
                        Back
                      </button>
                    </Link>
                    <Link href={"/cartpage"}>
                      <button className="btn btn-shop btn-primary back-button ms-3">
                        Edit
                      </button>
                    </Link>
                  </div>

                  {/* ======== Proceed to Checkout Payment Button ========= */}
                  {/* <button className="btn btn-cart btn-info text-white back-button">
                    {loader ? (
                      <div
                        className="spinner-border text-white"
                        role="status"
                      ></div>
                    ) : (
                      <div
                        // href={`/orderReview?method=${method}`}
                        onClick={() => {
                          PaymentSuccess();
                          // router.replace("/");
                          // window.history.pushState(
                          //   null,
                          //   "",
                          //   window.location.href
                          // );

                          // // Then redirect
                          // window.location.assign("/");

                          // setLoader(true);
                        }}
                      >
                        Proceed to Payment
                      </div>
                    )}
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <TrustPaymentForm />
      {/* <button className="btn btn-cart btn-info text-white back-button">
        {loader ? (
          <div className="spinner-border text-white" role="status"></div>
        ) : (
          <div
            onClick={() => {
              // PaymentSuccess();
              router.replace("/");
            }}
          >
            Proceed to Payment
          </div>
        )}
      </button> */}
    </div>
  );
};

export default OrderReview;
