import type { NextConfig } from "next";

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

export default nextConfig;
