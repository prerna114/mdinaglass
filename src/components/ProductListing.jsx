"use client";

import Link from "next/link";
import React, { useState } from "react";

const ProductListing = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Glass Bead Necklace & Bracelet Set",
      price: "€26.00",
      image: "/assets/bg-image.png",
      colors: ["amber", "black"],
    },
    {
      id: 2,
      name: "Long Necklace & Bracelet with Glass Beads Set",
      price: "€27.50",
      image: "/assets/product1.png",
      colors: ["amber", "gold"],
    },
    {
      id: 3,
      name: "Glass Beads & Leather Strings Necklace & Bracelet Set",
      price: "€28.50",
      image: "/assets/product2.png",
      colors: ["brown", "natural"],
      hasOptions: true,
    },
    {
      id: 4,
      name: "Blue Glass Bead Necklace & Bracelet Set",
      price: "€26.00",
      image: "/assets/jwell-1.jpg",
      colors: ["blue", "silver"],
    },
    {
      id: 5,
      name: "Elegant Blue Glass Necklace",
      price: "€32.00",
      image: "/assets/jwell-2.jpg",
      colors: ["blue", "teal"],
    },
    {
      id: 6,
      name: "Multi-strand Blue Glass Bead Set",
      price: "€35.00",
      image: "/assets/bg-image.png",
      colors: ["blue", "white"],
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  return (
    <div className="productListing">
      {/* Filter Controls */}
      <div className="filter-are">
        <div className="row mb-4">
          <div className="side-bar-mobi">
            <div className="row">
              <div className="col-12">
                <select className="form-select mt-2">
                  <option>Glass Blowing & Sculpting</option>
                  <option>Fusion</option>
                  <option>Lampwork</option>
                  <option>Jewellery</option>
                  <option>Christmas</option>
                  <option>Valentine's</option>
                  <option>Legacy: 50 Years of Mdina Glass (Book)</option>
                  <option>Gift Vouchers</option>
                  <option>Sale</option>
                </select>
              </div>

              <div className="col-12">
                <select className="form-select mt-2">
                  <option>Select</option>
                  <option>Bathroom Accessories</option>
                  <option>Book Ends</option>
                  <option>Vases</option>
                  <option>Decorative Bowls</option>
                  <option>Lanterns</option>
                  <option>Lighting</option>
                  <option>Sculptures</option>
                  <option>Solids</option>
                  <option>Tumblers</option>
                  <option> Carafes</option>
                  <option> Serving Bowls</option>
                  <option> Pestle & Mortars</option>
                  <option>Oil & Vinegar Bottles</option>
                  <option>Scented Candleholders</option>
                  <option> Candleholders</option>
                  <option>Candlesticks & Candelabras</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-lg-3">
            <select className="form-select  mt-2">
              <option>SHAPE</option>
              <option>Round</option>
              <option>Square</option>
              <option>Oval</option>
            </select>
          </div>
          <div className="col-md-4 col-lg-3">
            <select className="form-select  mt-2">
              <option>ALL COLOURS</option>
              <option>Blue</option>
              <option>Amber</option>
              <option>Green</option>
              <option>Clear</option>
            </select>
          </div>
          <div className="col-md-4 col-lg-3">
            <select className="form-select  mt-2">
              <option>ALL PRICES</option>
              <option>Under €20</option>
              <option>€20 - €50</option>
              <option>Over €50</option>
            </select>
          </div>
        </div>
      </div>
      {/* Sort and Items Control */}
      <div className="row mb-3">
        <div className="col-md-12 col-lg-7">
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex sorting-style align-items-center">
                <span>Sort by</span>
                <select className="form-select w-auto">
                  <option>Price</option>
                  <option>Name</option>
                  <option>Newest</option>
                  <option>Popular</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex  sorting-item align-items-center justify-content-end">
                <span>Items</span>
                <select
                  className="form-select w-auto me-3"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  <option value={15}>15 Items</option>
                  <option value={30}>30 Items</option>
                  <option value={60}>60 Items</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="col-md-12 col-lg-5">
          <nav aria-label="Product pagination">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(1)}>
                  1
                </button>
              </li>
              <li className={`page-item ${currentPage === 2 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(2)}>
                  2
                </button>
              </li>
              <li className="page-item">
                <button className="page-link" onClick={() => setCurrentPage(3)}>
                  3
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next &gt;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Items Count */}
      <div className="mb-3">
        <small className="text-muted">Items 1-9 of 9 total</small>
      </div>

      {/* Product Grid */}
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-lg-4 col-md-6 mb-4">
            <div className=" product-card">
              <div className="position-relative">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{}}
                />
                {/* {product.hasOptions && (
                  <div className="m-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`options-${product.id}`}
                      />
                      <label
                        className="form-check-label small text-muted"
                        htmlFor={`options-${product.id}`}
                      >
                        Click for more options
                      </label>
                    </div>
                  </div>
                )} */}
              </div>
              <div className="card-body text-center">
                <Link href="/product-details">
                  <h6 className="card-title mb-3">{product.name}</h6>
                </Link>
                {/* <h6 className="card-title mb-3">{product.name}</h6> */}
                <p className="card-text text-info fw-bold">
                  Price {product.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sort and Items Control */}
      <div className="row mb-3">
        <div className="col-md-12 col-lg-7">
          <div className="row">
            <div className="col-md-6 col-lg-6">
              <div className="d-flex sorting-style align-items-center">
                <span>Sort by</span>
                <select className="form-select w-auto">
                  <option>Price</option>
                  <option>Name</option>
                  <option>Newest</option>
                  <option>Popular</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 col-lg-6">
              <div className="d-flex  sorting-item align-items-center justify-content-end">
                <span>Items</span>
                <select
                  className="form-select w-auto me-3"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  <option value={15}>15 Items</option>
                  <option value={30}>30 Items</option>
                  <option value={60}>60 Items</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="col-md-12 col-lg-5">
          <nav aria-label="Product pagination">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(1)}>
                  1
                </button>
              </li>
              <li className={`page-item ${currentPage === 2 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(2)}>
                  2
                </button>
              </li>
              <li className="page-item">
                <button className="page-link" onClick={() => setCurrentPage(3)}>
                  3
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next &gt;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
