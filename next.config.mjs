import createBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  images: {
    domains: ["mdinaglasses.blackbullsolution.com"],
  },
  // other configs if any
};

export default withBundleAnalyzer(nextConfig);
