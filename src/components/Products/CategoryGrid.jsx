import { createUrl } from "@/constant";
import { useMenuStore } from "@/store/useCategoryStore";
import { useRouter } from "next/navigation";
import React from "react";

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
              <img
                src={
                  product.logo_image ? product.logo_image : "/assets/lamp.png"
                }
                className="card-img-top"
                alt={product.name}
                style={{}}
              />
            </div>
            <div className="card-body text-center">
              <a
                style={{
                  cursor: "pointer",
                }}
                // href={{
                //   pathname: `/product-details/webshop/${product?.id}`,
                //   query: { sku: product?.sku },
                // }}
                href={"#"}
                onClick={() => {
                  // console.log("dsada", product);
                  const pathToId = buildCategoryPath(product?.id);
                  useMenuStore.getState().setExpanded(pathToId);
                  const newUrl = createUrl(pathToId, product.slug);

                  // console.log("logo_image", product);
                  // console.log("New url ,", newUrl);
                  router.push(newUrl);
                }}
              >
                <h6 className="card-title mb-3">{product.name}</h6>
              </a>
              {/* <h6 className="card-title mb-3">{product.name}</h6> */}
              <p className="card-text text-info fw-bold">
                Price €
                {product.min_price
                  ? Number(product.min_price).toFixed(2)
                  : "120.00"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(CategoryGrid);
