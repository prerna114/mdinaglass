"use client";

import { createUrl } from "@/constant";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#F1F1F1" }}>
      {/* Top Footer */}
      <div className="container footer-area pt-5 pb-4">
        <div className="row">
          {/* Logo & Payment */}
          <div className="col-md-4 mb-4">
            <Link href={"/"} className="footer-logo">
              <Image
                src="/assets/footer-logo.webp"
                alt="Mdina Glass Logo"
                className="mb-3 footer-logo"
                style={{ width: "290px !important" }}
                width={290}
                height={116}
              />
            </Link>
            <p className="font-footer">Payment Method</p>
            <div className="d-flex footer-logo flex-wrap gap-2">
              <Image
                src="/assets/visa.png"
                className=""
                alt="Visa"
                height={30}
                // width="100%"
                loading="lazy"
                width={336}
              />
            </div>
          </div>

          {/* Links */}
          <div className="col-md-2 mb-4">
            <h6 className="footer-link">Links</h6>
            <ul className="list-unstyled small">
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/aboutus"}>About Us</Link>
              </li>
              <li>
                <Link href={createUrl("all", "all-product")}>All Products</Link>
              </li>
              <li>
                <Link href={"/cartpage"}>New Arrivals</Link>
              </li>
              <li>
                <Link href={"/loginCheckoutPage"}>Limited Editions</Link>
              </li>
              <li>
                <Link href={"/gift"}>Gift Registry</Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div className="col-md-3 mb-4">
            <h6 className="footer-link">Information</h6>
            <ul className="list-unstyled small">
              <li>Careers</li>
              <li>International Delivery</li>
              <li>Trade Enquiries</li>
              <li>
                <Link href={"/information/terms-and-conditions"}>
                  Terms & Conditions
                </Link>
              </li>
              <li>Privacy Policy & Data Protection</li>
              <li>Cookies Policy</li>
              <li>Returns & Cancellations</li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="col-md-3 mb-4">
            <h6 className="footer-link">Contact</h6>
            <ul className="list-unstyled small">
              <li>Store Locator & Contact</li>
              <li>Contact Form</li>
            </ul>
            <h6 className="footer-link mt-3 mb-3">Get Social</h6>
            <div className="d-flex gap-2 footer-social-icon  mb-2">
              <img
                src="/assets/fb.png"
                className="footer-images"
                alt="Facebook"
              />
              <img
                src="/assets/insta.webp"
                className="footer-images"
                alt="Instagram"
              />
              <img
                src="/assets/twitter.webp"
                className="footer-images"
                alt="Twitter"
              />
              <img
                src="/assets/linkedin.png"
                className="footer-images"
                alt="Linkedin"
              />
            </div>
            <div
              className="d-inline-flex align-items-center houzer-button px-3 py-2 rounded mt-2"
              style={{ backgroundColor: "#80d1cb", Width: "200px" }}
            >
              <img
                src="/assets/houzz.png"
                alt="Houzz"
                style={{
                  height: "24px",
                  width: "auto!important",
                  marginRight: "8px",
                }}
              />
              <span className="text-white small span-houze">
                Featured on Houzz
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="text-dark small text-center py-3"
        style={{
          background: "white",
          fontFamily: "Quicksand, sans-serif",
          fontSize: "11px",
          lineHeight: "16.5px",
        }}
      >
        <div className="container">
          <p className="mb-2 px-3 footer-para">
            © 2025 Mdina Glass Malta (XK Holdings). Trading License Number:
            55/1739. All Rights Reserved. VAT registered number MT 1735-2011 EXO
            984. All prices on this website include VAT unless stated. Contracts
            and correspondence are concluded in English and the store currency
            is EUR. Mdina Glass is not responsible for accuracy of currency
            conversions shown on this website. The conversions are called in
            from a 3rd Party and are for approximate use only and the customer
            is responsible for finally checking conversion rates, if they wish,
            from their own preferred source.
          </p>
          <p
            className="mb-0"
            style={{
              fontSize: "15px",
            }}
          >
            Designed by
            <a
              href="https://bubbletechnosoft.com"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/assets/blackbull-logo.webp"
                alt="BlackBull TechnoSoft"
                className="ms-2"
                style={{ height: "15px", verticalAlign: "middle" }}
                loading="lazy"
                width={51}
                height={15}
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
