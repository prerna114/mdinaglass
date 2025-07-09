import { notFound } from "next/navigation";

const contentMap = {
  "international-delivery": {
    title: "International Delivery",
    body: `
      We are happy to deliver to most countries around the world.
      We use insurance and carefully wrap our items to ensure their safe delivery.
      Because our glassware varies a lot in size, shape and fragility we process our international orders manually.
      You can calculate your correct shipping price in our cart to find out how much it will cost to your selected item/s to your particular country.

      Your order may be subject to import duties and/or taxes, which are levied once your package reaches your country,
      if country is outside EU. For more information regarding your country’s customs policies, please contact your local customs office.

      While we make every effort to ensure automated shipping charges are correct for individual products,
      the final shipping costs may vary. This can only be determined upon packing.
      In this case, you will be notified of the extra charge prior to dispatch.
    `,
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    body: "Here are the terms and conditions of our service...",
  },
  "privacy-policy": {
    title: "Privacy Policy & Data Protection",
    body: "Your data privacy is important to us...",
  },
  "returns-and-cancellations": {
    title: "Returns & Cancellations",
    body: "You may return items within 14 days...",
  },
};

// ✅ Do NOT destructure params in the function signature
export default async function Page(props) {
  const { params } = props;
  const content = contentMap[params.slug];

  if (!content) return notFound();

  return (
    <div className="container py-5">
      <h1 className="mb-3">{content.title}</h1>
      {content.body
        .split("\n")
        .filter((line) => line.trim())
        .map((line, idx) => (
          <p key={idx}>{line.trim()}</p>
        ))}
    </div>
  );
}
