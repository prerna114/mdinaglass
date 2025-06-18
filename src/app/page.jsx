"use client";
import CategoryFeature from "@/components/CategoryFeature";
import CategoryGrid from "@/components/CategoryGrid";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import Megamenu from "@/components/Megamenu";
import React from "react";

export default function Page() {
  return (
    <>
      <Header />
      <Megamenu/>
        <Video/>
    
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
      <Footer />
    </>
  );
}
