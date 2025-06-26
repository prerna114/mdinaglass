import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div
      style={{
        background: "#f1f1f1",
      }}
    >
      <div className="header-product bg-white">
        <h1>Gift Registry Search</h1>
      </div>

      <div className="container">
        <div className="login-signup">
          <div className="row">
            <div className="col-md-12">
              <div className="login-sec  checkout-sec">
                <h2 className="mb-3">Search By Name:</h2>

                <div className="col-md-12">
                  <input type="text" placeholder="FIRST NAME*"></input>
                </div>

                <div className="col-md-12">
                  <input type="text" placeholder="LAST NAME*"></input>
                </div>
                <h2 className="mb-3 mt-2">or by Registry ID:</h2>

                <div className="col-md-12">
                  <input type="text" placeholder="Register ID*"></input>
                </div>

                <div className="col-md-6">
                  <div className="mt-3">
                    <Link href={"/shipping"}>
                      <button className="btn-cart">Submit</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
