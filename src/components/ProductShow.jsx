"use client";

import { createUrl } from "@/constant";
import { ProductLists } from "@/store/product";
import Link from "next/link";
import { useParams } from "next/navigation";

const ProductShow = ({ productDetails }) => {
  const params = useParams();
  const { setPagination } = ProductLists((state) => state);

  console.log("productDetails", productDetails);
  const products = [
    {
      id: 1,
      name: "Oranges & Reds Carafe",
      price: 37.0,
      image: "/assets/bracelet1.png",
    },
    {
      id: 2,
      name: "Oranges & Reds Round Jug",
      price: 48.5,
      image: "/assets/bracelet2.png",
    },
    {
      id: 3,
      name: "Small Dip Bowl",
      price: 21.0,
      image: "/assets/bracelet3.png",
    },
  ];
  return (
    <>
      <div className="container">
        <h2 className="product-show">Range - Jewellery</h2>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className=" product-card products-show">
                <div className="position-relative">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{}}
                  />
                  {product.hasOptions && (
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
                  )}
                </div>
                <div className="card-body text-center">
                  <h6 className="card-title mb-3">{product.name}</h6>
                  <p className="card-text fw-bold">Price {product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-12">
          <div className="view-more  text-right button-margin float-right mb-3">
            <Link
              href={createUrl(productDetails?.id, "", "", 15, 1)}
              onClick={() => {
                setPagination({
                  per_page: 15,
                  page: 1,
                  sort_by: "price",
                  sort_dir: "asc",
                });
              }}
            >
              <button className="btn btn-info text-white">VIEW ALL</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductShow;
