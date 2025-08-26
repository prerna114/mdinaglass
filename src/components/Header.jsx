"use client";

import { useState, useRef, useEffect } from "react";

import { ShoppingCart, User, Bell } from "lucide-react";

import ResponsiveNav from "./NavMenu";
import { Search } from "lucide-react";

import Link from "next/link";
import { useCartStore } from "@/store";
import { useAuthStore } from "@/store/useAuthStore";

import Image from "next/image";
import { getCartListing, testCartAPi, getCartGuest } from "@/api/CartApi";
import InstantLink from "./InstantClick";
import { ProductLists } from "@/store/product";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const Banner = dynamic(() => import("./HeaderComponent/Banner"), {
  ssr: true,
  loading: () => <div>loading....</div>,
});
// import Banner from "./HeaderComponent/Banner";

const Header = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const setHeading = ProductLists((state) => state.setHeading);
  const router = useRouter();

  const [searchVisible, setSearchVisible] = useState(false);
  const { addToCart, cart, clearCart, setCartTotal, setAllCart } = useCartStore(
    (state) => state
  );
  const { login, isLogin, logout, setLoginState } = useAuthStore(
    (state) => state
  );
  const isUserLogin = () => {
    const data = localStorage.getItem("token");
    if (data) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  };

  const slides = [
    {
      type: "video",
      src: "/videos/hero-vdo.mp4",
    },
  ];

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
  };

  const logoutUser = () => {
    // localStorage.clear();
    // clearCart();
    logout();
  };

  const getCart = async () => {
    const tokenData = localStorage.getItem("token");
    const parsed = tokenData ? JSON.parse(tokenData) : null;
    const accessToken = parsed?.token;
    console.log("accessToken", accessToken);
    if (accessToken && accessToken !== "undefined") {
      const data = await getCartListing();
      console.log("getCart Header123", data.data?.cart);

      if (data?.status == 200) {
        clearCart();
        setAllCart(data?.data);
        // console.log("getCart Header", data.data);
        console.log("getCart Header ", data.data.items);
        setCartTotal(data?.data?.cart?.grand_total);

        // addToCart(data.result.items);
        data.data.items.forEach((item) => {
          addToCart(item);
        });
      }
    } else {
      const tokenData = localStorage.getItem("guestToken");
      console.log("guestToken", tokenData);

      if (tokenData) {
        getGUesstCart();
      }
    }
  };

  const getGUesstCart = async () => {
    const tokenData = localStorage.getItem("guestToken");
    console.log("guestToken", tokenData);
    if (tokenData) {
      const response = await getCartGuest(tokenData);
      // console.log("getCartGuest", );
      if (response.status == 200) {
        setAllCart(response?.data);

        setCartTotal(response?.data?.cart[0]?.grand_total);

        clearCart();
        response?.data?.cart[0]?.items?.forEach((item) => {
          addToCart(item);
        });
      }
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const current = slides[currentSlide];

  useEffect(() => {
    isUserLogin();
  }, []);

  // console.log("userLoginuserLogin", userLogin);
  return (
    <>
      {/* Top Banner */}
      {isBannerVisible && (
        // <div className="text-black text-center  position-relative  banner">
        //   <span
        //     style={{
        //       display: "flex",
        //       justifyContent: "center",
        //       alignItems: "center",
        //     }}
        //   >
        //     Shopping Outside Malta? Safe & Secure Worldwide Shipping Available
        //     <div
        //       style={{
        //         width: "20px",
        //         height: "20px",
        //         // right: "422px",
        //         transform: "translateY(-50%)",
        //         // position: "absolute",
        //         cursor: "pointer",
        //         // top: "46%",
        //         marginLeft: "15px",
        //         marginTop: "19px",
        //       }}
        //       onClick={() => setIsBannerVisible(false)}
        //     >
        //       <img
        //         src="/assets/close_white.png"
        //         className="w-100"
        //         style={{
        //           width: "20px",
        //           height: "20px",
        //         }}
        //         alt="Close Banner"
        //       />
        //     </div>
        //   </span>

        //   {/* <FaTimes
        //     className="position-absolute"
        //     style={{
        //       top: "50%",
        //       right: "10px",
        //       transform: "translateY(-50%)",
        //       cursor: "pointer",
        //     }}
        //     size={10}
        //     onClick={() => setIsBannerVisible(false)}
        //   /> */}

        //   {/* <IoMdCloseCircleOutline
        //     className="position-absolute"
        //     style={{
        //       top: "50%",
        //       right: "10px",
        //       transform: "translateY(-50%)",
        //       cursor: "pointer",
        //       fontSize: "24px",
        //     }}
        //     onClick={() => setIsBannerVisible(false)}
        //   /> */}
        // </div>
        <Banner />
      )}

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
          <Link href={"/"} className="mb-3 mb-md-0 mobi-logo">
            <Image
              src="/assets/logo.png"
              alt="Mdina Glass Logo"
              style={{ height: "90px" }}
              width={230}
              height={90}
              priority={true}
            />
          </Link>

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
                  <InstantLink href={"/cartpage"}>
                    <ShoppingCart
                      color="#888888"
                      className="text-muted"
                      style={{ width: "22px", height: "22px", margin: "5px" }}
                    />

                    <span
                      style={{
                        color: "#fff",
                        background: "#005e84",
                        borderRadius: "100%",
                        width: "16px",
                        padding: "1px 5px",
                        fontSize: "10px",
                        position: "absolute",
                        // top: "1%",
                        transform: "translateX(-12px)",
                        height: "17px",
                      }}
                    >
                      {cart?.length}
                    </span>
                  </InstantLink>
                  <InstantLink
                    href={"/loginCheckoutPage"}
                    aria-label="Go to login or checkout page"
                  >
                    <User
                      color="#888888"
                      className="text-muted "
                      style={{ width: "22px", height: "22px", margin: "5px" }}
                    />
                  </InstantLink>
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
                    <InstantLink href={"/cartpage"}>
                      <div className="shopping-cart">
                        <ShoppingCart
                          color="#888888"
                          className="text-muted"
                          style={{
                            width: "45px",
                            height: "22px",
                            margin: "5px 0px 5px 5px",
                          }}
                        />
                        <span>{cart?.length}</span>
                      </div>
                    </InstantLink>
                    <InstantLink
                      href={"/loginCheckoutPage"}
                      aria-label="Go to login or checkout page"
                    >
                      <User
                        color="#888888"
                        className="text-muted "
                        style={{
                          width: "45px",
                          height: "22px",
                          margin: "5px 0px 5px 5px",
                        }}
                      />
                    </InstantLink>
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
                      <Image
                        src="/assets/flag.webp"
                        alt="Mdina Glass Logo"
                        // style={{ height: "22px", width: "22px" }}
                        height={22}
                        width={22}
                        loading="lazy"
                      />
                    </div>
                    <label
                      htmlFor="currency-select"
                      className="visually-hidden"
                    >
                      Select currency
                    </label>
                    <select
                      disabled
                      id="currency-select"
                      className="form-select me-2 searchContainer"
                      style={{
                        width: "80px",
                        height: "46px",
                        border: "none",
                        fontFamily: "'Quicksand', sans-serif",
                        color: "#005E84",
                        paddingLeft: "5px",
                        fontSize: "18px",
                        margin: "0 !important",
                        background: "white",
                      }}
                    >
                      <option>EUR </option>
                      <option>USD</option>
                      <option>GBP</option>
                    </select>
                  </div>

                  {isLogin ? (
                    <button
                      onClick={() => {
                        logoutUser();
                      }}
                      className="signUp btn "
                      style={{
                        fontFamily: "'Quicksand', sans-serif",
                        backgroundColor: "#005e84",
                        color: "#fff",
                        width: "105px",
                        height: "46px",
                      }}
                    >
                      LOGOUT
                    </button>
                  ) : (
                    <InstantLink
                      href={"/loginCheckoutPage"}
                      onClick={() => {
                        console.log("dsadnjsandjasnj");
                      }}
                    >
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
                    </InstantLink>
                  )}
                </div>
              </div>
              {/* ========= Mobile Cart ===== */}
              <div className="mobile-cart">
                <div className=" align-items-center hide-desk-cart  justify-content-center justify-content-md-end">
                  <select
                    className="form-select  searchContainer"
                    disabled
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
                    <option>EUR </option>
                    <option>USD</option>
                    <option>GBP</option>
                  </select>
                  <div>
                    {isLogin ? (
                      <div
                        onClick={() => {
                          logoutUser();
                        }}
                      >
                        <InstantLink href={"/loginCheckoutPage"}>
                          LOGOUT
                        </InstantLink>
                      </div>
                    ) : (
                      <InstantLink href={"/loginCheckoutPage"}>
                        SIGN UP
                      </InstantLink>
                    )}
                  </div>
                </div>
              </div>

              <div className="icon-section" onClick={toggleSearch}>
                <Search
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
                  onChange={(e) => {
                    console.log("onChnage IN", e.target.value);
                  }}
                  style={{
                    textTransform: "lowercase",
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // router.push(`/search/${e.target.value}/1`);
                      console.log("search", e.target.value);
                      // window.location.href = `/search/${e.target.value}/1/15`;
                      router.push(`/search/${e.target.value}/1/15`);

                      e.preventDefault(); // Prevent form submission if inside a form
                      console.log(
                        "Enter pressed, call API here",
                        e.target.value
                      );

                      setHeading("Search");
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="category-nav border-bottom py-2 d-none d-md-none d-lg-block">
        <div className=" SubnavContainer">
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
              "Shop by Ranges",
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
