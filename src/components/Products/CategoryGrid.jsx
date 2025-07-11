import { createUrl } from "@/constant";
import { ProductLists } from "@/store/product";
import { useMenuStore } from "@/store/useCategoryStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const CategoryGrid = ({ category }) => {
  const router = useRouter();

  // const getProductByCategory = async (id, selectedFilter) => {
  //   setLoading(true);
  //   setProducts([]);
  //   setCategory([]);
  //   if (
  //     id &&
  //     selectedFilter &&
  //     Object.keys(selectedFilter).length > 0 &&
  //     (products?.length === 0 || category?.length === 0)
  //   ) {
  //     const data = await getProductCateogry(id, selectedFilter);
  //     console.log(
  //       " ====================== Side Menu Insde23",
  //       data.data,
  //       products.length,
  //       category.length
  //     );

  //     if (data?.status === 200) {
  //       const FilterData = data.data || [];
  //       setAllProduct(data.data);
  //       if (data.data.filterable?.length > 0) {
  //         const colors = FilterData?.filterable?.find(
  //           (item) => item.code == "color"
  //         );
  //         const variation = FilterData?.filterable?.find(
  //           (item) => item.code == "variations"
  //         );

  //         console.log("ColorsSideMenu", variation?.options, colors);
  //         if (colors?.options?.length > 0) {
  //           // setColorOptions(colors?.options);
  //           setFilterOption({
  //             colors: colors?.options,
  //           });
  //         }
  //         if (variation?.options?.length > 0) {
  //           setFilterOption({
  //             variations: variation?.options,
  //           });
  //           // setVariationOption(variation?.options);
  //         }
  //       }
  //       if (data.data.products && data.data.products.length > 0) {
  //         setProducts(data.data.products);
  //       } else if (
  //         data?.data?.sub_categories &&
  //         data?.data?.sub_categories.length > 0
  //       ) {
  //         setCategory(data.data.sub_categories);
  //       }
  //       window.scrollTo({
  //         top: 500,
  //         behavior: "smooth", // Optional: for smooth scrolling animation
  //       });
  //       // setProducts(data.data.products || []);
  //       console.log("Product Data", data.data);
  //     } else {
  //       setProducts([]);
  //       setCategory([]);
  //       window.scrollTo({
  //         top: 500,
  //         behavior: "smooth", // Optional: for smooth scrolling animation
  //       });
  //     }

  //     setLoading(false);
  //   }
  // };

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
              <Link
                href={createUrl(buildCategoryPath(product?.id), product.slug)}
                onClick={(e) => {
                  e.preventDefault(); // prevent default to handle navigation manually
                  const pathToId = buildCategoryPath(product?.id);
                  useMenuStore.getState().setExpanded(pathToId);
                  router.push(createUrl(pathToId, product.slug));
                }}
              >
                <h6 className="card-title mb-3">{product.name}</h6>
              </Link>
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
