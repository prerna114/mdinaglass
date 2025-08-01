"use client";
import { getSearchProduct } from "@/api/productApi";
import { CustomToast } from "@/components/CustomToast";
import ProductHeading from "@/components/ProductHeading";
import ListingSkeleton from "@/components/Skeleton/ListingSkeleton";
import SideMenuSkeleton from "@/components/Skeleton/SideMenuSkeleton";
import { ProductLists } from "@/store/product";
import { useMenuStore } from "@/store/useCategoryStore";

import dynamic from "next/dynamic";
import { useLinkStatus } from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
const SideMenu = dynamic(() => import("@/components/SideMenu"), {
  ssr: true,
  loading: () => (
    <div>
      <SideMenuSkeleton />
      {/* <ParagraphSkeleton /> */}
    </div>
  ),
});

const SearchListing = dynamic(
  () => import("@/components/Search/SearchListing"),
  {
    ssr: true,
    loading: () => <ListingSkeleton />,
  }
);
SearchListing.preload?.();
SideMenu.preload?.();

const Search = () => {
  const { pending } = useLinkStatus();
  const pathname = usePathname();
  const params = useParams();
  const allParams = useMemo(() => params?.params || [], [params]);
  const { setSearchProduct } = ProductLists((state) => state);
  const loading = useMenuStore((state) => state.loading);
  const setLoading = useMenuStore((state) => state.setLoading);
  useEffect(() => {
    const currentUrl = window.location.href;

    // On first render or route change:
    const prevUrl = localStorage.getItem("currentUrl");
    if (prevUrl) {
      localStorage.setItem("currentUrl", prevUrl); // Save old as previous
    }
    localStorage.setItem("currentUrl", currentUrl); // Save current
  }, [pathname]); // run on every path change

  const searchItem = async () => {
    setLoading(true);
    const data = await getSearchProduct(allParams[0], allParams[1]);
    if (data.status == 200) {
      setSearchProduct(data.data);
      setLoading(false);
    } else {
      setLoading(false);
      CustomToast("Something went wrong", "top-right");
    }
    console.log("Data", data);
  };
  useEffect(() => {
    if (allParams?.length > 0) {
      searchItem();
    }
  }, [allParams]);
  console.log("pending", allParams);
  return (
    <>
      <ProductHeading />
      <div
        style={{
          background: "#f1f1f1",
        }}
      >
        <div className="category-sidebar ">
          <div className="container category-bg">
            <div className="row  min-vh-100">
              {/* Category Sidebar */}

              <div className="col-lg-3 col-md-12 p-0">
                {/* <CategorySidebar /> */}
                <SideMenu />
              </div>
              {/* Product Listing */}
              <div className="col-lg-9 col-md-12">
                <SearchListing />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default Search;
