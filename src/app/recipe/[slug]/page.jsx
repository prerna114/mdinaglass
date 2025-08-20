"use client";
import { getSlider } from "@/api/CartApi";
// import AboutContent from "@/components/AboutUs/AboutContent";
import RecipeSIdeMenu from "@/components/Recipe/RecipeSIdeMenu";
import ParagraphSkeleton from "@/components/Skeleton/ParagraphSkeleton";
import SimpleSlider from "@/components/TopSlider";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
const images = [
  {
    src: "/assets/recipeslider.png",
  },
  {
    src: "/assets/recipetwo.png",
  },
];

const page = () => {
  const params = useParams();

  const [sliderImage, setSliderImage] = useState([]);
  console.log("paramsInfromation", params.slug);

  const getSiderImage = async () => {
    const data = await getSlider(params.slug);
    if (data?.status == 200) {
      setSliderImage(data?.data?.data[0]?.image_urls);
    } else {
      setSliderImage([]);
    }
    console.log("Data SLug", data?.data?.data);
  };
  useEffect(() => {
    getSiderImage();
  }, []);
  return (
    <div className="InfoContainer mb-5">
      <SimpleSlider images={sliderImage} />

      <div
        style={{
          flexDirection: "row",
          display: "flex",
          marginTop: "20px",
        }}
      >
        {/* <SimpleSlider /> */}
        <div className="row">
          <div className="col-md-12">
            <RecipeSIdeMenu />
          </div>
        </div>
        <div className="col-md-9">
          <RecipeContent />
        </div>
      </div>
    </div>
  );
};

export default page;
