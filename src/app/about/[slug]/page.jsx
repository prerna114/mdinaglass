"use client";
import { getSlider } from "@/api/CartApi";
// import AboutContent from "@/components/AboutUs/AboutContent";
import AboutSideMenu from "@/components/AboutUs/AboutSideMenu";
import ParagraphSkeleton from "@/components/Skeleton/ParagraphSkeleton";
import SimpleSlider from "@/components/TopSlider";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  const params = useParams();
  const [imagesToUse, setImagesToUse] = useState([]);
  const [sliderImage, setSliderImage] = useState([]);
  const images = [
    { src: "/assets/abotone.png" },
    {
      src: "/assets/abouttwo.png",
    },
    { src: "/assets/aboutthree.png" },
    { src: "/assets/aboutfour.png" },
  ];
  const ourHistory = [
    { src: "/assets/historyone.png" },
    {
      src: "/assets/historytwo.png",
    },
    { src: "/assets/historythree.png" },
    { src: "/assets/historyfour.png" },
    { src: "/assets/historyfive.png" },
  ];

  const glassMaker = [
    { src: "/assets/glassmaker.png" },
    {
      src: "/assets/glassmakertwo.png",
    },
    { src: "/assets/glassmakerthree.png" },
    { src: "/assets/glassmakerfour.png" },
    { src: "/assets/glassmakerfive.png" },
  ];

  const getSiderImage = async () => {
    const data = await getSlider(params.slug);
    if (data?.status == 200) {
      setSliderImage(data?.data?.data[0]?.image_urls);
    } else {
      setSliderImage([]);
    }
    console.log("Data SLug", data?.data?.data);
  };
  const familyTradtionImages = [{ src: "/assets/familytradition.jpg" }];
  useEffect(() => {
    getSiderImage();
    if (params.slug === "a-family-tradition") {
      setImagesToUse(familyTradtionImages);
    } else if (params.slug === "our-history") {
      setImagesToUse(ourHistory);
    } else if (params.slug === "watch-the-glassmakers") {
      setImagesToUse(glassMaker);
    } else {
      setImagesToUse(images);
    }
  }, [params.slug]);
  console.log("Params in about page", sliderImage);

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
        <AboutSideMenu />
        <AboutContent />
      </div>
    </div>
  );
};

export default page;
