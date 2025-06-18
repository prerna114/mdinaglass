import Link from "next/link";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const ResponsiveNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showShop, setShowShop] = useState(false);

  return (
    <nav className="responsive-nav border-top" >
      {/* Desktop Nav */}
      <nav className="border-top navContainer">
        
          <div
            className={`${isOpen ? "d-none" : "d-none"} d-md-none d-lg-block`}
          >
            <div className="row">
              <div className="col-9 d-flex justify-content-end flex-wrap">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about" },
                  { label: "All Products", href: "/product" },
                  { label: "New Arrivals", href: "/cartpage" },
                  { label: "Limited Editions", href: "/loginCheckoutPage" },
                  { label: "Gift Registry", href: "/gift" },
                ].map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="navlink nav-link mx-4"
                  >
                    {label}
                  </Link>
                ))}
              </div>

             <div className="col-3">
<div className="inputContainer">
              <button
                className="btn"
                type="button"
                style={{
                  border: "none",
                  paddingRight: "0px",
                }}
              >
                <IoIosSearch size={27} />
              </button>
              <input
                type="text"
                // className="form-control"
                placeholder="Search"
                className="inputSubContainer"
              />
            </div>
             </div>

            </div>
          </div>
        
      </nav>

      {/* Mobile Nav Toggle Button */}
      <div className="d-flex d-md-flex d-lg-none justify-content-between align-items-center py-2">
        <div className=" mb-md-0 mobile-logo-style">
          <img
            src="assets/logo.png"
            alt="Mdina Glass Logo"
            
          />
        </div>
        <button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Items */}
      {isOpen && (
        <div className="mobile-nav  d-md-flex d-lg-none">
          {/* Shop with submenu */}
          <div
            className="menu-item"  onClick={() => setShowShop((prev) => !prev)}
          >
            Shop
          </div>
          {showShop && (
            <div className="mobile-nav d-md-flex d-lg-none">
              <div className="row supmenu navrow">
                <div className="col-12 d-flex  flex-wrap">
                  {[
                    "Glass Blowing & Sculpting",
                    "Fusion",
                    "Lampwork",
                    "Jewellery",
                    "Christmas",
                    "Valentine's",
                    "Legacy (Book)",
                    "Gift Vouchers",
                    "Sale",
                    "Shop by Ranges",
                  ].map((item) => (
                    <a key={item} href="#" className="navlink nav-link mx-4">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other items */}
          <a href="#" className="menu-item">
           My Account
          </a>
          <a href="#" className="menu-item">
          About Us
          </a>
          <a href="#" className="menu-item">
            Contact Detail & Store Locator
          </a>
          <a href="#" className="menu-item">
            Cookies Policy
          </a>
          <a href="#" className="menu-item">
           Gift Registry
          </a>
        </div>
      )}
    </nav>
  );
};

export default ResponsiveNav;
