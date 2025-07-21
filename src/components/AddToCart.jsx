"use client";
import { updateQuantity } from "@/api/CartApi";
import { useCartStore } from "@/store";
import React, { useEffect, useMemo, useState } from "react";
import { CustomToast, SuccessToast } from "./CustomToast";

const AddToCart = () => {
  const { cart, setInsurance, insurance } = useCartStore((state) => state);
  const [loading, setLoading] = useState(false);
  let totalPrice = 0;
  (totalPrice = useMemo(() =>
    cart.reduce((sum, item) => sum + parseFloat(item.total), 0)
  )),
    [];

  const updateCart = async () => {
    setLoading(true);
    const id = cart[0].id;
    const qty = cart[0].quantity;
    const response = await updateQuantity(id, qty);
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
    <div className="container my-5">
      <div className="col-md-12">
        <div className="row">
          {/* Left Side */}
          <div className="col-md-12">
            <div className="d-flex float-right mb-5 ">
              <button className="btn btn-shop btn-primary me-3">
                Countinue Shopping
              </button>
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
                    <td className="text-end">€{totalPrice}</td>
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
                      €{totalPrice + insurance}
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
                      €{totalPrice + insurance}
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
