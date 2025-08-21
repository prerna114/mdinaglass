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
                              <button className="btn btn-danger">Remove</button>
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
          {/* <div className="required-text">{error.password}</div> */}
        </div>
      </div>
    </div>
  );
};

export default MyGiftRegistry;
