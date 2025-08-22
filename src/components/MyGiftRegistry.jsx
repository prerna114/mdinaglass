"use client";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const MyGiftRegistry = () => {
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
  return (
    <div className="container">
      <div>
        <div className="col-md-12">
          <div>
            <div className="d-flex">
              {tabData?.map((data, index) => (
                <div
                  key={index}
                  onClick={() => setActiveTab(data?.id)}
                  className={`gift-registry d-flex ${
                    activeTab === data?.id ? "activeTab" : ""
                  }`}
                >
                  <h2>{data?.title}</h2>
                </div>
              ))}
            </div>
          </div>
          {activeTab == "1" && (
            <div>
              <h2>Your Gift Registry</h2>
              <div
                className="cart-page-main mt-3"
                style={{
                  background: "#f1f1f1",
                }}
              >
                <div className="table-responsive-sm">
                  <table className="table cart-table table-bordered">
                    <thead className="thead-dark">
                      <tr className="tr-bg">
                        <th>ITEM</th>
                        <th>PRODUCT NAME</th>
                        <th>PRICE</th>
                        <th
                          style={{
                            width: "12%",
                          }}
                        >
                          DESIRED
                        </th>
                        <th
                          style={{
                            width: "12%",
                          }}
                        >
                          RECEIVED
                        </th>
                        <th
                          style={{
                            width: "15%",
                          }}
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, index) => (
                        <>
                          {/* First Row */}
                          <tr key={index}>
                            {/* ITEM IMAGE */}
                            <td style={{ textAlign: "center" }}>
                              <img
                                src={item.image || "/assets/fb.png"}
                                alt={item.name}
                                width="80"
                              />
                            </td>

                            {/* PRODUCT NAME */}
                            <td>
                              {item.name || "Small Round Hanging Light Blue"}
                            </td>

                            {/* PRICE */}
                            <td>€ 130</td>

                            {/* DESIRED */}
                            <td>
                              <input
                                type="number"
                                value={item.desired || 1}
                                min="1"
                                className="form-control bg-white"
                                style={{ width: "70px" }}
                              />
                            </td>

                            {/* RECEIVED */}
                            <td>
                              <input
                                type="number"
                                value={item.received || 0}
                                min="0"
                                className="form-control bg-white"
                                style={{ width: "70px" }}
                              />
                            </td>

                            {/* ADD TO CART BUTTON */}
                            <td className="text-center">
                              <button className="btn btn-info text-white">
                                Add to Cart
                              </button>
                            </td>
                          </tr>

                          {/* Second Row for Note, Priority, Remove */}
                          <tr>
                            <td colSpan="6">
                              {/* Note */}
                              <textarea
                                placeholder="Add a Note"
                                className="form-control mb-2"
                                rows={7}
                              ></textarea>

                              <div className="d-flex justify-content-between">
                                {/* Priority */}
                                <div className="d-flex align-items-center mb-2">
                                  <label className="me-2 fw-bold">
                                    Priority:
                                  </label>
                                  <select
                                    className="form-control"
                                    style={{ maxWidth: "250px" }}
                                  >
                                    <option>Would be nice to have</option>
                                    <option>Important</option>
                                    <option>Must have</option>
                                  </select>
                                </div>
                                <button className="btn btn-danger">
                                  Remove
                                </button>
                              </div>

                              {/*   Button */}
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab == "2" && (
            <div>
              <div className="col-md-12">
                <div
                  className="login-sec checkout-sec"
                  style={{
                    padding: 0,
                    marginTop: 0,
                  }}
                >
                  <h2>Registry Information</h2>
                </div>
                <div className="gift-registry-body">
                  <div>
                    <h1>Registry ID: {""}</h1>
                    <span>Csxqelic104</span>
                  </div>

                  <div>
                    <h1>Direct link to your registry:</h1>
                    <a>
                      https://www.mdinaglass.com.mt/en/gift-registry/giftregistry/creategiftregistry/guestview.htm?registerid=104
                    </a>
                  </div>

                  <div
                    className="login-sec  checkout-sec"
                    style={{
                      padding: 0,
                      marginTop: 0,
                    }}
                  >
                    <h2>Registrant</h2>
                    <p>
                      Fill in the fields below with your billing information:
                    </p>
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
                        placeholder="CITY*"
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
                        placeholder="STATE/PROVINCE*"
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

                    <div className="col-md-12">
                      <input
                        type="text"
                        placeholder="ZIP CODE*"
                        // ref={fieldRef?.zipCode}
                        // onChange={(e) => {
                        //   handleText("zipCode", e.target.value);
                        // }}
                        // value={
                        //   filed && filed.zipCode !== undefined
                        //     ? filed.zipCode
                        //     : ""
                        // }
                      ></input>
                    </div>

                    <div className="col-md-12">
                      <input
                        // ref={fieldRef?.telePhone}
                        type="text"
                        // onChange={(e) => {
                        //   handleText("telePhone", e.target.value);
                        // }}
                        placeholder="TELEPHONE*"
                        // value={
                        //   filed && filed.telePhone !== undefined
                        //     ? filed.telePhone
                        //     : ""
                        // }
                      ></input>
                    </div>

                    <div className="col-md-12">
                      <a>Fields Marked with (*) are Required.</a>
                    </div>

                    <div className="bottom-checkout">
                      <div className="row">
                        <div className="Terms_condition">
                          <input
                            // onChange={() => {
                            //   setCheckbox(!checkbox);
                            // }}
                            // checked={checkbox}
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
                              // onClick={() => validation()}
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

                  <div
                    className="login-sec  checkout-sec"
                    style={{
                      padding: 0,
                      marginTop: 0,
                    }}
                  >
                    <h2>Co-Registrant</h2>
                    <p>
                      Fill in the fields below with your billing information:
                    </p>
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
                        placeholder="CITY*"
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
                        placeholder="STATE/PROVINCE*"
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

                    <div className="col-md-12">
                      <input
                        type="text"
                        placeholder="ZIP CODE*"
                        // ref={fieldRef?.zipCode}
                        // onChange={(e) => {
                        //   handleText("zipCode", e.target.value);
                        // }}
                        // value={
                        //   filed && filed.zipCode !== undefined
                        //     ? filed.zipCode
                        //     : ""
                        // }
                      ></input>
                    </div>

                    <div className="col-md-12">
                      <input
                        // ref={fieldRef?.telePhone}
                        type="text"
                        // onChange={(e) => {
                        //   handleText("telePhone", e.target.value);
                        // }}
                        placeholder="TELEPHONE*"
                        // value={
                        //   filed && filed.telePhone !== undefined
                        //     ? filed.telePhone
                        //     : ""
                        // }
                      ></input>
                    </div>

                    <div className="col-md-12">
                      <a>Fields Marked with (*) are Required.</a>
                    </div>

                    <div className="bottom-checkout">
                      <div className="row">
                        <div className="Terms_condition">
                          <input
                            // onChange={() => {
                            //   setCheckbox(!checkbox);
                            // }}
                            // checked={checkbox}
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
                              // onClick={() => validation()}
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
          )}

          {/* <div className="required-text">{error.password}</div> */}
        </div>
      </div>
    </div>
  );
};

export default MyGiftRegistry;
