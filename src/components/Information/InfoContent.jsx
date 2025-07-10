import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import React from "react";

const InfoContent = ({ content }) => {
  const { cmsInfo } = useAuthStore((state) => state);

  console.log("cmdinfor", cmsInfo);

  return (
    <div className="information px-5">
      <h2>{cmsInfo?.page_title}</h2>
      <p dangerouslySetInnerHTML={{ __html: cmsInfo?.html_content }}></p>
    </div>
  );
};

export default InfoContent;
