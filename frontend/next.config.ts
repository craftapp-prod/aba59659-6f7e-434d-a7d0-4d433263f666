import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/customer/aba59659-6f7e-434d-a7d0-4d433263f666',
  assetPrefix: '/customer/aba59659-6f7e-434d-a7d0-4d433263f666',
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "*",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: process.env.NEXT_PUBLIC_BACKEND_PORT,
        pathname: "/v1/assets/**",
      },
    ],
    unoptimized: true,
  },
  output: "export",
  trailingSlash: true,
  distDir: "out",
};

export default nextConfig;
