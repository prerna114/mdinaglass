"use client";

import { useEffect, useState } from "react";
import { SquarePen } from "lucide-react";

import { products } from "@/constant";
import Link from "next/link";
import { getOrderList } from "@/api/CartApi";
import moment from "moment";

export default function Make() {
  const [tab, setTab] = useState("profile");
  const subtotal = (price, qty) => (price * qty).toFixed(2);
  const [userDetails, setUserDetails] = useState();
  const [orderList, setOrderList] = useState([]);
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

  console.log("Get the Orderlsit", userDetails);

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
                    <Link href={"/editUser"} className="col-auto">
                      <SquarePen size={27} />
                    </Link>
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
                        Vjal L-Istadium Nazzjonali, Attard, Ta' Qali, Opposite
                        Big Mat
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
                              <td>{item.orderId}</td>
                              <td>
                                {moment(data.created_at).format(
                                  "MMMM Do YYYY, h:mm A"
                                )}
                              </td>
                              {/* <td>€{item.price.toFixed(2)}</td> */}
                              <td>€{subtotal(item.price, item.qty)}</td>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
