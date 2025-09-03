import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import React from "react";
import CmsAboveMenu from "../CmsAboveMenu";
import { useMenuStore } from "@/store/useCategoryStore";
import ParagraphSkeleton from "../Skeleton/ParagraphSkeleton";
import RecipeIdea from "../RecipeIdea";
const AboutContent = ({ content }) => {
  const { cmsInfo } = useAuthStore((state) => state);
  const loading = useMenuStore((state) => state.loading);

  console.log("cmdinfor", cmsInfo);
  const cleanedHtml = cmsInfo?.html_content?.replaceAll(
    "https://mdinaglass.blackbullsolution.com",
    ""
  );
  console.log("Loading123", loading);
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
    <div className="information about-style px-5">
      <CmsAboveMenu link={links} route={"about"} />
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
      <p dangerouslySetInnerHTML={{ __html: cleanedHtml }}></p>
      <div className="reciep-display">
        <RecipeIdea />
      </div>
    </div>
  );
};

export default AboutContent;
