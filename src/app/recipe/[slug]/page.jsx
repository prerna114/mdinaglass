"use client";
// import AboutContent from "@/components/AboutUs/AboutContent";
import RecipeSIdeMenu from "@/components/Recipe/RecipeSIdeMenu";
import ParagraphSkeleton from "@/components/Skeleton/ParagraphSkeleton";
import SimpleSlider from "@/components/TopSlider";
import dynamic from "next/dynamic";
import React from "react";
const RecipeContent = dynamic(
  () => import("@/components/Recipe/RecipeContent"),
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
    <div className="InfoContainer mb-5">
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          marginTop: "20px",
        }}
      >
        {/* <SimpleSlider /> */}
        <RecipeSIdeMenu />
        <RecipeContent />
      </div>
    </div>
  );
};

export default page;
