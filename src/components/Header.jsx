"use client";

import { useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { ShoppingCart, User, Bell } from "lucide-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaPlay, FaPause } from "react-icons/fa";
import ResponsiveNav from "./NavMenu";
import { CiSearch } from "react-icons/ci";
import Video from "./Video";
import Link from "next/link";

const Header = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const slides = [
    {
      type: "video",
      src: "/videos/hero-vdo.mp4",
    },
  ];

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsVideoPlaying(false);
    if (videoRef.current) videoRef.current.pause();
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsVideoPlaying(false);
    if (videoRef.current) videoRef.current.pause();
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const current = slides[currentSlide];

  return (
    <>
      {/* Top Banner */}
      {isBannerVisible && (
        <div className="text-black text-center  position-relative  banner">
          <span>
            Shopping Outside Malta? Safe & Secure Worldwide Shipping Available
          </span>
          {/* <FaTimes
            className="position-absolute"
            style={{
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
            onClick={() => setIsBannerVisible(false)}
          /> */}
        </div>
      )}

      {/* Navigation Links */}
      {/* <nav className="border-top navContainer">
        <div className="container">
          <div className={`${isMenuOpen ? "d-block" : "d-none"} d-md-block`}>
            <div className="row navrow">
              <div className="col-12 d-flex justify-content-center flex-wrap">
                {[
                  "Home",
                  "About Us",
                  "All Products",
                  "New Arrivals",
                  "Limited Editions",
                  "Gift Registry",
                ].map((item) => (
                  <a key={item} href="#" className="navlink nav-link mx-4 ">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav> */}

      <ResponsiveNav />

      {/* Logo + Search + Currency + Signup */}

      <div
        style={{
          display: "flex",
        }}
      >
        <div
          className="container mobile-header-bg py-3 d-flex flex-column flex-md-row align-items-center justify-content-between"
          style={{
            maxWidth: "1700px !important",
          }}
        >
          {/* Logo */}
          <div className="mb-3 mb-md-0 mobi-logo">
            <img
              src="assets/logo.png"
              alt="Mdina Glass Logo"
              style={{ height: "90px" }}
            />
          </div>

          {/* Search Field */}
          <div className="search-bar-row">
            {/* <div className="inputContainer">
              <button
                className="btn btn-outline-secondary"
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
            </div> */}

            {/* Currency & Sign Up */}

            <div style={{ display: "flex" }} className="mobi-design">
              <div className="d-flex align-items-center justify-content-center justify-content-md-end">
                <div className=" align-items-center mobile-cart">
                  <Bell
                    className="text-muted me-1"
                    color="#888888"
                    style={{
                      width: "22px",
                      height: "22px",
                      margin: "5px",
                    }}
                  />
                  <ShoppingCart
                    color="#888888"
                    className="text-muted"
                    style={{ width: "22px", height: "22px", margin: "5px" }}
                  />
                  <User
                    color="#888888"
                    className="text-muted "
                    style={{ width: "22px", height: "22px", margin: "5px" }}
                  />
                </div>
              </div>

              {/* ========= Desktop Cart ===== */}
              <div className="desktop-cart">
                <div className=" align-items-center hide-mobi-cart  justify-content-center justify-content-md-end">
                <div className="d-flex align-items-center svg-design ">
                  <Bell
                    className="text-muted me-1"
                    color="#888888"
                    style={{
                      width: "45px",
                      height: "22px",
                      margin: "5px 0px 5px 5px",
                      
                    }}
                  />

                  <Link href={"/cartpage"}>
                
                <div className="shopping-cart">
                
                  <ShoppingCart
                    color="#888888"
                    className="text-muted"
                    style={{ width: "45px", height: "22px", margin: "5px 0px 5px 5px" }}
                  />
                      <span>1</span>
               </div>  
                        </Link>

                <Link href={"/loginCheckoutPage"}>
                      <User
                        color="#888888"
                        className="text-muted "
                        style={{
                          width: "45px",
                          height: "22px",
                          margin: "5px 0px 5px 5px",
                        }}
                      />
                    </Link>
                </div>
                
                
                  <div
                    style={{
                      border: "1.2px solid #005E84",
                      // borderRadius: "5px",
                      // padding: "5px",
                      display: "flex",
                      alignItems: "center",
                      marginRight: "5px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#005E84",
                        height: "46px",
                        width: "33px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src="assets/flag.png"
                        alt="Mdina Glass Logo"
                        style={{ height: "22px", width: "22px" }}
                      />
                    </div>

                    <select
                      className="form-select me-2 searchContainer"
                      style={{
                        width: "80px",
                        height: "46px",
                        border: "none",
                        fontFamily: "'Quicksand', sans-serif",
                        color: "#005E84",
                        paddingLeft: "5px",
                        fontSize: "18px",
                        margin: "0 !important"
                      }}
                    >
                      <option>EUR</option>
                      <option>USD</option>
                      <option>GBP</option>
                    </select>
                  </div>

                  <button
                    className="signUp btn "
                    style={{
                      fontFamily: "'Quicksand', sans-serif",
                      backgroundColor: "#005e84",
                      color: "#fff",
                      width: "105px",
                      height: "46px",
                    }}
                  >
                    SIGN UP
                  </button>
                </div>
              </div>
              {/* ========= Mobile Cart ===== */}
              <div className="mobile-cart">
                <div className=" align-items-center hide-desk-cart  justify-content-center justify-content-md-end">
                  <select
                    className="form-select  searchContainer"
                    style={{
                      width: "70px",
                      // height: "46px",
                      border: "none",
                      fontFamily: "'Quicksand', sans-serif",
                      color: "#005E84",
                      paddingLeft: "5px",
                      fontSize: "14px",
                      padding: "0 !important",
                    }}
                  >
                    <option>EUR</option>
                    <option>USD</option>
                    <option>GBP</option>
                  </select>
                <div>
                <a href="#"> SIGN UP</a>
               </div>
                  
                </div>
               
              </div>

          
              <div className="icon-section" onClick={toggleSearch}>
                <CiSearch
                  className="text-muted  hide-desk"
                  color="#888888"
                  style={{
                    width: "22px",
                    height: "22px",
                    margin: "5px",
                  }}
                />
             
                
              </div>
            </div>
              <div className="search-text">
                 
            {searchVisible && (
                  <input
                    type="text"
                    // className="form-control"
                    placeholder="Search"
                    className="inputSubContainer"
                  />
                )}
                 </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="category-nav border-bottom py-2 d-none d-md-none d-lg-block">
        <div
          className=" SubnavContainer"
          
        >
          <div className="d-flex justify-content-center flex-wrap">
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
                "Shop by Ranges"

            ].map((cat) => (
              <a key={cat} href="#" className="nav-link px-2">
                {cat}
              </a>
            ))}
          </div>
        </div>
      </div>









 












      {/* Video Banner Section */}
      {/* <div className="video-banner position-relative text-center">
  <video
    className="w-100"
    style={{ maxHeight: '500px', objectFit: 'cover' }}
    src="/videos/hero-vdo.mp4" // Replace this with your dummy video path
    muted
    autoPlay="false"
    loop
    playsInline
  ></video>

  <button
    className="btn btn-primary position-absolute top-50 start-50 translate-middle"
    style={{ borderRadius: '50%', width: '60px', height: '60px', fontSize: '1.5rem' }}
    onClick={() => alert('Play/Pause logic can be added here')}
  >
    ▶
  </button>
</div> */}

    </>
  );
};

export default Header;