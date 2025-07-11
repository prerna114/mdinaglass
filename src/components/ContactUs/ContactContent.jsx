"use client";
import { useAuthStore } from "@/store/useAuthStore";
import React from "react";

const ContactContent = ({ content }) => {
  const { cmsInfo } = useAuthStore((state) => state);
  console.log("cmsInfo", cmsInfo);

  return (
    <div className="information px-5">
      {cmsInfo && Object.keys(cmsInfo).length > 0 ? (
        <div className="container">
          <h2>{cmsInfo?.page_title}</h2>
          <p
            dangerouslySetInnerHTML={{ __html: cmsInfo?.html_content }}
          ></p>{" "}
        </div>
      ) : (
        <div className="container">
          <div className="login-signup">
            <div className="row">
              <div className="col-md-12">
                <div className="checkout-sec">
                  <h2>Contact Form</h2>
                  <p>
                    Please don’t hesitate to contact us if you have any
                    questions, comments or messages. We will get back to you as
                    soon as possible.
                  </p>

                  <div className="col-md-12 mb-3">
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        handleText("firstName", e.target.value);
                      }}
                      style={{
                        paddingLeft: 10,
                        width: "100% !important",
                      }}
                      placeholder="FIRST NAME*"
                    ></input>
                  </div>

                  <div className="col-md-12 mb-3">
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        handleText("firstName", e.target.value);
                      }}
                      style={{
                        paddingLeft: 10,
                        width: "100% !important",
                      }}
                      placeholder="LAST NAME*"
                    ></input>
                  </div>

                  <div className="col-md-12 mb-3">
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        handleText("firstName", e.target.value);
                      }}
                      style={{
                        paddingLeft: 10,
                        width: "100% !important",
                      }}
                      placeholder="EMAIL*"
                    ></input>
                  </div>

                  <div className="col-md-12 mb-3">
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        handleText("firstName", e.target.value);
                      }}
                      style={{
                        paddingLeft: 10,
                        width: "100% !important",
                      }}
                      placeholder="SUBJECT*"
                    ></input>
                  </div>

                  <div className="col-md-12 mb-3">
                    <textarea
                      required
                      onChange={(e) => handleText("firstName", e.target.value)}
                      style={{ paddingLeft: 10, height: 150, width: "100%" }} // you can adjust height as needed
                      placeholder="MESSAGE*"
                      rows={5}
                    />
                  </div>

                  <div className="bottom-checkout">
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          {/* <Link
                              // href={"/shipping"}
                              href={"#"}
                              onClick={() => validation()}
                            > */}
                          <button
                            //   onClick={() => validation()}
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
      )}
    </div>
  );
};

export default ContactContent;
