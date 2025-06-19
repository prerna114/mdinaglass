import Link from "next/link";
import React from "react";

function editUser() {
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

              <div className="header-of-cart mt-2">
                <Link href="/">
                  <button className="btn btn-info text-white">Submit</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default editUser;
