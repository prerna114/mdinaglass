"use client";
import ContactContent from "@/components/ContactUs/ContactContent";
import ContactSideMenu from "@/components/ContactUs/ContactSideMenu";
import React from "react";
const page = () => {
  return (
    <div className="container">
      <iframe
        src="https://www.google.com/maps?q=Mdina+Glass,+Ta'+Qali&output=embed"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          marginTop: "20px",
        }}
      >
        <ContactSideMenu />
        <ContactContent />
      </div>
    </div>
  );
};

export default page;
