"use client";

import { useCartStore } from "@/store";
import React, { useEffect, useMemo, useState } from "react";
import { CustomToast, SuccessToast } from "./CustomToast";
import { updateQuantityAPi } from "@/api/CartApi";

const AddToCart = () => {
  const { cart, setInsurance, insurance } = useCartStore((state) => state);

  const [loading, setLoading] = useState(false);
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

  const updateCart = async () => {
    setLoading(true);
    const id = cart[0].id;
    const qty = cart[0].quantity;
    const response = await updateQuantityAPi(cart);
    console.log("Update cart repsonse", response);
    if (response.status == 200) {
      SuccessToast(response.data?.message, "top-right");
      setLoading(false);
    } else {
      CustomToast("Something went wrong", "top-right");
      setLoading(false);
    }
  };

  useEffect(() => {
    setInsurance(15.0);
  }, []);

  return (
    <div className="container my-4">
      <div className="col-md-12">
        <div className="row">
          {/* Left Side */}
          <div className="col-md-12">
            <div className="d-flex float-right mb-5 ">
              <a href="/">
                <button className="btn btn-shop btn-primary me-3">
                  Countinue Shopping
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
              <select className="form-select mb-3">
                <option>Select Country</option>
                <option>France</option>
                <option>Germany</option>
                <option>India</option>
              </select>
              <div className="header-of-cart">
                <button className="btn btn-cart btn-info text-white mb-3">
                  Calculate Delivery Price
                </button>
              </div>

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
                      {isNaN(totalPrice)
                        ? getGrandTotal(cart).toFixed(2)
                        : totalPrice}
                    </td>
                  </tr>
                  <tr>
                    <td>Discount:</td>
                    <td className="text-end">€0.00</td>
                  </tr>
                  <tr>
                    <td>Shipping From:</td>
                    <td className="text-end">€0.00</td>
                  </tr>
                  <tr>
                    <td>Insurance:</td>
                    <td className="text-end">€{insurance}.00</td>
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
                      {isNaN(totalPrice)
                        ? Number(getGrandTotal(cart) + insurance).toFixed(2)
                        : totalPrice + insurance}
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
                      {isNaN(totalPrice)
                        ? Number(getGrandTotal(cart) + insurance).toFixed(2)
                        : totalPrice + insurance}
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
                      setInsurance(15.0);
                    } else {
                      setInsurance(0);
                    }
                  }}
                />
                <label className="form-check-label small">
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
