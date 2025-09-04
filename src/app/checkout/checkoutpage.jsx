"use client";
import { getShippingRate } from "@/api/CartApi";
import { CustomToast } from "@/components/CustomToast";
import { CountryList } from "@/constant";
import { useNavigationStore } from "@/store/useNavigationstore";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useRef, useState } from "react";

const checkoutpage = () => {
  const [shipping, setShipping] = useState(false);
  const [checbox, setCheckbox] = useState(false);

  const router = useRouter();
  const [tokenAddress, setTokenAddress] = useState({});
  const searchParams = useSearchParams();
  const queryKey = Array.from(searchParams.keys())[0];

  const setNavigating = useNavigationStore((s) => s.setNavigating);
  const isNavigating = useNavigationStore((s) => s.isNavigating);
  const [filed, setFiled] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    addressOne: "",
    addressTwo: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    telePhone: "",
  });

  console.log("params", queryKey);

  const [error, setError] = useState({});

  const handleText = (name, value) => {
    setFiled((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const fieldRef = {
    firstName: useRef(null),
    lastName: useRef(null),
    company: useRef(null),
    email: useRef(null),
    addressOne: useRef(null),
    addressTwo: useRef(null),
    city: useRef(null),
    state: useRef(null),
    zipCode: useRef(null),
    country: useRef(null),
    telePhone: useRef(null),
  };
  const validation = () => {
    const newError = {};
    if (!filed?.firstName.trim()) {
      newError.firstName = "First name required*";
    } else if (!filed?.lastName?.trim()) {
      newError.lastName = "Last name required*";
    } else if (!filed?.company?.trim()) {
      newError.company = "Company name required*";
    } else if (!filed?.email?.trim()) {
      newError.email = "Email is required*";
    } else if (!filed?.addressOne?.trim()) {
      newError.addressOne = "Address is required*";
    } else if (!filed?.addressTwo?.trim()) {
      newError.addressTwo = "Address two is required*";
    } else if (!filed?.city?.trim()) {
      newError.city = "City is required*";
    } else if (!filed?.state?.trim()) {
      newError.state = "State is required*";
    } else if (!filed?.zipCode?.trim()) {
      newError.zipCode = "zip Code is required*";
    } else if (!filed?.country?.country?.trim()) {
      newError.country = "Country is required*";
    } else if (!filed?.telePhone?.trim()) {
      newError.telePhone = "TelePhone is required*";
    }
    setError(newError);
    console.log("Object.keys(newError)[0]", Object.keys(newError)[0], newError);
    if (Object.keys(newError).length > 0) {
      CustomToast("Please fill all required fields", "top-right");

      const firstErrorKey = Object.keys(newError)[0];
      fieldRef[firstErrorKey]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return false;
    } else {
      localStorage.setItem("billingaddress", JSON.stringify(filed));
      if (queryKey == "orderReview") {
        router.push(`/orderReview`);
        setNavigating(true);
      } else {
        router.push(`/shipping/?checkbox=${checbox}`);
        setNavigating(true);
      }
    }

    return true;
  };

  useEffect(() => {
    const data = localStorage.getItem("billingaddress");
    const token = localStorage.getItem("token");
    const parseData = JSON.parse(token);

    if (parseData && Object.keys(parseData)?.length > 0) {
      const countryList = CountryList?.find(
        (data) => data?.code == parseData?.address?.country
      );

      console.log("countryListCode", countryList);
      const data = {
        code: "DZ",
        country: "ALGERIA",
      };

      const streetParts =
        parseData?.address != null &&
        parseData?.address?.street.split(",").map((s) => s.trim());
      setTokenAddress(parseData);
      console.log("streetParts", streetParts);
      setFiled((prev) => ({
        ...prev,
        firstName: parseData?.first_name || "",
        lastName: parseData?.last_name || "",

        email: parseData?.email || "",
        addressOne: streetParts[0] || "",
        addressTwo: streetParts[0] || "",
        city: parseData?.address?.city || "",
        state: parseData?.address?.state || "",
        zipCode: parseData?.address?.postcode || "",
        country: countryList || "",
        telePhone: parseData?.address?.phone || " ",
      }));
    } else {
      const parseBilling = JSON.parse(data);
      setFiled(parseBilling);
    }
    console.log("tokentoken", parseData);
  }, []);

  console.log("Filled", filed);
  return (
    <>
      {/* <Header /> */}
      {/* <MegaMenu /> */}

      {shipping == false && (
        <div
          style={{
            background: "#f1f1f1",
          }}
        >
          <div className="header-product bg-white">
            <h1>Checkout: Enter Billing Details</h1>
          </div>

          <div className="container">
            <div className="login-signup">
              <div className="row">
                <div className="col-md-12">
                  <div className="login-sec  checkout-sec">
                    <h2>2. Billing Information</h2>
                    <p>
                      Fill in the fields below with your billing information:
                    </p>

                    <div className="col-md-12">
                      <input
                        type="text"
                        required
                        ref={fieldRef?.firstName}
                        onChange={(e) => {
                          handleText("firstName", e.target.value);
                        }}
                        placeholder="FIRST NAME*"
                        value={filed?.firstName ?? ""}
                      ></input>

                      <div className="required-text">{error.firstName}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        ref={fieldRef?.lastName}
                        onChange={(e) => {
                          handleText("lastName", e.target.value);
                        }}
                        placeholder="LAST NAME*"
                        value={filed?.lastName ?? ""}
                      ></input>

                      <div className="required-text">{error.lastName}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        ref={fieldRef?.company}
                        placeholder="COMPANY*"
                        onChange={(e) => {
                          handleText("company", e.target.value);
                        }}
                        value={filed?.company ?? ""}
                      ></input>

                      <div className="required-text">{error.company}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        placeholder="EMAIL*"
                        ref={fieldRef?.email}
                        onChange={(e) => {
                          handleText("email", e.target.value);
                        }}
                        value={filed?.email ?? ""}
                      ></input>

                      <div className="required-text">{error.email}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        ref={fieldRef?.addressOne}
                        placeholder="ADDRESS LINE 1*"
                        onChange={(e) => {
                          handleText("addressOne", e.target.value);
                        }}
                        value={filed?.addressOne ?? ""}
                      ></input>

                      <div className="required-text">{error.addressOne}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        ref={fieldRef?.addressTwo}
                        placeholder="ADDRESS LINE 2*"
                        onChange={(e) => {
                          handleText("addressTwo", e.target.value);
                        }}
                        value={filed?.addressTwo ?? ""}
                      ></input>

                      <div className="required-text">{error.addressTwo}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        placeholder="CITY*"
                        ref={fieldRef?.city}
                        onChange={(e) => {
                          handleText("city", e.target.value);
                        }}
                        value={filed?.city ?? ""}
                      ></input>

                      <div className="required-text">{error.city}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        ref={fieldRef?.state}
                        placeholder="STATE/PROVINCE*"
                        onChange={(e) => {
                          handleText("state", e.target.value);
                        }}
                        value={filed?.state ?? ""}
                      ></input>

                      <div className="required-text">{error.state}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="number"
                        placeholder="ZIP CODE*"
                        ref={fieldRef?.zipCode}
                        onChange={(e) => {
                          handleText("zipCode", e.target.value);
                        }}
                        value={filed?.zipCode ?? ""}
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
                          const code = e.target.value; // "AI"
                          const name =
                            e.target.selectedOptions[0].getAttribute(
                              "data-name"
                            );
                          handleText("country", { code, country: name });

                          // handleText("country", e.target.value);
                        }}
                        value={filed?.country?.code ?? ""}
                      >
                        <option value="">SELECT COUNTRY *</option>
                        {CountryList.map((country, index) => (
                          <option
                            key={index}
                            value={country.code}
                            data-name={country.country}
                          >
                            {country.country}
                          </option>
                        ))}
                      </select>
                      <div className="required-text">{error.country}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        ref={fieldRef?.telePhone}
                        type="number"
                        onChange={(e) => {
                          handleText("telePhone", e.target.value);
                        }}
                        placeholder="TELEPHONE*"
                        value={filed?.telePhone ?? ""}
                      ></input>

                      <div className="required-text">{error.telePhone}</div>
                    </div>

                    <div className="col-md-12">
                      <a>Fields Marked with (*) are Required.</a>
                    </div>

                    <div className="bottom-checkout">
                      <div className="row">
                        <div className="Terms_condition">
                          <input
                            onChange={(e) => {
                              setCheckbox(!checbox);
                            }}
                            type="checkbox"
                            name="checkoutType"
                            className="custom-checkbox"
                          />{" "}
                          <label className="label_checkbox">
                            &nbsp;Ship to this Address
                          </label>
                        </div>

                        <div className="col-md-6">
                          <div className="float-right">
                            {/* <Link
                              // href={"/shipping"}
                              href={"#"}
                              onClick={() => validation()}
                            > */}
                            <button
                              onClick={() => validation()}
                              className="btn-cart"
                            >
                              Continue
                            </button>
                            {/* </Link> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================== Ship details  */}

      {/* <Footer /> */}
    </>
  );
};

export default checkoutpage;
