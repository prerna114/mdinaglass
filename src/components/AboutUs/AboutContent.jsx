import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import React from "react";

const AboutContent = ({ content }) => {
  const { cmsInfo } = useAuthStore((state) => state);

  console.log("cmdinfor", cmsInfo);
  const cleanedHtml = cmsInfo?.html_content?.replaceAll(
    "https://mdinaglasses.blackbullsolution.com",
    ""
  );
  return (
    <div className="information px-5">
      <h2>{cmsInfo?.page_title}</h2>
      <p dangerouslySetInnerHTML={{ __html: cleanedHtml }}></p>{" "}
    </div>
  );
};

export default AboutContent;
