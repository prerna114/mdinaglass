"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useCartStore } from "@/store";
import { CustomToast, SuccessToast } from "./CustomToast";
import { addToTheCart } from "@/api/CartApi";

export default function ProductDetails({ productDetails }) {
  console.log("productDetails", productDetails);
  const [quantity, setQuantity] = useState(1);
  // Step 1: Count usage of each option_id across attribute_ids
  const optionIdCount = new Map(); // option_id -> count
  const uniqueOptions = new Map(); // option_id -> option_value

  const getDetails = async () => {
    (await productDetails?.variants) &&
      productDetails?.variants.forEach((variant) => {
        Object.entries(variant.attributes).forEach(([key, value]) => {
          if (!/^\d+$/.test(key)) return;

          const { option_id, option_value } = value;

          if (
            optionIdCount.get(option_id) === 1 &&
            !uniqueOptions.has(option_id)
          ) {
            uniqueOptions.set(option_id, option_value);
          }
        });
      });

    (await productDetails?.variants) &&
      productDetails?.variants.forEach((variant) => {
        Object.entries(variant.attributes).forEach(([key, value]) => {
          if (!/^\d+$/.test(key)) return;

          const optionId = value.option_id;

          if (optionIdCount.has(optionId)) {
            optionIdCount.set(optionId, optionIdCount.get(optionId) + 1);
          } else {
            optionIdCount.set(optionId, 1);
          }
        });
      });
  };

  // Step 2: Collect unique option_values where option_id appears under only one attribute_id

  const imageList = [
    "/assets/bracelet1.png",
    "/assets/Bowls.png",
    "/assets/lamp.png",
    "/assets/bracelet2.png",
  ];
  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const { addToCart, cart, clearCart } = useCartStore((state) => state);
  const handleAdd = (item) => {
    addToCart(item);
    const updated = useCartStore.getState().cart.find((i) => i.id === item.id);
    if (updated) {
      SuccessToast("Item added Successfuly", "top-right");
    }
    console.log("updated", updated);
  };

  const addItemCart = async (sku, qty) => {
    console.log("productDetails?.sku, quantity", productDetails?.sku, quantity);
    const data = await addToTheCart(productDetails?.sku, quantity);
    console.log("data", data);
    if (data?.status == 200) {
      clearCart();
      addToCart(data.result.cart.items);

      SuccessToast("Item added Successfuly", "top-right");
    } else {
      CustomToast("Something went Wrong", "top-right");
    }
  };
  useEffect(() => {
    getDetails();
  }, []);
  console.log("productDetails", productDetails);
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
            <img
              src={productDetails?.images[0]?.url || selectedImage}
              alt="Glass Bead Necklace"
              width={600}
              height={400}
              className="img-fluid"
            />
          </div>
          <div className="d-flex thumbnail-section justify-content-center gap-2 mt-3">
            {productDetails?.images?.length > 1 &&
              imageList.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  width={120}
                  height={120}
                  className="img-thumbnail"
                  style={{
                    cursor: "pointer",
                    border:
                      selectedImage === src ? "2px solid #007bff" : "none",
                  }}
                  onClick={() => setSelectedImage(src)}
                />
              ))}
          </div>

          <table className="table table-details mt-5">
            <tbody>
              <tr>
                <th>Colour:</th>
                <td>
                  {productDetails?.attributes?.color
                    ? productDetails?.attributes?.color
                    : "n/a"}
                </td>
              </tr>
              <tr>
                <th>Width(cm):</th>
                <td>{productDetails?.width ? productDetails?.width : "n/a"}</td>
              </tr>

              <tr>
                <th>Depth(cm):</th>
                <td>n/a</td>
              </tr>

              <tr>
                <th>Height(cm):</th>
                <td>
                  {productDetails?.height ? productDetails?.height : "n/a"}
                </td>
              </tr>

              <tr>
                <th>Length(cm):</th>
                <td>
                  {productDetails?.length ? productDetails?.length : "n/a"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Product Details */}
        <div className="col-md-12 col-lg-6 ">
          <div className="products-detailing">
            <h2>{productDetails?.name}</h2>
            <p className="text-muted sku-detail">
              SKU: {productDetails?.sku ? productDetails.sku : "JG10068-M"}{" "}
              <span className="wishlist float-right">
                <Heart
                  size={24}
                  color="#c6302c"
                  fill="#c6302c" // ✅ adds fill color
                  stroke="#c6302c"
                />
              </span>
            </p>
            <p className="sku-detail mb-0">Description </p>
            {/* <p className="text-muted">
              Matching bracelet and necklace with large coloured glass beads.
              Bracelet has elasticated universal fit and is 6cm rested internal
              diameter. Necklace has lobster claw clasp and is 50cm long when
              open.
            </p> */}
            <p
              dangerouslySetInnerHTML={{ __html: productDetails?.description }}
            ></p>

            <p className="sku-detail">
              Availability: <span className="text-success">In Stock</span>
            </p>

            <p className="sku-detail">
              {/* Price: <span className="fs-4 text-dark">&euro;29.00</span> */}
              Price:{" "}
              <span className="fs-4 text-dark">
                {productDetails?.formatted_price}
              </span>
            </p>

            {productDetails?.variants?.length > 0 && (
              <div className="mb-3 d-flex choose-category align-items-center">
                <label
                  className="form-label me-2  fw-semibold"
                  style={{
                    color: "#005e84",
                  }}
                >
                  Choose:
                </label>
                {/* <select className="form-select" style={{ color: "#005e84" }}>
                  <option>Select Option</option>
                  {productDetails?.variants.flatMap((variant) =>
                    Object.entries(variant.attributes)
                      .filter(([key]) => /^\d+$/.test(key)) // only numeric attribute keys
                      .map(([key, value]) => (
                        <option key={`${variant.id}-${key}`}>
                          {value.option_value}
                        </option>
                      ))
                  )}
                </select> */}
                <select className="form-select" style={{ color: "#005e84" }}>
                  <option>Select Option</option>
                  {[...uniqueOptions.entries()].map(([optionId, label]) => (
                    <option key={optionId} value={optionId}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-4 d-flex choose-category align-items-center">
              <label
                className="form-label  fw-semibold"
                style={{
                  color: "#005e84",
                }}
              >
                Quantity:
              </label>
              <select
                className="form-select w-auto"
                style={{
                  color: "#005e84",
                }}
                onChange={(e) => {
                  console.log("Quantity", e.target.value);
                  setQuantity(e.target.value);
                }}
                defaultValue={quantity}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>

            <button
              className="w-100 py-3 text-uppercase addtocart"
              onClick={() => {
                // handleAdd({
                //   id: 1,
                //   name: "Glass Bead Necklace & Bracelet Set",
                //   price: 29.0,
                //   qty: 1,
                //   image: "/assets/bracelet1.png",
                //   gift: false,
                // });
                addItemCart();
              }}
            >
              <span>
                {" "}
                <Image
                  src="/assets/bag_white.webp"
                  alt="Glass Bead Necklace"
                  width={27}
                  height={27}
                  className="img-fluid"
                  style={{
                    marginRight: "10px",
                  }}
                />
                Add to Cart
              </span>
            </button>

            <div className="mt-3 text-center a_color ">
              <a href="#" className=" text-decoration-none">
                View Cart &nbsp;|
              </a>
              <a href="#" className="text-decoration-none">
                {" "}
                &nbsp;Add to Gift Registry
              </a>
            </div>

            <div className="mt-4 small paragraph-section text-muted">
              <p>
                {" "}
                <strong>IMPORTANT - </strong> All images of products are a close
                representation of the finished product. However, due to the
                unique nature of our handmade glassware, no two pieces are
                exactly the same and sizes given above are approximate. If you
                need exact matching pieces, please visit our factory at Ta'
                Qali, Malta or contact us a onlinesales@mdinaglass.com.mt before
                placing your order. Please see our Terms & Conditions for more
                details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
