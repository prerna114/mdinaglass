"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { buildProductUrl } from "@/utils/buildProductUrl";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Link from "next/link";
import { useEffect, useState } from "react";

const MegaMenu = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const { setMenu } = useAuthStore((state) => state);

  useEffect(() => {
    if (showMenu) {
      if (typeof window !== "undefined") {
        const dropdownElements = document.querySelectorAll(".dropdown");

        console.log("dropdown-menu", dropdownElements);

        dropdownElements.forEach((dropdown) => {
          dropdown.addEventListener("mouseover", function () {
            const menu = this.querySelector(".dropdown-menu");
            if (menu) menu.classList.add("show");
          });
          dropdown.addEventListener("mouseout", function () {
            const menu = this.querySelector(".dropdown-menu");
            if (menu) menu.classList.remove("show");
          });
        });
      }
    }
    // Enable Bootstrap dropdown on hover
  }, [showMenu]);

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

      console.log("data", data[0]?.children);
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

  const createUrl = (categoryID, slug) => {
    // console.log("dsada", slu g, categoryID);
    let sortOrder = "asc";
    let limit = 15;
    let page = 1;
    return buildProductUrl(categoryID, sortOrder, limit, page, slug);
  };
  // console.log("Catrry data", categoriesData, categoriesData?.length);
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
            {categoriesData.map((category) =>
              category.children && category.children.length > 0 ? (
                <li
                  className="nav-item dropdown position-static"
                  key={category.id}
                >
                  <a
                    className="nav-link"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {category.name}
                  </a>
                  <div className="dropdown-menu w-100 mt-0 p-4 border-0 shadow">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 col-12 mb-3">
                          <ul className="list-unstyled">
                            {category.children
                              .slice() // make a shallow copy to avoid mutating original
                              .reverse()
                              .map((child) => (
                                <li key={child.id}>
                                  <Link
                                    href={createUrl(
                                      child?.translations[0]?.category_id,
                                      child?.translations[0]?.slug
                                    )}
                                    // href={"#"}
                                    className="dropdown-item"
                                    onClick={() => {
                                      console.log(
                                        "Child name",
                                        child?.translations[0]?.slug
                                      );
                                      createUrl(
                                        child?.translations[0]?.category_id,

                                        child?.translations[0]?.slug
                                      );
                                    }}
                                  >
                                    {child.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ) : null
            )}

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

// 'use client';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// const MegaMenu = () => { useEffect(() => {
//     // Enable Bootstrap dropdown on hover
//     if (typeof window !== 'undefined') {
//       const dropdownElements = document.querySelectorAll('.dropdown');

//       dropdownElements.forEach((dropdown) => {
//         dropdown.addEventListener('mouseover', function () {
//           const menu = this.querySelector('.dropdown-menu');
//           if (menu) menu.classList.add('show');
//         });
//         dropdown.addEventListener('mouseout', function () {
//           const menu = this.querySelector('.dropdown-menu');
//           if (menu) menu.classList.remove('show');
//         });
//       });
//     }
//   }, []);
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light">
//       <div   style={{
//             maxWidth: "1700px !important",
//           }}>

//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#megaMenu" aria-controls="megaMenu" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="megaMenu">
//           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//             <li className="nav-item dropdown position-static">
//               <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
//              GLASS BLOWING & SCULPTING
//               </a>
//               <div className="dropdown-menu w-100 mt-0 p-4 border-0 shadow">
//                 <div className="container">
//                   <div className="row">
//                     <div className="col-lg-12 col-12 mb-3">

//                       <ul className="list-unstyled">
//                         <li><Link href="#" className="dropdown-item">Bathroom Accessories</Link></li>
//                         <li><Link href="#" className="dropdown-item">Book Ends</Link></li>
//                         <li><Link href="#" className="dropdown-item">Vases</Link></li>
//                           <li><Link href="#" className="dropdown-item">Decorative Bowls</Link></li>
//                             <li><Link href="#" className="dropdown-item">Lanterns</Link></li>
//                               <li><Link href="#" className="dropdown-item">Lighting</Link></li>
//                               <li><Link href="#" className="dropdown-item">Sculptures</Link></li>
//                         <li><Link href="#" className="dropdown-item">Solids</Link></li>
//                         <li><Link href="#" className="dropdown-item">Tumblers</Link></li>
//                           <li><Link href="#" className="dropdown-item">Jugs </Link></li>
//                             <li><Link href="#" className="dropdown-item">Carafes</Link></li>
//                               <li><Link href="#" className="dropdown-item">Serving Bowls</Link></li>
//                               <li><Link href="#" className="dropdown-item">Pestle & Mortars</Link></li>
//                         <li><Link href="#" className="dropdown-item">Oil & Vinegar Bottles</Link></li>
//                         <li><Link href="#" className="dropdown-item">Scented Candleholders</Link></li>
//                           <li><Link href="#" className="dropdown-item">Candleholders</Link></li>
//                             <li><Link href="#" className="dropdown-item">Candlesticks & Candelabras</Link></li>
//                               <li><Link href="#" className="dropdown-item">Perfume Bottles</Link></li>
//                                <li><Link href="#" className="dropdown-item">Ashtrays</Link></li>
//                                 <li><Link href="#" className="dropdown-item">Paperweights</Link></li>
//                                  <li><Link href="#" className="dropdown-item">Flowers</Link></li>
//                                   <li><Link href="#" className="dropdown-item">Key Rings</Link></li>
//                                    <li><Link href="#" className="dropdown-item">Letter Openers</Link></li>
//                                     <li><Link href="#" className="dropdown-item">Wine Stoppers</Link></li>
//                                      <li><Link href="#" className="dropdown-item">Egg Holders</Link></li>
//                                       <li><Link href="#" className="dropdown-item">Shots</Link></li>

//                       </ul>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             </li>
//             <li className="nav-item dropdown position-static">
//               <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
//              FUSION
//               </a>
//               <div className="dropdown-menu w-100 mt-0 p-4 border-0 shadow">
//                 <div className="container">
//                   <div className="row">
//                     <div className="col-lg-12 col-12 mb-3">

//                       <ul className="list-unstyled">
//                         <li><Link href="#" className="dropdown-item">Pictures & Scenes</Link></li>
//                         <li><Link href="#" className="dropdown-item">Maltese Fishing Boat</Link></li>
//                         <li><Link href="#" className="dropdown-item">Coasters</Link></li>
//                           <li><Link href="#" className="dropdown-item">Clocks</Link></li>
//                             <li><Link href="#" className="dropdown-item">Plates, Dishes & Bowls</Link></li>
//                               <li><Link href="#" className="dropdown-item">Family Crests</Link></li>
//                               <li><Link href="#" className="dropdown-item">Town Crests</Link></li>
//                         <li><Link href="#" className="dropdown-item">Individual House Numbers</Link></li>
//                       </ul>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             </li>

//                <li className="nav-item dropdown position-static">
//               <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
//              LAMPWORK
//               </a>
//               <div className="dropdown-menu w-100 mt-0 p-4 border-0 shadow">
//                 <div className="container">
//                   <div className="row">
//                     <div className="col-lg-12 col-12 mb-3">

//                       <ul className="list-unstyled">
//                         <li><Link href="#" className="dropdown-item">Figurines</Link></li>
//                         <li><Link href="#" className="dropdown-item">Objects</Link></li>

//                       </ul>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             </li>

//                  <li className="nav-item dropdown position-static">
//               <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
//            JEWELLERY
//               </a>
//               <div className="dropdown-menu w-100 mt-0 p-4 border-0 shadow">
//                 <div className="container">
//                   <div className="row">
//                     <div className="col-lg-12 col-12 mb-3">

//                       <ul className="list-unstyled">
//                         <li><Link href="#" className="dropdown-item">Bracelets</Link></li>
//                         <li><Link href="#" className="dropdown-item">Earrings</Link></li>
//                          <li><Link href="#" className="dropdown-item">Necklaces</Link></li>
//                           <li><Link href="#" className="dropdown-item">Sets</Link></li>

//                       </ul>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             </li>

//                   <li className="nav-item dropdown position-static">
//               <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
//            CHRISTMAS
//               </a>
//               <div className="dropdown-menu w-100 mt-0 p-4 border-0 shadow">
//                 <div className="container">
//                   <div className="row">
//                     <div className="col-lg-12 col-12 mb-3">

//                       <ul className="list-unstyled">
//                         <li><Link href="#" className="dropdown-item">Cone Angels & Tree Topper (New)</Link></li>
//                         <li><Link href="#" className="dropdown-item">Baubles</Link></li>
//                          <li><Link href="#" className="dropdown-item">Personalised Baubles</Link></li>
//                           <li><Link href="#" className="dropdown-item">Christmas Trees</Link></li>
//                           <li><Link href="#" className="dropdown-item">Festive Sculptures</Link></li>
//                           <li><Link href="#" className="dropdown-item">Decorative Angels</Link></li>
//                           <li><Link href="#" className="dropdown-item">Decorative Cribs & Globe</Link></li>
//                           <li><Link href="#" className="dropdown-item">Christmas Fusion</Link></li>
//                           <li><Link href="#" className="dropdown-item">Tableware</Link></li>

//                       </ul>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             </li>

//                  <li className="nav-item dropdown position-static">
//               <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
//                VALENTINE's
//               </a>
//               <div className="dropdown-menu w-100 mt-0 p-4 border-0 shadow">
//                 <div className="container">
//                   <div className="row">
//                     <div className="col-lg-12 col-12 mb-3">

//                       <ul className="list-unstyled">
//                         <li><Link href="#" className="dropdown-item">Flowers</Link></li>
//                         <li><Link href="#" className="dropdown-item">Sculptures</Link></li>
//                          <li><Link href="#" className="dropdown-item">Solid Hearts</Link></li>
//                           <li><Link href="#" className="dropdown-item">Bauble Hearts</Link></li>
//                           <li><Link href="#" className="dropdown-item">Blocks</Link></li>
//                           <li><Link href="#" className="dropdown-item">Coasters</Link></li>
//                           <li><Link href="#" className="dropdown-item">Cocktail Stirrers</Link></li>
//                           <li><Link href="#" className="dropdown-item">Jewellery</Link></li>

//                       </ul>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             </li>

//                  <li className="nav-item  position-static">
//               <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
//               Legacy (Book)
//               </a></li>

//                 <li className="nav-item  position-static">
//               <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
//                Gift Vouchers
//               </a>

//             </li>

//                 <li className="nav-item dropdown position-static">
//               <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
//               Sale
//               </a>
//               <div className="dropdown-menu w-100 mt-0 p-4 border-0 shadow">
//                 <div className="container">
//                   <div className="row">
//                     <div className="col-lg-12 col-12 mb-3">

//                       <ul className="list-unstyled">
//                         <li><Link href="#" className="dropdown-item">Vases</Link></li>
//                         <li><Link href="#" className="dropdown-item">Decorative Bowls</Link></li>
//                          <li><Link href="#" className="dropdown-item">Candleholders</Link></li>
//                           <li><Link href="#" className="dropdown-item">Jewellery</Link></li>

//                       </ul>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             </li>

//  <li className="nav-item  position-static">
//               <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//               Shop By Ranges
//               </a>

//             </li>

//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default MegaMenu;
