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

      <div className="container">
        <div
          className="row mt-3"
          style={{
            backgroundColor: "white",
            padding: 20,
          }}
        >
          {/* Billing Info Box 1 */}
          <div className="col-12 col-md-4">
            <div className=" p-3 mb-3 h-100">
              <div className="d-flex justify-content-between">
                <h5 className="billing-text">Billing Information</h5>
              </div>
              <p className="mb-1">Rohan Rohan</p>
              <p className="mb-1">dec5377@gmail.com</p>
              <p className="mb-1">B 64 A Vikas Vihar Kakrolla</p>
              <p className="mb-1">Address 2</p>
              <p className="mb-1">New Delhi, Delhi, 110078, India</p>
              <p className="mb-0">Tel: 07011391100</p>
              <a href="#" className="text-primary">
                Edit
              </a>
            </div>
          </div>

          {/* Billing Info Box 2 */}
          <div className="col-12 col-md-4">
            <div className="p-3 mb-3 h-100">
              <div className="d-flex justify-content-between">
                <h5>Billing Information</h5>
              </div>
              <p className="mb-1 fw-bold">Rohan Rohan</p>
              <p className="mb-1">dec5377@gmail.com</p>
              <p className="mb-1">B 64 A Vikas Vihar Kakrolla</p>
              <p className="mb-1">Address 2</p>
              <p className="mb-1">New Delhi, Delhi, 110078, India</p>
              <p className="mb-0">Tel: 07011391100</p>
              <a href="#" className="text-primary">
                Edit
              </a>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="p-3 mb-3 h-100">
              <div className="d-flex justify-content-between">
                <h5>Billing Information</h5>
              </div>
              <p className="mb-1 fw-bold">Rohan Rohan</p>
              <p className="mb-1">dec5377@gmail.com</p>
              <p className="mb-1">B 64 A Vikas Vihar Kakrolla</p>
              <p className="mb-1">Address 2</p>
              <p className="mb-1">New Delhi, Delhi, 110078, India</p>
              <p className="mb-0">Tel: 07011391100</p>
              <a href="#" className="text-primary">
                Edit
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
