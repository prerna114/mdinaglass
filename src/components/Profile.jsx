"use client";

import { useEffect, useState } from "react";
import { SquarePen } from "lucide-react";

import { products } from "@/constant";
import Link from "next/link";
import { getOrderList } from "@/api/CartApi";
import moment from "moment";
import MyGiftRegistry from "./MyGiftRegistry";
import InstantLink from "./InstantClick";

export default function Make() {
  const [tab, setTab] = useState("profile");
  const subtotal = (price, qty) => (price * qty).toFixed(2);
  const [userDetails, setUserDetails] = useState();
  const [orderList, setOrderList] = useState([]);
  const [password, setPassword] = useState({});
  const getTheOrderList = async () => {
    const response = await getOrderList();
    if (response.status == 200) {
      setOrderList(response.data.data);
    }
  };
  useEffect(() => {
    const data = localStorage.getItem("token");
    if (data) {
      setUserDetails(JSON.parse(data));
      getTheOrderList();
    }
  }, []);

  console.log("Get the Orderlsit", orderList);
  const handleChanges = (key, value) => {
    setPassword((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-4">
          <ul className="list-group">
            <li
              className={`list-group-item ${tab === "profile" ? "active" : ""}`}
              onClick={() => setTab("profile")}
              style={{ cursor: "pointer" }}
            >
              Profile
            </li>
            <li
              className={`list-group-item ${tab === "orders" ? "active" : ""}`}
              onClick={() => setTab("orders")}
              style={{ cursor: "pointer" }}
            >
              Orders
            </li>
            <li
              className={`list-group-item ${tab === "status" ? "active" : ""}`}
              onClick={() => setTab("status")}
              style={{ cursor: "pointer" }}
            >
              Track Order
            </li>
            {/* <li
              className={`list-group-item ${
                tab === "password" ? "active" : ""
              }`}
              onClick={() => setTab("password")}
              style={{ cursor: "pointer" }}
            >
              Change Password
            </li> */}
            <li
              className={`list-group-item ${
                tab === "registry" ? "active" : ""
              }`}
              onClick={() => setTab("registry")}
              style={{ cursor: "pointer" }}
            >
              My Gift Registry
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="col-md-9">
          <div className="card">
            <div className="card-body">
              {tab === "profile" && (
                <div>
                  <div className="row d-flex align-items-center justify-content-between mb-3">
                    <div className="col-auto">
                      <h4 className="mb-0">👤 User Profile</h4>
                    </div>
                    <InstantLink href={"/editUser"} className="col-auto">
                      <SquarePen size={27} />
                    </InstantLink>
                  </div>

                  <div className="ms-4">
                    <div>
                      <h5>Name</h5>
                      <p>{userDetails?.name}</p>
                    </div>

                    <div>
                      <h5>Email</h5>
                      <p>{userDetails?.email}</p>
                    </div>

                    <div>
                      <h5>Address</h5>
                      <p>
                        {userDetails?.address?.street}{" "}
                        {userDetails?.address?.city}{" "}
                        {userDetails?.address?.state}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {tab === "orders" && (
                <div>
                  <h4>🛒 Order List</h4>
                  <div className="table-responsive-sm">
                    <table className="table cart-table table-bordered">
                      <thead className="thead-dark">
                        <tr className="tr-bg">
                          <th>ORDER ID</th>
                          <th>ORDER DATE</th>
                          <th>PRICE</th>
                          <th>QTY</th>
                          <th>ORDER STATUS</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderList.map((item) =>
                          item.items.map((data) => (
                            <tr key={data.id}>
                              <td>{data.id}</td>
                              <td>
                                {moment(item.created_at).format(
                                  "MMMM Do YYYY, h:mm A"
                                )}
                                {/* {item?.created_at} */}
                              </td>
                              <td>€{Number(data.price).toFixed(2)}</td>
                              {/* <td>€{subtotal(item.price, item.qty)}</td> */}
                              <td>{data.qty_ordered}</td>
                              <td>{item.status}</td>
                              <td>
                                <Link href={"/loginCheckoutPage"}>
                                  <p>View Details</p>
                                </Link>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {tab === "status" && (
                <div>
                  <h4> 🖲 Track Order</h4>
                  <div className="table-responsive-sm">
                    <table className="table cart-table table-bordered">
                      <thead className="thead-dark">
                        <tr className="tr-bg">
                          <th>ORDER ID</th>
                          <th>ORDER DATE</th>
                          <th>PRICE</th>
                          <th>QTY</th>
                          <th>ORDER STATUS</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((item) => (
                          <tr key={item.id}>
                            <td>{item.orderId}</td>
                            <td>{item.orderDate}</td>

                            {/* <td>€{item.price.toFixed(2)}</td> */}
                            <td>€{subtotal(item.price, item.qty)}</td>
                            <td>{item.qty}</td>
                            <td>{item.orderStatus}</td>
                            <td>
                              <Link href={"/loginCheckoutPage"}>
                                <p>Track Order</p>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {/* {tab === "password" && (
                <div
                  className="login-sec  checkout-sec"
                  style={{
                    marginTop: 0,
                    paddingTop: 0,
                  }}
                >
                  <h4>Change Password</h4>
                  <div className="col-md-12">
                    <input
                      type="password"
                      required
                      placeholder="CURRENT PASSWORD"
                      onChange={(e) => {
                        setPassword("currentPasswod", e.target.value);
                      }}
                    ></input>
                    <input
                      type="password"
                      required
                      placeholder="NEW PASSWORD*"
                      onChange={(e) => {
                        setPassword("newPasswod", e.target.value);

                      }}
                    ></input>
                  </div>

                  <div className="col-md-12">
                    <input
                      type="password"
                      required
                      placeholder="CONFIRM NEW PASSWORD*"
                      onChange={(e) => {
                        setPassword("confirmNewPasswod", e.target.value);

                      }}
                    ></input>
                  </div>
                  <button className="btn btn-cart btn-info text-white">
                    Submit
                  </button>
                </div>
              )} */}
              {tab === "registry" && (
                <div
                  className=" checkout-sec"
                  style={{
                    marginTop: 0,
                    paddingTop: 0,
                  }}
                >
                  <h4>Welcome to Your Gift Registry, {userDetails?.name}!</h4>
                  <MyGiftRegistry />

                  <button className="btn btn-cart btn-info text-white">
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
