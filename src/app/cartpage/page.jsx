"use client";

import AddToCart from "@/components/AddToCart";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import GiftVoucher from "@/components/GiftVoucher";
import React, { useState } from "react";
import CartHeading from "@/components/CartHeading";
import MegaMenu from "@/components/Megamenu";
import Link from "next/link";
import { useCartStore } from "@/store";
import { SuccessToast } from "@/components/CustomToast";

const page = () => {
  const { addToCart, cart, removeFromCart } = useCartStore((state) => state);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Glass Bead Necklace & Bracelet Set",
      price: 29.0,
      qty: 1,
      image: "/assets/bracelet1.png",
      gift: false,
    },
    {
      id: 2,
      name: "Frosted Glass Bead Bracelet",
      price: 12.0,
      qty: 1,
      image: "/assets/bracelet1.png",
      gift: false,
    },
  ]);

  const updateQuantity = (id, newQty) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  const toggleGift = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, gift: !item.gift } : item
      )
    );
  };

  const removeTheItem = (id) => {
    removeFromCart(id);
    SuccessToast("Item Remove succusfully", "top-right");
  };

  const subtotal = (price, qty) => (price * qty).toFixed(2);
  console.log("Cart", cart);
  return (
    <div>
      {/* <Header /> */}
      <MegaMenu />
      <CartHeading />
      {cart?.length == 0 && (
        <div
          style={{
            marginBottom: "60px",
          }}
        >
          <h1 className="text-center"> Shopping Cart is Empty.</h1>
          <p className="text-center">
            You have no items in your shopping cart.
          </p>
          <div>
            <div className="text-center  header-of-cart">
              <Link href="/">
                <button className="btn btn-info text-white">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {cart?.length != 0 && (
        <div
          className="cart-page-main"
          style={{
            background: "#f1f1f1",
          }}
        >
          <div className="container">
            <div className="align-cart">
              <div className="header-of-cart">
                <div className="row align-items-center">
                  <div className="col-md-8"></div>

                  <div className="col-md-4">
                    <div className="text-right button-margin float-right mb-3 mt-5">
                      <Link href="/checkout">
                        <button className="btn btn-info text-white">
                          Proceed To Checkout
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="table-responsive-sm">
                <table className="table cart-table table-bordered">
                  <thead className="thead-dark">
                    <tr className="tr-bg">
                      <th>ITEM</th>
                      <th>PRODUCT NAME</th>
                      <th>UNIT PRICE</th>
                      <th>SUBTOTAL</th>
                      <th>QTY</th>
                      <th>GIFT</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img src={item.image} alt={item.name} width="80" />
                        </td>
                        <td>{item.name}</td>
                        <td>€{item.price.toFixed(2)}</td>
                        <td>€{subtotal(item.price, item.qty)}</td>
                        <td>
                          <input
                            type="number"
                            value={item.qty}
                            min="1"
                            className="form-control"
                            style={{ width: "70px" }}
                            onChange={(e) =>
                              updateQuantity(item.id, parseInt(e.target.value))
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={item.gift}
                            onChange={() => toggleGift(item.id)}
                          />
                        </td>
                        <td className="text-center">
                          <span
                            className="text-info"
                            style={{ cursor: "pointer" }}
                            onClick={() => removeTheItem(item.id)}
                          >
                            &times;
                          </span>
                          <div className="fonsizee" style={{ color: "grey" }}>
                            Remove
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* <div className="col-md-12">
                      <div className="table-content">
                      <div className="table-row-1">
                            
                              <div className="row">
                    
                          <div className="col-md-1 col-1">
                          <h6>Items</h6>


                          </div>

                          <div className="col-md-3 col-3">
                          <h6>Product Name</h6>


                          </div>
                          <div className="col-md-2 col-2">
                          <h6>Unit Price</h6>
                          </div>

                          <div className="col-md-2 col-2">
                          <h6>Subtotal</h6>
                          </div>


                          <div className="col-md-1 col-1">
                          <h6>Qty</h6>
                          </div>


                          <div className="col-md-1 col-1">
                          <h6>Gift</h6>
                          </div>
                          <div className="col-md-2 col-2">
                          <h6>Gift</h6>
                          </div>

                        </div>
                  


                    </div>


                    <div className="table-row-3">
                            
                              <div className="row">
                    
                          <div className="col-md-1">
                          <div><img src="/assets/bracelet1.png" className="w-100"/></div>


                          </div>

                          <div className="col-md-3">
                          <h6>Dog (standing) - Brown</h6>


                          </div>
                          <div className="col-md-2">
                          <h6>€17.00</h6>
                          </div>

                          <div className="col-md-2">
                          <h6>€17.00</h6>
                          </div>


                          <div className="col-md-1">
                          <div><input type="number" className="w-100"></input></div>
                          </div>


                          <div className="col-md-1">
                          <h6>Gift</h6>
                          </div>
                          <div className="col-md-2">
                          <h6>x Remove</h6>
                          </div>

                        </div>
                  


                    </div>


                      <div className="table-row-2">
                            
                              <div className="row">
                    
                          <div className="col-md-1">
                          <div><img src="/assets/bracelet1.png" className="w-100"/></div>


                          </div>

                          <div className="col-md-3">
                          <h6>Dog (standing) - Brown</h6>


                          </div>
                          <div className="col-md-2">
                          <h6>€17.00</h6>
                          </div>

                          <div className="col-md-2">
                          <h6>€17.00</h6>
                          </div>


                          <div className="col-md-1">
                          <div><input type="number" className="w-100"></input></div>
                          </div>


                          <div className="col-md-1">
                          <h6>Gift</h6>
                          </div>
                          <div className="col-md-2">
                          <h6>x Remove</h6>
                          </div>

                        </div>
                  


                    </div>





                      </div>
                  </div> */}

              <table className="checkout-table table-row-1 checkout-table-mobile">
                <thead>
                  <tr>
                    <td className="col-item">Item</td>
                    <td className="col-name">Product Name</td>
                    <td className="col-price">Unit Price</td>
                    <td className="col-subtotal">Subtotal</td>
                  </tr>
                </thead>
              </table>

              <div className="table-row-3">
                <div className="row">
                  <div className="col-item">
                    <div>
                      <img src="/assets/bracelet1.png" className="w-100" />
                    </div>
                  </div>

                  <div className=" col-name">
                    <h6>Dog (standing) - Brown</h6>
                  </div>
                  <div className=" col-price">
                    <h6>€17.00</h6>
                  </div>

                  <div className=" col-subtotal">
                    <h6>€17.00</h6>
                  </div>

                  <div className="col-input mt-3">
                    <h6>
                      Qty{" "}
                      <span>
                        <input type="number"></input>
                      </span>
                    </h6>
                  </div>

                  <div className="col-gift mt-3">
                    <h6>
                      Gift{" "}
                      <span>
                        <input type="checkbox"></input>
                      </span>
                    </h6>
                  </div>
                  <div className="col-remove mt-3">
                    <h6>x Remove</h6>
                  </div>
                </div>
              </div>
              <hr className="display-option" />
              <div className="table-row-3">
                <div className="row">
                  <div className="col-item">
                    <div>
                      <img src="/assets/bracelet1.png" className="w-100" />
                    </div>
                  </div>

                  <div className=" col-name">
                    <h6>Dog (standing) - Brown</h6>
                  </div>
                  <div className=" col-price">
                    <h6>€17.00</h6>
                  </div>

                  <div className=" col-subtotal">
                    <h6>€17.00</h6>
                  </div>

                  <div className="col-input mt-3">
                    <h6>
                      Qty{" "}
                      <span>
                        <input type="number"></input>
                      </span>
                    </h6>
                  </div>

                  <div className="col-gift mt-3">
                    <h6>
                      Gift{" "}
                      <span>
                        <input type="checkbox"></input>
                      </span>
                    </h6>
                  </div>
                  <div className="col-remove mt-3">
                    <h6>x Remove</h6>
                  </div>
                </div>
              </div>

              <AddToCart />
              <GiftVoucher />
            </div>
          </div>
        </div>
      )}
      {/* <Footer /> */}
    </div>
  );
};

export default page;
