"use client";
import { getShippingRate } from "@/api/CartApi";
import { CustomToast } from "@/components/CustomToast";
import { CountryList } from "@/constant";
import { useCartStore } from "@/store";
import { useShippingStore } from "@/store/shippingStore";
import { useNavigationStore } from "@/store/useNavigationstore";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useRef, useState } from "react";

const Shipping = () => {
  const [shipping, setShipping] = useState(false);
  const [cartWieght, setCartWeight] = useState();
  const { cart, insurance } = useCartStore((state) => state);
  const [shippingRate, setShippingRate] = useState();

  const router = useRouter();
  const params = useSearchParams();
  const checkboxProps = params.get("checkbox");
  const [checkbox, setCheckbox] = useState(false);
  const setNavigating = useNavigationStore((s) => s.setNavigating);
  const { setShippingStore } = useShippingStore((state) => state);
  const searchParams = useSearchParams();
  const queryKey = Array.from(searchParams.keys())[0];
  const [apiCall, setAPICall] = useState("0");

  // console.log("EMai", email, params);

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
    countryName: "",
  });
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
      localStorage.setItem("shiipingaddreess", JSON.stringify(filed));
      if (queryKey == "orderReview") {
        router.push(`/orderReview`);
        setNavigating(true);
      } else {
        router.push("/shippingMethod");
        setNavigating(true);
      }
    }

    return true;
  };

  function getTotalWeight() {
    let total = 0;

    for (const item of cart) {
      // Prefer cart-level total_weight, fallback to product weight
      const weight =
        item?.total_weight || item?.weight || item?.product?.weight || 0;
      total += Number(weight);
    }

    console.log("Total gram", total, cart);
    setCartWeight(total);
    return total;
  }
  const shiipingRate = async (code) => {
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
        setNavigating(false);
      } else {
        setNavigating(false);
      }
    }
    // console.log("Shipping Rate", data);
  };
  console.log("checkboxProps", checkboxProps);
  useEffect(() => {
    setNavigating(false);
    if (checkboxProps == true) {
      const billingData = localStorage.getItem("billingaddress");
      console.log(
        "Billing addr12check",
        JSON.parse(billingData),
        checkboxProps
      );
      if (billingData) {
        const parseData = JSON.parse(billingData);
        setFiled(parseData);
        // const data = JSON.parse(billingData);
        console.log("Billing count", parseData?.country, cartWieght);
        shiipingRate(parseData?.country?.code);
      }
    }
    if (checkbox) {
      const data = localStorage.getItem("billingaddress");
      console.log("Billing addr12", JSON.parse(data));

      if (data) {
        const parseData = JSON.parse(data);
        setFiled(parseData);
        shiipingRate(parseData?.country?.code);
      }
    } else {
      const data = localStorage.getItem("shiipingaddreess");
      console.log("Billing addr099", JSON.parse(data));
      if (data) {
        const parseData = JSON.parse(data);
        setFiled(parseData);
        shiipingRate(parseData?.country?.code);
      }
    }
  }, [checkbox, cartWieght]);
  useEffect(() => {
    if (cart?.length > 0) {
      getTotalWeight();
    }
  }, [cart]);

  //  useEffect(() => {
  //     // setInsuranceCost(insurance);
  //     if (shiipingRate?.Value?.length >= 0) {
  //       setshiipingCost(shippingRate?.Value[0]?.Price);
  //     }
  //   }, [insurance, shippingRate]);
  console.log("Hndle text", filed);

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
            <h1>Checkout: Enter Shipping Details</h1>
          </div>

          <div className="container">
            <div className="login-signup">
              <div className="row">
                <div className="col-md-12">
                  <div className="login-sec  checkout-sec">
                    <h2>3. Shipping Information</h2>
                    <p>
                      Fill in the fields below with your billing information:
                    </p>
                    <div className="bottom-checkout">
                      <div className="row">
                        <div className="Terms_condition">
                          <input
                            onChange={() => {
                              setCheckbox(!checkbox);
                            }}
                            checked={checkbox}
                            value={checkbox}
                            type="checkbox"
                            name="checkoutType"
                            className="custom-checkbox"
                          />{" "}
                          <label className="label_checkbox">
                            &nbsp;Use Billing Address
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <input
                        type="text"
                        required
                        ref={fieldRef?.firstName}
                        onChange={(e) => {
                          handleText("firstName", e.target.value);
                        }}
                        value={
                          filed && filed.firstName !== undefined
                            ? filed.firstName
                            : ""
                        }
                        placeholder="FIRST NAME*"
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
                        value={
                          filed && filed.lastName !== undefined
                            ? filed.lastName
                            : ""
                        }
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
                        value={
                          filed && filed.company !== undefined
                            ? filed.company
                            : ""
                        }
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
                        value={
                          filed && filed.email !== undefined ? filed.email : ""
                        }
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
                        value={
                          filed && filed.addressOne !== undefined
                            ? filed.addressOne
                            : ""
                        }
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
                        value={
                          filed && filed.addressTwo !== undefined
                            ? filed.addressTwo
                            : ""
                        }
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
                        value={
                          filed && filed.city !== undefined ? filed.city : ""
                        }
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
                        value={
                          filed && filed.state !== undefined ? filed.state : ""
                        }
                      ></input>

                      <div className="required-text">{error.state}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        placeholder="ZIP CODE*"
                        ref={fieldRef?.zipCode}
                        onChange={(e) => {
                          handleText("zipCode", e.target.value);
                        }}
                        value={
                          filed && filed.zipCode !== undefined
                            ? filed.zipCode
                            : ""
                        }
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
                          shiipingRate(code);
                        }}
                        value={filed?.country?.code ?? ""}
                      >
                        <option value="">SELECT COUNTRY *</option>
                        {CountryList.map((country, index) => (
                          <option
                            key={index}
                            data-name={country.country}
                            value={country.code}
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
                        type="text"
                        onChange={(e) => {
                          handleText("telePhone", e.target.value);
                        }}
                        placeholder="TELEPHONE*"
                        value={
                          filed && filed.telePhone !== undefined
                            ? filed.telePhone
                            : ""
                        }
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
                            onChange={() => {
                              setCheckbox(!checkbox);
                            }}
                            checked={checkbox}
                            type="checkbox"
                            name="checkoutType"
                            className="custom-checkbox"
                          />{" "}
                          <label className="label_checkbox">
                            &nbsp;Use Billing Address
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

export default Shipping;
