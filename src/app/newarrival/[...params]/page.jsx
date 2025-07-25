"use client";
import ProductHeading from "@/components/ProductHeading";
import ListingSkeleton from "@/components/Skeleton/ListingSkeleton";
import SideMenuSkeleton from "@/components/Skeleton/SideMenuSkeleton";

import dynamic from "next/dynamic";
import { useLinkStatus } from "next/link";
const SideMenu = dynamic(() => import("@/components/SideMenu"), {
  ssr: true,
  loading: () => (
    <div>
      <SideMenuSkeleton />
      {/* <ParagraphSkeleton /> */}
    </div>
  ),
});
const NewArrivalListing = dynamic(
  () => import("@/components/Products/NewArrivalListing"),
  {
    ssr: true,
    loading: () => <ListingSkeleton />,
  }
);
NewArrivalListing.preload?.();
SideMenu.preload?.();
const page = () => {
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
                {/* <ProductListing /> */}
                <NewArrivalListing />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
