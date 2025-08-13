"use client";
import { registerCustomer } from "@/api/Customer";
import { CustomToast, SuccessToast } from "@/components/CustomToast";
import { CountryList } from "@/constant";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useRef, useState } from "react";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    addressOne: "",
    addressTwo: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    telePhone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});
  const router = useRouter();

  const handleChanges = (key, value) => {
    setUserDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const fieldRef = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    addressOne: useRef(null),
    addressTwo: useRef(null),
    city: useRef(null),
    state: useRef(null),
    zipCode: useRef(null),
    country: useRef(null),
    telePhone: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
  };
  const validation = () => {
    const newError = {};
    if (!userDetails?.firstName.trim()) {
      newError.firstName = "First name required*";
    } else if (!userDetails?.lastName?.trim()) {
      newError.lastName = "Last name required*";
    } else if (!userDetails?.email?.trim()) {
      newError.email = "Email is required*";
    } else if (!userDetails?.addressOne?.trim()) {
      newError.addressOne = "Address is required*";
    } else if (!userDetails?.addressTwo?.trim()) {
      newError.addressTwo = "Address two is required*";
    } else if (!userDetails?.city?.trim()) {
      newError.city = "City is required*";
    } else if (!userDetails?.state?.trim()) {
      newError.state = "State is required*";
    } else if (!userDetails?.zipCode?.trim()) {
      newError.zipCode = "zip Code is required*";
    } else if (!userDetails?.country?.trim()) {
      newError.country = "Country is required*";
    } else if (!userDetails?.telePhone?.trim()) {
      newError.telePhone = "TelePhone is required*";
    } else if (!userDetails?.password?.trim()) {
      newError.password = "password is required*";
    } else if (!userDetails?.confirmPassword?.trim()) {
      newError.confirmPassword = "Confirm Password is required*";
    } else if (userDetails?.password != userDetails?.confirmPassword) {
      newError.confirmPassword = "Password and Confirm Passwword not equal*";
    }
    setError(newError);
    console.log("Object.keys(newError)[0]", Object.keys(newError)[0], newError);
    if (Object.keys(newError).length > 0) {
      CustomToast("Please fill all required fields", "top-right");

      const firstErrorKey = Object.keys(newError)[0];
      console.log("firstErrorKey", firstErrorKey);
      fieldRef[firstErrorKey]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return false;
    } else {
      registerTheUser();
      // localStorage.setItem("billingaddress", JSON.stringify(filed));
      // router.push(`/shipping/?checkbox=${checbox}`);
    }

    return true;
  };
  const registerTheUser = async () => {
    const data = await registerCustomer(userDetails);
    if (data.status == 200) {
      SuccessToast(data.data.message, "top-right");
      router.push("/loginCheckoutPage");
    } else {
      console.log("Error", data);
      if (data) {
        CustomToast(data, "top-right");
      }
    }
  };
  console.log("userDetails", userDetails);
  return (
    <div
      style={{
        background: "#f1f1f1",
      }}
    >
      <div className="header-product bg-white">
        <h1>Create an Account </h1>
      </div>

      {/* ========= Personal Details Section =========== */}
      <div className="container">
        <div className="login-signup">
          <div className="row">
            <div className="col-md-12">
              <div className="login-sec  checkout-sec">
                <h2>Personal Information</h2>
                {/* <p>Fill in the fields below with your billing information:</p> */}

                <div className="col-md-12">
                  <input
                    type="text"
                    placeholder="FIRST NAME*"
                    onChange={(e) => {
                      console.log("E", e.target.value);
                      handleChanges("firstName", e.target.value);
                    }}
                    ref={fieldRef?.firstName}
                  ></input>
                  <div className="required-text">{error.firstName}</div>
                </div>

                <div className="col-md-12">
                  <input
                    type="text"
                    placeholder="LAST NAME*"
                    onChange={(e) => {
                      console.log("E", e.target.value);
                      handleChanges("lastName", e.target.value);
                    }}
                    ref={fieldRef?.lastName}
                  ></input>
                  <div className="required-text">{error.lastName}</div>
                </div>

                <div className="col-md-12">
                  <input
                    type="text"
                    placeholder="EMAIL*"
                    onChange={(e) => {
                      console.log("E", e.target.value);
                      handleChanges("email", e.target.value);
                    }}
                    ref={fieldRef?.email}
                  ></input>
                  <div className="required-text">{error.email}</div>
                </div>

                <div className="col-md-12">
                  <input
                    type="text"
                    placeholder="CONTACT*"
                    onChange={(e) => {
                      console.log("E", e.target.value);
                      handleChanges("telePhone", e.target.value);
                    }}
                    ref={fieldRef?.telePhone}
                  ></input>
                  <div className="required-text">{error.telePhone}</div>
                </div>

                <div className="col-md-12">
                  <a>Fields Marked with (*) are Required.</a>
                </div>

                {/* <div className="bottom-checkout">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="shiping-radio">
                        <input type="checkbox" />
                        &nbsp;Ship to this Address
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="float-right">
                        <button className="btn-cart">Continue</button>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========= Billing Address Section =========== */}

      <div className="container">
        <div className="login-signup">
          <div className="row">
            <div className="col-md-12">
              <div className="login-sec  checkout-sec">
                <h2>Billing Information</h2>
                <p>Fill in the fields below with your billing information:</p>

                <div className="col-md-12">
                  <input
                    type="text"
                    placeholder="ADDRESS LINE 1*"
                    onChange={(e) => {
                      console.log("E", e.target.value);
                      handleChanges("addressOne", e.target.value);
                    }}
                    ref={fieldRef?.addressOne}
                  ></input>
                  <div className="required-text">{error.addressOne}</div>
                </div>

                <div className="col-md-12">
                  <input
                    type="text"
                    placeholder="ADDRESS LINE 2*"
                    onChange={(e) => {
                      console.log("E", e.target.value);
                      handleChanges("addressTwo", e.target.value);
                    }}
                    ref={fieldRef?.addressTwo}
                  ></input>
                  <div className="required-text">{error.addressTwo}</div>
                </div>

                <div className="col-md-12">
                  <input
                    type="text"
                    placeholder="CITY*"
                    onChange={(e) => {
                      console.log("E", e.target.value);
                      handleChanges("city", e.target.value);
                    }}
                    ref={fieldRef?.city}
                  ></input>
                  <div className="required-text">{error.city}</div>
                </div>

                <div className="col-md-12">
                  <input
                    type="text"
                    placeholder="STATE/PROVINCE*"
                    onChange={(e) => {
                      console.log("E", e.target.value);
                      handleChanges("state", e.target.value);
                    }}
                    ref={fieldRef?.state}
                  ></input>
                  <div className="required-text">{error.state}</div>
                </div>

                <div className="col-md-12">
                  <input
                    type="text"
                    placeholder="ZIP CODE*"
                    onChange={(e) => {
                      console.log("E", e.target.value);
                      handleChanges("zipCode", e.target.value);
                    }}
                    ref={fieldRef?.zipCode}
                  ></input>
                  <div className="required-text">{error.zipCode}</div>
                </div>

                <div className="col-md-12">
                  <select
                    required=""
                    className="required"
                    name="country"
                    id="country"
                    ref={fieldRef?.country}
                    onChange={(e) => {
                      handleChanges("country", e.target.value);
                    }}
                  >
                    <option value="">SELECT COUNTRY *</option>
                    {CountryList.map((country, index) => (
                      <option key={index} value={country.code}>
                        {country.country}
                      </option>
                    ))}
                  </select>
                  <div className="required-text">{error.country}</div>
                </div>

                <div className="col-md-12">
                  <a>Fields Marked with (*) are Required.</a>
                </div>

                <div className="bottom-checkout">
                  <div
                    className="row"
                    style={{
                      marginLeft: 5,
                    }}
                  >
                    <div className="col-md-6">
                      <div className="shiping-radio row">
                        <input type="checkbox" />
                        &nbsp; Sign up to our Newsletter
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========= Login Details Section =========== */}
      <div className="container">
        <div className="login-signup">
          <div className="row">
            <div className="col-md-12">
              <div className="login-sec  checkout-sec">
                <h2>Login Information</h2>
                {/* <p>Fill in the fields below with your billing information:</p> */}

                <div className="col-md-12">
                  <input
                    type="password"
                    required
                    placeholder="PASSWORD*"
                    ref={fieldRef?.password}
                    onChange={(e) => {
                      handleChanges("password", e.target.value);
                    }}
                  ></input>
                  <div className="required-text">{error.password}</div>
                </div>

                <div className="col-md-12">
                  <input
                    type="password"
                    required
                    placeholder="CONFIRM PASSWORD*"
                    ref={fieldRef?.confirmPassword}
                    onChange={(e) => {
                      handleChanges("confirmPassword", e.target.value);
                    }}
                  ></input>
                  <div className="required-text">{error.confirmPassword}</div>
                </div>

                <div className="col-md-12">
                  <a>Fields Marked with (*) are Required.</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="Terms_condition">
          <input
            type="checkbox"
            name="checkoutType"
            className="custom-checkbox"
          />{" "}
          <label className="label_checkbox">
            I accept the <Link href={"#"}>Terms and Conditions</Link> of
            mdinaglass.com.mt
          </label>
        </div>
        <div className="col-md-12">
          <div className="d-flex  pb-3 ">
            <Link href={"#"}>
              <button className="btn btn-shop btn-primary me-3">Back</button>
            </Link>

            <a
              // href={"#"}
              onClick={() => {
                validation();
              }}
            >
              <button className="btn btn-cart btn-info text-white">
                Submit
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
