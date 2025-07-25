import { createUrl } from "@/constant";
import { ProductLists } from "@/store/product";
import { useMenuStore } from "@/store/useCategoryStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import InstantLink from "../InstantClick";

const CategoryGrid = ({ category }) => {
  const router = useRouter();

  const buildCategoryPath = (id) => {
    const { parentMap } = useMenuStore.getState();
    const path = [id];
    let current = id;

    while (parentMap[current]) {
      current = parentMap[current];
      path.unshift(current);
    }
    return path;
  };

  return (
    <div className="row">
      {category?.map((product) => (
        <div key={product.id} className="col-lg-4 col-md-6 mb-4">
          <div className=" product-card">
            <div className="position-relative">
              <InstantLink
                href={createUrl(buildCategoryPath(product?.id), product.slug)}
              >
                <img
                  src={
                    product.logo_image ? product.logo_image : "/assets/lamp.png"
                  }
                  className="card-img-top"
                  alt={product.name}
                  style={{}}
                />
              </InstantLink>
            </div>
            <div className="card-body text-center">
              <InstantLink
                href={createUrl(buildCategoryPath(product?.id), product.slug)}
              >
                <h6 className="card-title mb-3">{product.name}</h6>
              </InstantLink>
              {/* <h6 className="card-title mb-3">{product.name}</h6> */}
              <p className="card-text text-info fw-bold">
                Price €
                {product.min_price
                  ? Number(product.min_price).toFixed(2)
                  : "0.00"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(CategoryGrid);
