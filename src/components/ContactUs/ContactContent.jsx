"use client";
import { useAuthStore } from "@/store/useAuthStore";
import React from "react";
import CmsAboveMenu from "../CmsAboveMenu";
import RecipeIdea from "../RecipeIdea";

const ContactContent = ({ content }) => {
  const { cmsInfo } = useAuthStore((state) => state);
  console.log("cmsInfo", cmsInfo);
  const links = [
    { id: 1, label: "Contact Details & Outlets", slug: "contact-details" },
    { id: 2, label: "Contact Form", slug: "contact-form" },
  ];
  const cleanedHtml = cmsInfo?.html_content?.replaceAll(
    "https://mdinaglass.blackbullsolution.com",
    ""
  );

  console.log("cleanedHtml", cleanedHtml);
  return (
    <div className="information px-5 mb-5">
      {/* <ContactAboveMenu /> */}
      <CmsAboveMenu link={links} route={"contactus"} />
      {cmsInfo && Object.keys(cmsInfo).length > 0 ? (
        <div className="container">
          <h2>{cmsInfo?.page_title}</h2>
          <p dangerouslySetInnerHTML={{ __html: cleanedHtml }}></p>{" "}
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
                      className="contact-input"
                      required
                      onChange={(e) => {
                        handleText("firstName", e.target.value);
                      }}
                      style={{
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
                        width: "100% !important",
                      }}
                      className="contact-input"
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
                        width: "100% !important",
                      }}
                      className="contact-input"
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
                        width: "100% !important",
                      }}
                      className="contact-input"
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
      <div className="reciep-display">
        <RecipeIdea />
      </div>
    </div>
  );
};

export default ContactContent;
