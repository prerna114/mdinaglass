"use client";

import { createUrl } from "@/constant";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ProductLists } from "@/store/product";
import InstantLink from "./InstantClick";

const Footer = () => {
  const { setPagination } = ProductLists((state) => state);
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
                style={{ width: "60%!important", height: "auto!important" }}
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
                <InstantLink href={"/about/about-mdina-glass"}>
                  About Us
                </InstantLink>
              </li>
              <li>
                <InstantLink
                  onClick={() => {
                    setPagination({
                      per_page: 15,
                      page: 1,
                      sort_by: "price",
                      sort_dir: "asc",
                    });
                  }}
                  href={createUrl("all", "all-product")}
                >
                  All Products
                </InstantLink>
              </li>
              <li>
                <InstantLink href={"/newarrival/page=1"}>
                  New Arrivals
                </InstantLink>
              </li>
              {/* <li>
                <InstantLink href={"/loginCheckoutPage"}>
                  Limited Editions
                </InstantLink>
              </li> */}
              <li>
                <InstantLink href={"/gift"}>Gift Registry</InstantLink>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div className="col-md-3 mb-4">
            <h6 className="footer-link">Information</h6>
            <ul className="list-unstyled small">
              <li>
                <InstantLink href={"/career"}>Careers</InstantLink>
              </li>

              <li>
                <InstantLink href={"/information/international-delivery"}>
                  International Delivery
                </InstantLink>
              </li>

              <li>
                <InstantLink href={"/chandeliers"}>Chandeliers</InstantLink>
              </li>

              <li>
                <InstantLink href={"/about/trade-partner"}>
                  Trade Enquiries
                </InstantLink>
              </li>
              <li>
                <InstantLink href={"/information/terms-conditions"}>
                  Terms & Conditions
                </InstantLink>
              </li>
              <li>
                <InstantLink href={"/information/privacy-policy"}>
                  Privacy Policy & Data Protection
                </InstantLink>
              </li>
              <li>
                {/* <a href={"/information/cookies-policy"}>Cookies Policy</a> */}
              </li>
              <li>
                <InstantLink href={"/information/CookiesPolicy"}>
                  Cookies Policy
                </InstantLink>
              </li>
              <li>
                <InstantLink href={"/information/return-policy"}>
                  Returns & Cancellations
                </InstantLink>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="col-md-3 mb-4">
            <h6 className="footer-link">Contact</h6>
            <ul className="list-unstyled small">
              <li>
                <InstantLink href={"/contactus/contact-details"}>
                  Store Locator & Contact
                </InstantLink>
              </li>
              <li>
                <InstantLink href={"/contactus/contact-form"}>
                  Contact Form
                </InstantLink>
              </li>
            </ul>
            <h6 className="footer-link mt-3 mb-3">Get Social</h6>
            <div className="d-flex gap-2 footer-social-icon  mb-2">
              <a
                href="https://www.facebook.com/mdinaglassmalta"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/assets/fb.png"
                  className="footer-images"
                  alt="Facebook"
                  width={38}
                  height={38}
                  loading="lazy"
                />
              </a>

              <a
                href="https://www.instagram.com/mdinaglass/#"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/assets/insta.webp"
                  className="footer-images"
                  alt="Instagram"
                  width={38}
                  height={38}
                  loading="lazy"
                />
              </a>

              <a
                href="https://x.com/MDINAGLASSMALTA"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/assets/twitter.webp"
                  className="footer-images"
                  alt="Twitter"
                  width={38}
                  height={38}
                  loading="lazy"
                />
              </a>

              <Image
                src="/assets/linkedin.png"
                className="footer-images"
                alt="Linkedin"
                width={38}
                height={38}
                loading="lazy"
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
