// app/information/layout.tsx
import Link from "next/link";
import { ReactNode } from "react";

const links = [
  { label: "International Delivery", slug: "international-delivery" },
  { label: "Terms & Conditions", slug: "terms-and-conditions" },
  { label: "Privacy Policy", slug: "privacy-policy" },
  { label: "Returns & Cancellations", slug: "returns-and-cancellations" },
];

export default function InformationLayout({ children }) {
  return (
    <div className="info-layout">
      <aside className="sidebar">
        <ul>
          {links.map((link) => (
            <li key={link.slug}>
              <Link href={`/information/${link.slug}`}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}
