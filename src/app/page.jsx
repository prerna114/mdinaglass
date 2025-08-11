"use client";
import { useMenuStore } from "@/store/useCategoryStore";
import CategoryGrid from "../components/CategoryGrid";
import VideoSkeleton from "../components/Skeleton/VideoSkeleton";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { sliderSetting } from "@/api/HomePageApi";
const Video = dynamic(() => import("../components/Video"), {
  ssr: true,
  loading: () => <VideoSkeleton />,
});
const ProductCarousel = dynamic(() => import("../components/ProductCarousel"), {
  ssr: false,
  loading: () => <div style={{ height: 200 }}>Loading...</div>,
});
const CategoryFeature = dynamic(() => import("../components/CategoryFeature"), {
  ssr: false,
  loading: () => <div style={{ height: 200 }}>Loading...</div>,
});

const ProductCard = dynamic(() => import("../components/ProductCard"), {
  ssr: false,
  loading: () => <div style={{ height: 200 }}>Loading...</div>,
});

const Testimonials = dynamic(() => import("../components/Testimonials"), {
  ssr: false,
  loading: () => <div style={{ height: 200 }}>Loading...</div>,
});

export default function Page() {
  const sideMenu = useMenuStore((state) => state.sideMenu);
  const [slideSetting, setSlideSetting] = useState({});
  const sliderSSetting = async () => {
    const data = await sliderSetting();
    console.log("Slider Setting", data);
    if (data?.status == 200) {
      const filtered = data?.data?.data?.reduce((acc, item) => {
        if (item.values === "true") {
          acc[item.key] = true; // store as boolean true
        }
        return acc;
      }, {});
      setSlideSetting(filtered);
    }
  };
  useEffect(() => {
    sliderSSetting();
  }, []);

  console.log("sideMenuPage", slideSetting);
  return (
    <>
      <Video />

      <section
        style={{
          backgroundColor: "#F1F1F1",
        }}
      >
        <div className="container">
          <CategoryFeature />
        </div>
      </section>
      <section className="py-5 bg-white text-center">
        <div className="container">
          <CategoryGrid />
        </div>
      </section>
      {slideSetting?.new_arrivals && (
        <ProductCarousel title="New Arrivals" showBadge={true} />
      )}

      {slideSetting?.best_sellers && <ProductCard title="Best Sellers" />}

      {slideSetting?.featured_products && (
        <ProductCarousel title="Featured Products" showBadge={false} />
      )}

      {slideSetting?.testi_monial && <Testimonials />}

      {/* <Footer /> */}
    </>
  );
}
