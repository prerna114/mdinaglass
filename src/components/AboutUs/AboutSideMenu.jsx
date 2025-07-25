"use client";

import { CmsInformation } from "@/api/Customer";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CustomToast } from "../CustomToast";
import { useMenuStore } from "@/store/useCategoryStore";

const AboutSideMenu = () => {
  const [active, setActive] = useState();
  const params = useParams();
  const { setCmsInfo } = useAuthStore((state) => state);
  const setLoading = useMenuStore((state) => state.setLoading);

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

  const getInformation = async () => {
    setLoading(true);
    const data = await CmsInformation(params.slug);
    console.log("getInformation123", data);
    if (data.status == 200) {
      if (data?.data) {
        setCmsInfo(data?.data);
        setLoading(false);
        console.log("CMSINFROMTIOn", data?.data);
      } else {
        setCmsInfo(null);
        setLoading(false);

        CustomToast("Something went wrong", "top-right");
      }
      setLoading(false);
    } else {
      setLoading(false);
      CustomToast("Something went wrong", "top-right");
    }
    // if()
  };

  useEffect(() => {
    if (!params?.slug) return;
    const current = links.find((link) => link.slug === params.slug);
    if (current) {
      setActive(current.id);
    } else {
      setActive(1);
    }
    getInformation();
  }, [params?.slug]);

  return (
    <aside className="sidebar">
      <h1>About Us</h1>
      <ul>
        {links.map((link) => (
          <li key={link.slug}>
            <Link
              className={link.id === active ? "activeTab" : "nonActiveBar"}
              href={`/about/${link.slug}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AboutSideMenu;
