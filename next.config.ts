import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Support for Transformers.js in Vercel API routes
  serverExternalPackages: ["onnxruntime-node"],
};

export default nextConfig;
