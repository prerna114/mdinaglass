"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import { useCartStore } from "@/store";
import { SuccessToast } from "./CustomToast";

export default function ProductDetails() {

  const imageList = [
    "/assets/bracelet1.png",
    "/assets/Bowls.png",
    "/assets/lamp.png",
    "/assets/bracelet2.png",
    
  ];
  const [selectedImage, setSelectedImage] = useState(imageList[0]);
    const { addToCart, cart, removeFromCart } = useCartStore((state) => state);

    const handleAdd = (item) => {
    addToCart(item);
    const updated = useCartStore.getState().cart.find((i) => i.id === item.id);
    if (updated) {
      SuccessToast("Item added Successfuly", "top-right");
    }
    console.log("updated", updated);
  };

  return (

    
    <div className="container bg-white mt-5 mb-5 py-3">
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
      
      <div className="row">
        {/* Product Image and Thumbnails */}
        <div className="col-md-12 col-lg-6 mt-2">
          <div className="border  text-center">
            <Image
              src={selectedImage}
              alt="Glass Bead Necklace"
              width={600}
              height={400}
              className="img-fluid"
            />
          </div>
          <div className="d-flex thumbnail-section justify-content-center gap-2 mt-3">
            {imageList.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Thumbnail ${index + 1}`}
                width={120}
                height={120}
                className="img-thumbnail"
                style={{
                  cursor: "pointer",
                  border: selectedImage === src ? "2px solid #007bff" : "none",
                }}
                onClick={() => setSelectedImage(src)}
              />
            ))}
          </div>

             <table className="table table-details mt-5">
            <tbody>
              <tr>
                <th>Colour:</th>
                <td>n/a</td>
              </tr>
              <tr>
                <th>Width(cm):</th>
                <td>n/a</td>
              </tr>

               <tr>
                <th>Depth(cm):</th>
                <td>n/a</td>
              </tr>

               <tr>
                <th>Height(cm):</th>
                <td>n/a</td>
              </tr>

               <tr>
                <th>Length(cm):</th>
                <td>n/a</td>
              </tr>

            </tbody>
          </table>
        </div>
        {/* Product Details */}
        <div className="col-md-12 col-lg-6 ">
          <div className="products-detailing">
          <h2 >Glass Bead Necklace & Bracelet Set</h2>
          <p className="text-muted sku-detail">SKU: JG10068-M <span class="wishlist float-right"><FaHeart /></span></p>
<p className="sku-detail mb-0">Description </p>
          <p className="text-muted">
            Matching bracelet and necklace with large coloured glass beads.
            Bracelet has elasticated universal fit and is 6cm rested internal
            diameter. Necklace has lobster claw clasp and is 50cm long when
            open.
          </p>

          
            <p className="sku-detail">Availability:{" "}
            <span className="text-success">In Stock</span></p>
         
        
            <p className="sku-detail">Price:{" "}
            <span className="fs-4 text-dark">&euro;29.00</span></p>
       

          <div className="mb-3 d-flex choose-category align-items-center">
            <label className="form-label me-2  fw-semibold"   style={{
                  color: "#005e84",
                   }}>Choose:</label>
            <select className="form-select"  style={{
                  color: "#005e84",
                   }}>
              <option>Select Item</option>
            </select>
          </div>

          <div className="mb-4 d-flex choose-category align-items-center">
            <label className="form-label  fw-semibold"  style={{
                  color: "#005e84",
                   }}>Quantity:</label>
            <select className="form-select w-auto"  style={{
                  color: "#005e84",
                   }}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>

          <button className="w-100 py-3 text-uppercase addtocart"  onClick={() => {
                        handleAdd({
                          id: 3,
                          name: "Glass Bead Necklace & Bracelet Set",
                          price: 29.0,
                          qty: 1,
                          image: "/assets/bracelet1.png",
                          gift: false,
                        });
                      }}>
        <span>   <IoBagOutline /> Add to Cart</span>
          </button>

          <div className="mt-3 text-center a_color ">
            <a href="#" className=" text-decoration-none">
              View Cart &nbsp;|
            </a>
            <a href="#" className="text-decoration-none"> &nbsp;Add to Gift Registry</a>
          </div>

          <div className="mt-4 small paragraph-section text-muted">
          <p> <strong>IMPORTANT - </strong> All images of products are a close representation of the finished product. However, due to the unique nature of our handmade glassware, no two pieces are exactly the same and sizes given above are approximate. If you need exact matching pieces, please visit our factory at Ta' Qali, Malta or contact us a onlinesales@mdinaglass.com.mt before placing your order. Please see our Terms & Conditions for more details.</p>
         
          </div>

        </div>
        </div>
      </div>
    </div>
  );
}