import type { NextConfig } from "next";
// Swap picsum for your own image host/CDN when real photos are ready.
const config: NextConfig = { images: { remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }] } };
export default config;
