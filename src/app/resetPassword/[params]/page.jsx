"use client";
import { forgotPassword, resetUserPassword } from "@/api/Customer";
import { CustomToast, SuccessToast } from "@/components/CustomToast";
import { emailRegex } from "@/constant";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const params = useParams();

  const [error, setError] = useState({});
  const [userDetails, setUserDetails] = useState({});

  const router = useRouter();
  const handleValue = (key, value) => {
    setUserDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const validation = () => {
    const newError = {};
    console.log("Validation");
    if (!userDetails?.email) {
      newError.email = "Email address is required";
    } else if (!userDetails?.password) {
      newError.password = "Password field is required";
    } else if (!userDetails?.confirmPassword) {
      newError.confirmPassword = "Confirm Password field is required";
    } else if (userDetails?.password != userDetails?.confirmPassword) {
      newError.password = "Password and Confirm password should be same";
    }
    if (Object.keys(newError)?.length > 0) {
      console.log("newError", newError);
      setError(newError);
      CustomToast("Please fill all required fields");
    } else {
      console.log("Validation else");

      resetPassword();
    }
    console.log("Validation", newError, error);
  };

  const resetPassword = async () => {
    const data = await resetUserPassword(userDetails, "token");
    console.log("Data", data);
    if (data?.status == 200) {
      SuccessToast("Password reset successfully");
    } else if (data?.status == 400) {
      CustomToast(`${data?.error}`, "top-right");
    } else if (data?.status == 422) {
      CustomToast(`${data?.errorData?.message}`, "top-right");
    } else {
    }
    console.log("EMail", data);
  };

  console.log("params", params);
  return (
    <div
      style={{
        background: "#f1f1f1",
      }}
    >
      <div className="header-product bg-white">
        <h1>Reset Password</h1>
      </div>
      <div className="container">
        <div>
          <div className="login-signup">
            <div className="row">
              <div className="col-md-12">
                <div className="login-sec">
                  <h2
                    style={{
                      fontSize: "30px",
                      marginBottom: "14px",
                    }}
                  >
                    RESET PASSWORD
                  </h2>

                  <div className="col-md-12">
                    <input
                      type="email"
                      placeholder="Enter your Email Address*"
                      onChange={(e) => handleValue("email", e.target.value)}
                      value={userDetails?.email}
                    ></input>
                    <div className="required-text">{error?.email}</div>
                  </div>

                  <div className="col-md-12">
                    <input
                      type="password"
                      placeholder="PASSWORD*"
                      autoComplete="new-password"
                      onChange={(e) => handleValue("password", e.target.value)}
                      value={userDetails?.password}
                    ></input>
                    <div className="required-text">{error?.password}</div>
                  </div>

                  <div className="col-md-12">
                    <input
                      type="password"
                      placeholder="CONFIRM PASSWORD*"
                      autoComplete="new-password"
                      onChange={(e) =>
                        handleValue("confirmPassword", e.target.value)
                      }
                      value={userDetails?.confirmPassword}
                    ></input>
                    <div className="required-text">
                      {error?.confirmPassword}
                    </div>
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
