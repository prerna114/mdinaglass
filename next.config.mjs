import createBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  // your existing config (add/merge as needed)
};

export default withBundleAnalyzer(nextConfig);
