"use client";
import { forgotPassword } from "@/api/Customer";
import { CustomToast, SuccessToast } from "@/components/CustomToast";
import { emailRegex } from "@/constant";
import React, { useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validation = () => {
    if (!email) {
      setError("Email address is required");
    } else if (!emailRegex?.test(email)) {
      //   console.log("Email is not valid");
      setError("Enter Valid Email address");
    } else {
      forgotPasswordAPI();
    }
  };

  const forgotPasswordAPI = async () => {
    const data = await forgotPassword(email);
    if (data?.status == 200) {
      SuccessToast("Reset Link send successfully");
    } else if (data?.status == 404 || data?.status == 422) {
      CustomToast(`${data?.error}`, "top-right");
    } else {
      CustomToast("Something went wrong", "top-right");
    }
    console.log("EMail", data);
  };
  return (
    <div
      style={{
        background: "#f1f1f1",
      }}
    >
      <div className="header-product bg-white">
        <h1>Forgot Password</h1>
      </div>
      <div className="container">
        <div>
          <div className="login-signup">
            <div className="row">
              <div className="col-md-6">
                <div className="login-sec">
                  <h2
                    style={{
                      fontSize: "30px",
                      marginBottom: "14px",
                    }}
                  >
                    Forgot Password
                  </h2>

                  <div className="col-md-12">
                    <input
                      type="email"
                      placeholder="Enter your Email Address*"
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <div className="required-text">{error}</div>
                  </div>
                  <button
                    onClick={() => {
                      validation();
                    }}
                    className="btn btn-cart btn-info text-white"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
