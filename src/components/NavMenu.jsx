import { createUrl } from "@/constant";
import { useAuthStore } from "@/store/useAuthStore";
import { buildProductUrl } from "@/utils/buildProductUrl";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { ProductLists } from "@/store/product";
import dynamic from "next/dynamic";
const InstantLink = dynamic(() => import("./InstantClick"), { ssr: false });

const ResponsiveNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [showMenu, setShowMenu] = useState(true);
  const { setMenu } = useAuthStore((state) => state);
  const { setPagination } = ProductLists((state) => state);

  const getMenuCategories = async () => {
    console.log("Get Catrogires is clling");
    const myHeaders = new Headers();
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const res = await fetch(
        "https://mdinaglasses.blackbullsolution.com/api/menu-categories",
        requestOptions
      );
      const data = await res.json(); // ✅ this is what you need

      console.log("THe data", data[0]?.children);
      setCategoriesData(data[0]?.children);
      localStorage.setItem("cart", JSON.stringify(data[0]?.children));
      setMenu(data[0]?.children);
      if (data[0]?.children) {
        setShowMenu(true);
      }
    } catch (error) {
      console.log("eror", error);
    }
  };
  // const createUrl = (categoryID, slug) => {
  //   // console.log("dsada", slu g, categoryID);
  //   let sortOrder = "asc";
  //   let limit = 15;
  //   let page = 1;
  //   return buildProductUrl(categoryID, sortOrder, limit, page, slug);
  // };

  useEffect(() => {
    // if(localStorage.getItem('cart')){

    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setShowMenu(true);

        setCategoriesData(parsed);
        setMenu(parsed);
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    } else {
      getMenuCategories();
    }
    // }
  }, []);
  console.log("categoriesData", categoriesData);
  return (
    <nav className="responsive-nav border-top">
      {/* Desktop Nav */}
      <nav className="border-top navContainer">
        <div className={`${isOpen ? "d-none" : "d-none"} d-md-none d-lg-block`}>
          <div className="row">
            <div className="col-9 d-flex justify-content-end flex-wrap">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about/about-mdina-glass" },
                {
                  label: "All Products",
                  href: createUrl("all", "all-product"),
                },
                { label: "New Arrivals", href: "/cartpage" },
                { label: "Limited Editions", href: "/loginCheckoutPage" },
                { label: "WishList", href: "/wishlist" },

                { label: "Gift Registry", href: "/giftRegistry" },
              ].map(({ label, href }) => (
                <InstantLink
                  key={label}
                  href={href}
                  className="navlink nav-link mx-4"
                  onClick={() => {
                    setPagination({
                      per_page: 15,
                      page: 1,
                      sort_by: "price",
                      sort_dir: "asc",
                    });
                  }}
                >
                  {label}
                </InstantLink>
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
                  aria-label="Search"
                >
                  <Search
                    // className="text-muted  hide-desk"
                    // color="#888888"
                    size={25}
                  />
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
        <Link href={"/"} className=" mb-md-0 mobile-logo-style">
          <img src="/assets/logo.png" alt="Mdina Glass Logo" />
        </Link>
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
            className="menu-item"
            onClick={() => setShowShop((prev) => !prev)}
          >
            Shop
          </div>
          {showShop && (
            <div className="mobile-nav d-md-flex d-lg-none">
              <div className="row supmenu navrow">
                <div className="col-12 d-flex  flex-wrap">
                  {/* {[
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
                  ))} */}
                  {categoriesData?.map((item) => (
                    <Link
                      key={item.id}
                      href={createUrl(item.id, item?.slug)}
                      onClick={() => {
                        console.log("item", item);
                        setIsOpen(false);
                        setPagination({
                          per_page: 15,
                          page: 1,
                          sort_by: "price",
                          sort_dir: "asc",
                        });
                      }}
                      className="navlink nav-link mx-3"
                    >
                      {item?.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other items */}
          <Link
            href={"/loginCheckoutPage"}
            className="menu-item"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            My Account
          </Link>
          <Link
            href={"/about/about-mdina-glass"}
            className="menu-item"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            About Us
          </Link>
          <a href="#" className="menu-item">
            Contact Detail & Store Locator
          </a>
          <a href="#" className="menu-item">
            Cookies Policy
          </a>
          <Link
            className="menu-item"
            href={"/wishlist"}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            WishList
          </Link>
          <Link
            href={"/giftRegistry"}
            className="menu-item"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Gift Registry
          </Link>
        </div>
      )}
    </nav>
  );
};

export default ResponsiveNav;
