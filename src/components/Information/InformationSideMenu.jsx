"use client";

import { CmsInformation } from "@/api/Customer";
import { useAuthStore } from "@/store/useAuthStore";
import { useMenuStore } from "@/store/useCategoryStore";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import RecipeIdea from "../RecipeIdea";

const InformationSideMenu = () => {
  const [active, setActive] = useState();
  const params = useParams();
  const { setCmsInfo } = useAuthStore((state) => state);
  const setLoading = useMenuStore((state) => state.setLoading);

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

  const getInformation = async () => {
    setLoading(true);
    const data = await CmsInformation(params.slug);
    if (data.status == 200) {
      if (data?.data) {
        setCmsInfo(data?.data);
        console.log("CMSINFROMTIOn", data?.data);
        setLoading(false);
      } else {
        setCmsInfo(null);
        setLoading(false);
      }
    }
    // if()
  };

  useEffect(() => {
    if (!params?.slug) return;
    const current = links.find((link) => link.slug === params.slug);
    if (current) setActive(current.id);
    getInformation();
  }, [params?.slug]);

  return (
    <aside className="col-lg-3 col-md-3 col-sm-4 sidebar">
      <h1>Information</h1>
      <ul>
        {links.map((link) => (
          <li key={link.slug}>
            <Link
              className={link.id === active ? "activeTab" : "nonActiveBar"}
              href={`/information/${link.slug}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <RecipeIdea />
    </aside>
  );
};

export default InformationSideMenu;
