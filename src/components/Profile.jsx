"use client";

import { useState } from "react";

export default function Make() {
  const [tab, setTab] = useState("profile");

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
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
              Order Status
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="col-md-9">
          <div className="card">
            <div className="card-body">
              {tab === "profile" && (
                <div>
                  <h4>👤 User Profile</h4>
                </div>
              )}
              {tab === "orders" && <h4>🛒 Order List</h4>}
              {tab === "status" && <h4>📦 Order Status</h4>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}