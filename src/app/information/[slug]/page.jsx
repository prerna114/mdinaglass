"use client";
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
import { useEffect } from "react";

// ✅ Do NOT destructure params in the function signature
export default function Page() {
  const params = useParams();
  console.log("paramsInfromation", params.slug);

  useEffect(() => {
    // showContent()
  }, []);
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
      {params.slug === "terms-conditions" && (
        <Image
          src="/assets/termscondition.webp"
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
      )}

      <div className="flex-container">
        {/* <h1 className="mb-3">{content.title}</h1> */}

        <InformationSideMenu />
        <InfoContent />
      </div>
    </div>
  );
}
