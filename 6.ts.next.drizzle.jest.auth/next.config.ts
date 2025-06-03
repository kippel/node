import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NO_SECRET: process.env.NO_SECRET,
  },
};

