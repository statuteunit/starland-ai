import type { NextConfig } from "next";
const repo = "starland-ai";
const nextConfig: NextConfig = {
  output: "export",
  /* config options here */
  reactCompiler: true,
  basePath: `/${repo}`,
  assetPrefix: `/${repo}`,
};

export default nextConfig;
