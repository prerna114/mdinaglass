"use client";
import { CountryList } from "@/constant";
import Link from "next/link";
import React, { useRef, useState } from "react";

function editUser() {
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
  return (
    <div className="container">
      <div className="login-signup">
        <div className="row">
          <div className="col-md-12">
            <div
              className="login-sec  checkout-sec"
              style={{
                marginTop: "0px",
              }}
            >
              <h2 className="mb-3">Edit Profile</h2>

              <div className="col-md-12">
                <input type="text" placeholder="blackbull445" disabled></input>
              </div>

              <div className="col-md-12">
                <input type="text" placeholder="EMAIL*"></input>
              </div>

              <div className="col-md-12">
                <input type="password" placeholder="PASSWORD*"></input>
              </div>

              <div className="col-md-12">
                <input type="password" placeholder="CONFRIM PASSWORD*"></input>
              </div>
            </div>
            <div
              className="login-sec  checkout-sec"
              style={{
                marginTop: 0,
                paddingTop: 0,
              }}
            >
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
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-of-cart mt-2">
          <Link href="/">
            <button className="btn btn-info text-white">Submit</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default editUser;
