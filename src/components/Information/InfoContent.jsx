import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import React from "react";
import CmsAboveMenu from "../CmsAboveMenu";
import ParagraphSkeleton from "../Skeleton/ParagraphSkeleton";
import { useMenuStore } from "@/store/useCategoryStore";

const InfoContent = ({ content }) => {
  const { cmsInfo } = useAuthStore((state) => state);
  const loading = useMenuStore((state) => state.loading);

  console.log("cmdinfor", cmsInfo);
  const links = [
    { id: 1, label: "International Delivery", slug: "international-delivery" },
    { id: 2, label: "Terms & Conditions", slug: "terms-conditions" },
    { id: 3, label: "Privacy Policy", slug: "privacy-policy" },
    {
      id: 4,
      label: "Returns & Cancellations",
      slug: "return-policy",
    },
  ];
  return (
    <div className="information px-5">
      {/* <InfoAboveMenu /> */}
      <CmsAboveMenu link={links} route={"information"} />
      {loading ? (
        <ParagraphSkeleton />
      ) : (
        cmsInfo == null && (
          <div className="no-data-found">
            <h1>No data found </h1>
          </div>
        )
      )}
      <h2>{cmsInfo?.page_title}</h2>
      <p dangerouslySetInnerHTML={{ __html: cmsInfo?.html_content }}></p>
    </div>
  );
};

export default InfoContent;
