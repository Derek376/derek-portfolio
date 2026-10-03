import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/notes/rabbitmq",
        destination: "/blogs/rabbitmq",
        permanent: true,
      },
    ];
  },
};

export default createMDX()(nextConfig);
