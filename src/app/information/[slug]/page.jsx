"use client";
import { getSlider } from "@/api/CartApi";
import InfoContent from "@/components/Information/InfoContent";
import dynamic from "next/dynamic";
// import InformationSideMenu from "@/components/Information/InformationSideMenu";
import Image from "next/image";
const InformationSideMenu = dynamic(
  () => import("@/components/Information/InformationSideMenu"),
  {
    ssr: false,
    loading: () => <div style={{ height: 300 }}></div>,
  }
);
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// ✅ Do NOT destructure params in the function signature
export default function Page() {
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
    // showContent()
  }, []);

  console.log("sliderImage", sliderImage);
  return (
    <div
      className="InfoContainer"
      style={
        {
          // width: "53%",
          // maxWidth: "1016px",
        }
      }
    >
      {params.slug === "terms-conditions" &&
        sliderImage?.length > 0 &&
        sliderImage?.map((data, index) => (
          <Image
            key={index}
            src={data}
            width={1117}
            height={417}
            alt="terms and condtion"
            style={
              {
                // width: "10%",
                // maxWidth: "1006px",
              }
            }
          />
        ))}

      <div className="flex-container">
        {/* <h1 className="mb-3">{content.title}</h1> */}
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            marginTop: "20px",
            justifyContent: "space-around",
          }}
        >
          <InformationSideMenu />
          <InfoContent />
        </div>
      </div>
    </div>
  );
}
