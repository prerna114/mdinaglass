"use client";
import { giftRegitry } from "@/api/Customer";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import { CustomToast, SuccessToast } from "../CustomToast";
const CreateGiftRegistry = ({ create }) => {
  const tabData = [
    {
      title: "Your Gift Registry",
      id: "1",
    },
    {
      title: "Registry Information",
      id: "2",
    },
    {
      title: "Tell About Your Registry",
      id: "3",
    },
    {
      title: "Guest's View Of Your Registry",
      id: "4",
    },
  ];
  const { cart, removeFromCart, clearCart, insurance } = useCartStore(
    (state) => state
  );
  const [error, setError] = useState({});

  const [activeTab, setActiveTab] = useState("1");
  const [startDate, setStartDate] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);
  const [loader, setLoader] = useState(false);
  const [createGiftText, setCreateGiftText] = useState();

  const createGiftRegistry = async () => {
    setLoader(true);
    const data = await giftRegitry();
    if (data?.status == 200) {
      setLoader(false);
      SuccessToast("Gift Registry create successfully", "top-right");
    } else if (data?.status == 409) {
      setLoader(false);

      CustomToast(data?.error, "top-right");
    } else {
      // if (data?.errorData?.message) {
      //   // CustomToast(data?.errorData?.message, "top-right");
      // } else {
      //   CustomToast("Something went wrong", "top-right");
      // }

      CustomToast("Something went wrong", "top-right");
    }
    console.log("Data", data);
  };

  const handleText = (key, value) => {
    setCreateGiftText((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  console.log("openCalendar", startDate);
  return (
    <div className="container">
      <div>
        <div className="col-md-12">
          <div>
            <div className="col-md-12">
              <div
                className="login-sec checkout-sec"
                style={{
                  padding: 0,
                  marginTop: 0,
                }}
              >
                {!create ? null : (
                  <h2 className="mt-3">Create Gift Registry</h2>
                )}
              </div>
              <div className="gift-registry-body">
                <div
                  className="login-sec  checkout-sec"
                  style={{
                    padding: 0,
                    marginTop: 0,
                  }}
                >
                  <div>
                    <h2 className="mt-3">Registry</h2>{" "}
                    <div className="col-md-12">
                      <input
                        type="text"
                        required
                        // ref={fieldRef?.firstName}
                        onChange={(e) => {
                          handleText("title", e.target.value);
                        }}
                        value={createGiftText?.title}
                        // value={
                        //   filed && filed.firstName !== undefined
                        //     ? filed.firstName
                        //     : ""
                        // }
                        placeholder="REGISTRY TITLE*"
                      ></input>

                      {/* <div className="required-text">
                                {error.firstName}
                              </div> */}
                    </div>
                  </div>
                  <h2 className="mt-3">Registrant</h2>
                  {/* <p>Fill in the fields below with your billing information:</p> */}
                  <div className="bottom-checkout">
                    <div className="row">
                      {/* <div className="Terms_condition">
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
                                </div> */}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <input
                      type="text"
                      required
                      // ref={fieldRef?.firstName}
                      // onChange={(e) => {
                      //   handleText("firstName", e.target.value);
                      // }}
                      // value={
                      //   filed && filed.firstName !== undefined
                      //     ? filed.firstName
                      //     : ""
                      // }
                      placeholder="FIRST NAME*"
                    ></input>

                    {/* <div className="required-text">
                                {error.firstName}
                              </div> */}
                  </div>

                  <div className="col-md-12">
                    <input
                      type="text"
                      required
                      // ref={fieldRef?.firstName}
                      // onChange={(e) => {
                      //   handleText("firstName", e.target.value);
                      // }}
                      // value={
                      //   filed && filed.firstName !== undefined
                      //     ? filed.firstName
                      //     : ""
                      // }
                      placeholder="LAST NAME*"
                    ></input>

                    {/* <div className="required-text">
                                {error.firstName}
                              </div> */}
                  </div>

                  <div className="col-md-12">
                    <input
                      type="text"
                      placeholder="MAIDEN NAME (if applicable)"
                      // ref={fieldRef?.city}
                      // onChange={(e) => {
                      //   handleText("city", e.target.value);
                      // }}
                      // value={
                      //   filed && filed.city !== undefined
                      //     ? filed.city
                      //     : ""
                      // }
                    ></input>

                    <div className="required-text">{error.city}</div>
                  </div>

                  <div className="col-md-12">
                    <input
                      type="text"
                      // ref={fieldRef?.state}
                      placeholder="EMAIL*"
                      // onChange={(e) => {
                      //   handleText("state", e.target.value);
                      // }}
                      // value={
                      //   filed && filed.state !== undefined
                      //     ? filed.state
                      //     : ""
                      // }
                    ></input>

                    {/* <div className="required-text">{error.state}</div> */}
                  </div>
                </div>

                <div
                  className="login-sec  checkout-sec"
                  style={{
                    padding: 0,
                    marginTop: 0,
                  }}
                >
                  <h2 className="mt-3">Co-Registrant</h2>
                  <div className="bottom-checkout">
                    <div className="row">
                      {/* <div className="Terms_condition">
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
                                </div> */}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <input
                      type="text"
                      required
                      // ref={fieldRef?.firstName}
                      // onChange={(e) => {
                      //   handleText("firstName", e.target.value);
                      // }}
                      // value={
                      //   filed && filed.firstName !== undefined
                      //     ? filed.firstName
                      //     : ""
                      // }
                      placeholder="FIRST NAME*"
                    ></input>

                    {/* <div className="required-text">
                                {error.firstName}
                              </div> */}
                  </div>

                  <div className="col-md-12">
                    <input
                      type="text"
                      required
                      // ref={fieldRef?.firstName}
                      // onChange={(e) => {
                      //   handleText("firstName", e.target.value);
                      // }}
                      // value={
                      //   filed && filed.firstName !== undefined
                      //     ? filed.firstName
                      //     : ""
                      // }
                      placeholder="LAST NAME*"
                    ></input>

                    {/* <div className="required-text">
                                {error.firstName}
                              </div> */}
                  </div>

                  <div className="col-md-12">
                    <input
                      type="text"
                      placeholder="MAIDEN NAME (if applicable)"
                      // ref={fieldRef?.city}
                      // onChange={(e) => {
                      //   handleText("city", e.target.value);
                      // }}
                      // value={
                      //   filed && filed.city !== undefined
                      //     ? filed.city
                      //     : ""
                      // }
                    ></input>

                    <div className="required-text">{error.city}</div>
                  </div>

                  <div className="col-md-12">
                    <input
                      type="text"
                      // ref={fieldRef?.state}
                      placeholder="EMAIL*"
                      // onChange={(e) => {
                      //   handleText("state", e.target.value);
                      // }}
                      // value={
                      //   filed && filed.state !== undefined
                      //     ? filed.state
                      //     : ""
                      // }
                    ></input>

                    {/* <div className="required-text">{error.state}</div> */}
                  </div>
                </div>

                <div
                  className="login-sec  checkout-sec"
                  style={{
                    padding: 0,
                    marginTop: 0,
                  }}
                >
                  <h2 className="mt-3">Event</h2>

                  <div className="bottom-checkout">
                    <div className="row">
                      {/* <div className="Terms_condition">
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
                                </div> */}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <DatePicker
                      // open={openCalendar}
                      selected={startDate}
                      onChange={(date) => {
                        const formatted = moment(date).format("YYYY-MM-DD");
                        setStartDate(formatted),
                          handleText(formatted, "top-right");
                        setOpenCalendar(!openCalendar);
                      }}
                      // showIcon
                    />

                    {/* <div className="required-text">
                                {error.firstName}
                              </div> */}
                  </div>

                  <div className="col-md-12">
                    <input
                      type="text"
                      placeholder="EVENT LOCATION*"
                      // ref={fieldRef?.city}
                      // onChange={(e) => {
                      //   handleText("city", e.target.value);
                      // }}
                      // value={
                      //   filed && filed.city !== undefined
                      //     ? filed.city
                      //     : ""
                      // }
                    ></input>

                    <div className="required-text">{error.city}</div>
                  </div>

                  <div className="col-md-12">
                    <textarea
                      type="text"
                      rows={7}
                      // ref={fieldRef?.state}
                      placeholder="MESSAGE FOR REGISTRY GUESTS*"
                      style={{ width: "80%" }}
                      onChange={(e) => {
                        handleText("description", e.target.value);
                      }}
                      // value={
                      //   filed && filed.state !== undefined
                      //     ? filed.state
                      //     : ""
                      // }
                    ></textarea>

                    {/* <div className="required-text">{error.state}</div> */}

                    <h2 className="mt-3">Shipping Address</h2>
                    <p>
                      To choose a shipping address for your gifts, please add an
                      address to your address book first.
                    </p>
                    <p className="ship-p mb-0">
                      <span>
                        <input
                          className="inlineInput"
                          type="checkbox"
                          id="shipping"
                          name="shipping-en"
                          data-gtm-form-interact-field-id="1"
                        />
                      </span>
                      I want to specify a shipping address for the gifts (it
                      will be added to your address book)
                    </p>

                    <div className="custom-file-upload">
                      <label className="btn btn-upload mb-0" for="fileInput">
                        Choose File...
                      </label>
                      <input type="file" id="fileInput" />
                      <span className="file-name" id="fileName">
                        img1.webp
                      </span>
                    </div>

                    <h2 className="mt-3 mb-1">Change Photo</h2>
                    <p className="mb-0">
                      Personalise your registry with a profile image. Max. file
                      size 500kb. Formats: .jpg, .png (and any others).
                    </p>

                    <img
                      src="/assets/Bubble.png"
                      alt="Gift Image mb-2"
                      width="150"
                      className="mb-2"
                    />
                    <h2 className="mt-2">Registry Status</h2>
                    <div className="checkbook-input">
                      <p className="mb-0">
                        <span>
                          <input type="radio" className="radio-check" />
                        </span>{" "}
                        Public Registry (available to everyone through registry
                        search, and direct access using direct link)
                      </p>
                      <p>
                        {" "}
                        <span>
                          <input type="radio" className="radio-check" />
                        </span>{" "}
                        Public Registry (available to everyone through registry
                        search, and direct access using direct link)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="required-text">{error.password}</div> */}
        </div>

        <button className="btn btn-cart btn-info text-white back-button">
          <div
            // href={`/orderReview?method=${method}`}
            onClick={() => {
              createGiftRegistry();
            }}
          >
            Create Registry
          </div>
        </button>

        <button className="btn btn-cart btn-info text-white back-button">
          {loader ? (
            <div className="spinner-border text-white" role="status"></div>
          ) : (
            <div
              // href={`/orderReview?method=${method}`}
              onClick={() => {
                createGiftRegistry();
              }}
            >
              Create Registry
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateGiftRegistry;
