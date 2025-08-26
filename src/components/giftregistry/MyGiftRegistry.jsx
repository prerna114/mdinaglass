"use client";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CreateGiftRegistry from "./CreateGiftRegistry";

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
          <div className="tabb-of-gift d-flex">
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
          {activeTab == "1" && (
            <div className="gift-registry-body">
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
                            <td
                              className="text-center"
                              style={{ paddingLeft: "5px" }}
                            >
                              <button className="btn btn-info btn-giftt btn-gift-custom text-white">
                                <Image
                                  src="/assets/bag_white.webp"
                                  alt="Cart Icon"
                                  width={15}
                                  height={15}
                                  className="me-1"
                                />{" "}
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

                              <div className="d-flex displayflex-end">
                                {/* Priority */}
                                <div className="d-block w-100 align-items-center mb-2">
                                  <label className="me-2 priority-name">
                                    Priority:
                                  </label>
                                  <br />
                                  <select
                                    className="form-control gift-input"
                                    style={{ maxWidth: "100%" }}
                                  >
                                    <option>Would be nice to have</option>
                                    <option>Important</option>
                                    <option>Must have</option>
                                  </select>
                                </div>
                                <button className="btn removebtn btn-danger">
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
                  <h2 className="mt-3">Registry Information</h2>
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
                    <h2 className="mt-3">Registrant</h2>

                    <CreateGiftRegistry create={false} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab == "3" && (
            <div>
              <div className="col-md-12">
                <div
                  className="login-sec checkout-sec"
                  style={{
                    padding: 0,
                    marginTop: 0,
                  }}
                >
                  <h2 className="mt-3">Tell others about your Registry</h2>
                </div>
                <div className="gift-tell">
                  <label>
                    Enter e-mail addresses of those who you want to tell about
                    your Gift Registry (separated by commas):
                  </label>
                  <textarea
                    placeholder="Add e-mail addresses"
                    className="form-control mb-3"
                    rows={7}
                  ></textarea>

                  <label>Message they will receive:</label>
                  <textarea
                    placeholder="Add Message"
                    className="form-control mb-3"
                    rows={7}
                  ></textarea>

                  <div className="d-flex justify-content-between">
                    <a href="#" className="back-link-a">
                      {" "}
                      Back to Gift Registry
                    </a>

                    <button className="btn btn-giftt btn-cart float-right btn-info text-white">
                      Send E-mail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab == "4" && (
            <div>
              <div className="col-md-12">
                <div
                  className="login-sec checkout-sec"
                  style={{
                    padding: 0,
                    marginTop: 0,
                  }}
                >
                  <h2 className="mt-3">Guest's View of your Registry</h2>
                </div>

                <hr></hr>

                <div className="upper-cart-details">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3>Welcome to Registry title Gift Registry!</h3>

                      <ul>
                        <li>
                          Event Date: <span>23/08/2025 </span>
                        </li>
                        <li>
                          Event Location: <span>New Delhi </span>
                        </li>
                      </ul>

                      <div className="d-flex displayflex-end">
                        {/* Priority */}
                        <div className="d-flex align-items-center mb-2">
                          <label className="me-2 priority-name">
                            Priority:
                          </label>
                          <br />
                          <select
                            className="form-control "
                            style={{ maxWidth: "250px" }}
                          >
                            <option>Would be nice to have</option>
                            <option>Important</option>
                            <option>Must have</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="gift-img-custom">
                      <img
                        src="/assets/Bubble.png"
                        alt="Gift Image mb-2"
                        width="150"
                      />
                    </div>
                  </div>
                </div>

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
                            <td
                              className="text-center"
                              style={{ paddingLeft: "5px" }}
                            >
                              <button className="btn btn-info btn-gift-custom btn-giftt text-white">
                                <Image
                                  src="/assets/bag_white.webp"
                                  alt="Cart Icon"
                                  width={15}
                                  height={15}
                                  className="me-1"
                                />{" "}
                                Add to Cart
                              </button>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <a href="#" className="back-link-a">
                  {" "}
                  Back to Gift Registry
                </a>
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
