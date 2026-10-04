import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/notes/llm/math-04-gradient",
        destination: "/notes/llm/math-05-gradient",
        permanent: true,
      },
      {
        source: "/notes/llm/math-03-transform",
        destination: "/notes/llm/math-04-transform",
        permanent: true,
      },
      {
        source: "/notes/rabbitmq",
        destination: "/blogs/rabbitmq",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-math"],
    rehypePlugins: [["rehype-katex", { strict: "error", throwOnError: true }]],
  },
});

export default withMDX(nextConfig);
