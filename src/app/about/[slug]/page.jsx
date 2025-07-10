"use client";
// import AboutContent from "@/components/AboutUs/AboutContent";
import AboutSideMenu from "@/components/AboutUs/AboutSideMenu";
import ParagraphSkeleton from "@/components/ParagraphSkeleton";
import dynamic from "next/dynamic";
import React from "react";
const AboutContent = dynamic(
  () => import("@/components/AboutUs/AboutContent"),
  {
    ssr: false,
    loading: () => (
      <div style={{ height: 300 }}>
        <ParagraphSkeleton />
      </div>
    ),
  }
);
const page = () => {
  return (
    <div className="InfoContainer">
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          marginTop: "20px",
        }}
      >
        <AboutSideMenu />
        <AboutContent />
      </div>
    </div>
  );
};

export default page;
