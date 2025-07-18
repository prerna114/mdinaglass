import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import React from "react";
import CmsAboveMenu from "../CmsAboveMenu";
import { useMenuStore } from "@/store/useCategoryStore";
import ParagraphSkeleton from "../Skeleton/ParagraphSkeleton";
const AboutContent = ({ content }) => {
  const { cmsInfo } = useAuthStore((state) => state);
  const loading = useMenuStore((state) => state.loading);

  console.log("cmdinfor", cmsInfo);
  const cleanedHtml = cmsInfo?.html_content?.replaceAll(
    "https://mdinaglasses.blackbullsolution.com",
    ""
  );
  const links = [
    { id: 1, label: "What We Do", slug: "about-mdina-glass" },
    { id: 2, label: "A Family Tradition", slug: "a-family-tradition" },
    { id: 3, label: "Our History", slug: "our-history" },
    {
      id: 4,
      label: "Watch the Glassmakers",
      slug: "watch-the-glassmakers",
    },
  ];
  return (
    <div className="information px-5">
      <CmsAboveMenu link={links} route={"about"} />
      {loading && <ParagraphSkeleton />}
      <h2>{cmsInfo?.page_title}</h2>
      <p dangerouslySetInnerHTML={{ __html: cleanedHtml }}></p>{" "}
    </div>
  );
};

export default AboutContent;
