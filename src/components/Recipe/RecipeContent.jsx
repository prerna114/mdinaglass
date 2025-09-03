import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import React from "react";
import CmsAboveMenu from "../CmsAboveMenu";
import { useMenuStore } from "@/store/useCategoryStore";
import ParagraphSkeleton from "../Skeleton/ParagraphSkeleton";
const RecipeContent = ({ content }) => {
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
        // <ParagraphSkeleton />
        <div></div>
      ) : (
        cmsInfo == null && (
          <div className="no-data-found">{/* <h1>No data found </h1> */}</div>
        )
      )}

      <div className="about-inner-content">
        <div className="row">
          <h2>Recipe Ideas</h2>
          <p>
            We produce glassware that is both practical and decorative. We love
            the idea of our products being part of your every day living
            experience... from colourfully lighting your home, creating a
            magical candle-lit ambience, filling your environment with
            wonderfully scented aromas... to adorning your kitchen and indoor or
            outdoor tables with great food presentations.
          </p>
          <p>
            To show how our glassware can be part of your eating and drinking
            experience with friends and family, we will be adding to a careful
            selection of food and drink recipes... all featuring our handcrafted
            products which can be found online here.
          </p>
          <p>
            It will take a while for the selection to build, so please bear with
            us. You can keep updated by signing up to our newsletter (just
            scroll down to the very bottom of this page and send in your email
            address) or follow us on Facebook.
          </p>
          <p>We hope you enjoy.</p>
        </div>
      </div>

      <div className="blog-about-list">
        <div className="row">
          <div className="inner-wrapper-blog">
            <h4>Roasted Pumpkin Soup</h4>
            <p>
              Try this timeless soup that is both simple to prepare yet
              delicious.
            </p>

            <img src="/assets/blog.png" />
          </div>

          <div className="inner-wrapper-blog">
            <h4>Spinach, Avocado & Prawn Salad</h4>
            <p>
              Try this timeless soup that is both simple to prepare yet
              delicious.
            </p>

            <img src="/assets/recipe1.png" />
          </div>

          <div className="inner-wrapper-blog">
            <h4>Kale Salad with Ricotta and Plums</h4>
            <p>
              Try this timeless soup that is both simple to prepare yet
              delicious.
            </p>

            <img src="/assets/recipe2.png" />
          </div>
        </div>
      </div>

      {/* 
      <h2>{cmsInfo?.page_title}</h2>
      <p dangerouslySetInnerHTML={{ __html: cleanedHtml }}></p>{" "} */}
    </div>
  );
};

export default RecipeContent;
