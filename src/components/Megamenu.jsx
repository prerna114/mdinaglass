"use client";
import { getMenuCategories } from "@/api/menuAPI";
import { createUrl } from "@/constant";
import { ProductLists } from "@/store/product";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import InstantLink from "./InstantClick";

const MegaMenu = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const { heading, setHeading, setPagination } = ProductLists((state) => state);

  const [showMenu, setShowMenu] = useState(true);
  const { menu, setMenu } = useAuthStore((state) => state);

  useEffect(() => {
    if (showMenu) {
      if (typeof window !== "undefined") {
        const timeout = setTimeout(() => {
          const dropdownElements = document.querySelectorAll(".dropdown");

          dropdownElements.forEach((dropdown) => {
            const showMenu = () => {
              const menu = dropdown.querySelector(".dropdown-menu");
              if (menu) menu.classList.add("show");
            };
            const hideMenu = () => {
              const menu = dropdown.querySelector(".dropdown-menu");
              if (menu) menu.classList.remove("show");
            };

            dropdown.addEventListener("mouseover", showMenu);
            dropdown.addEventListener("mouseout", hideMenu);

            // Optional: Cleanup on unmount
            return () => {
              dropdown.removeEventListener("mouseover", showMenu);
              dropdown.removeEventListener("mouseout", hideMenu);
            };
          });
        }, 100); // small delay
        return () => clearTimeout(timeout);
      }
    }
  }, [showMenu, categoriesData]);

  const getMenu = async () => {
    const data = await getMenuCategories();
    if (data.status == 200) {
      setCategoriesData(data.data[0]?.children);
      console.log("GetMenuCategory", data.data);
      localStorage.setItem("cart", JSON.stringify(data.data[0]?.children));
      setMenu(data.data[0]?.children);
      if (data.data[0]?.children) {
        setShowMenu(true);
      }
    }
  };

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
      getMenu();
    }
    // getMenu();
    // }
  }, []);

  console.log("Catrry data", Array.isArray(categoriesData), menu);
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div
        style={{
          maxWidth: "1700px !important",
        }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#megaMenu"
          aria-controls="megaMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/*===================  Dynamic header ================= */}
        <div className="collapse navbar-collapse" id="megaMenu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {categoriesData.map((category) => (
              <li
                className="nav-item dropdown position-static"
                key={category.id}
              >
                {category.status == 1 && (
                  <InstantLink
                    className="nav-link"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    href={createUrl(
                      [category.id],

                      category?.slug
                    )}
                    onClick={() => {
                      setHeading(category.name);
                      setPagination({
                        per_page: 15,
                        page: 1,
                        sort_by: "price",
                        sort_dir: "asc",
                      });
                      createUrl(
                        [category.id],

                        category?.slug
                      );
                    }}
                  >
                    {category.name}
                  </InstantLink>
                )}
                <div className="dropdown-menu w-100 mt-0 p-4 border-0 shadow">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 col-12 mb-3">
                        <ul className="list-unstyled">
                          {category.children
                            // .slice() // make a shallow copy to avoid mutating original
                            // .reverse()
                            .map((child) => {
                              return (
                                <div key={child.id}>
                                  {child.status == 1 && (
                                    <li key={child.id}>
                                      <InstantLink
                                        href={createUrl(
                                          [
                                            category.id,

                                            child?.translations[0]?.category_id,
                                          ],

                                          child?.translations[0]?.slug
                                        )}
                                        // href={"#"}
                                        className="dropdown-item"
                                        onClick={() => {
                                          console.log("Child name", category);
                                          console.log(
                                            "rohanrohanrohan",
                                            createUrl(
                                              [
                                                category.id,
                                                child?.translations[0]
                                                  ?.category_id,
                                              ],
                                              child?.translations[0]?.slug
                                            )
                                          );
                                          setPagination({
                                            per_page: 15,
                                            page: 1,
                                            sort_by: "price",
                                            sort_dir: "asc",
                                          });
                                          setHeading(child.name);
                                        }}
                                      >
                                        {child.name}
                                      </InstantLink>
                                    </li>
                                  )}
                                </div>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}

            {/* ============== Customer header ================== */}
            {!showMenu && (
              <>
                <li className="nav-item dropdown position-static">
                  <a
                    className="nav-link"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    FUSION
                  </a>
                  <div className="dropdown-menu w-100 mt-0 p-4 border-0 shadow">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 col-12 mb-3">
                          <ul className="list-unstyled">
                            <li>
                              <Link href="#" className="dropdown-item">
                                Pictures & Scenes
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Maltese Fishing Boat
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Coasters
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Clocks
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Plates, Dishes & Bowls
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Family Crests
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Town Crests
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Individual House Numbers
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="nav-item dropdown position-static">
                  <a
                    className="nav-link"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    LAMPWORK
                  </a>
                  <div className="dropdown-menu w-100 mt-0 p-4 border-0 shadow">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 col-12 mb-3">
                          <ul className="list-unstyled">
                            <li>
                              <Link href="#" className="dropdown-item">
                                Figurines
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Objects
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="nav-item dropdown position-static">
                  <a
                    className="nav-link"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    JEWELLERY
                  </a>
                  <div className="dropdown-menu w-100 mt-0 p-4 border-0 shadow">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 col-12 mb-3">
                          <ul className="list-unstyled">
                            <li>
                              <Link href="#" className="dropdown-item">
                                Bracelets
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Earrings
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Necklaces
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Sets
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="nav-item dropdown position-static">
                  <a
                    className="nav-link"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    CHRISTMAS
                  </a>
                  <div className="dropdown-menu w-100 mt-0 p-4 border-0 shadow">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 col-12 mb-3">
                          <ul className="list-unstyled">
                            <li>
                              <Link href="#" className="dropdown-item">
                                Cone Angels & Tree Topper (New)
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Baubles
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Personalised Baubles
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Christmas Trees
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Festive Sculptures
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Decorative Angels
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Decorative Cribs & Globe
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Christmas Fusion
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Tableware
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="nav-item dropdown position-static">
                  <a
                    className="nav-link"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    VALENTINE's
                  </a>
                  <div className="dropdown-menu w-100 mt-0 p-4 border-0 shadow">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 col-12 mb-3">
                          <ul className="list-unstyled">
                            <li>
                              <Link href="#" className="dropdown-item">
                                Flowers
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Sculptures
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Solid Hearts
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Bauble Hearts
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Blocks
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Coasters
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Cocktail Stirrers
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Jewellery
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="nav-item  position-static">
                  <a
                    className="nav-link"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Legacy (Book)
                  </a>
                </li>

                <li className="nav-item  position-static">
                  <a
                    className="nav-link"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Gift Vouchers
                  </a>
                </li>

                <li className="nav-item dropdown position-static">
                  <a
                    className="nav-link"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Sale
                  </a>
                  <div className="dropdown-menu w-100 mt-0 p-4 border-0 shadow">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 col-12 mb-3">
                          <ul className="list-unstyled">
                            <li>
                              <Link href="#" className="dropdown-item">
                                Vases
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Decorative Bowls
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Candleholders
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                Jewellery
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="nav-item  position-static">
                  <a
                    className="nav-link"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Shop By Ranges
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MegaMenu;
