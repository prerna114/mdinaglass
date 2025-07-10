"use client";
import CategoryGrid from "../components/CategoryGrid";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
const Video = dynamic(() => import("../components/Video"), {
  ssr: false,
  loading: () => <div style={{ height: 300 }}>Loading video...</div>,
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
  return (
    <>
      {/* <Header /> */}
      {/* <Megamenu /> */}
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
      <ProductCarousel title="New Arrivals" showBadge={true} />
      <ProductCard title="Best Sellers" />
      <ProductCarousel title="Featured Products" showBadge={false} />

      <Testimonials />
      {/* <Footer /> */}
    </>
  );
}
