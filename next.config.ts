import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.unshift({
      test: /\.(t|j)sx?$/,
      exclude: /node_modules/,
      enforce: "pre",
      use: {
        loader: path.resolve(__dirname, "scripts/devModeTailwindLoader.js"),
      },
    });
    return config;
  },
};

export default nextConfig;
