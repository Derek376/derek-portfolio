import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/notes/llm/tf-transformer",
        destination: "/notes/llm/tf-03-transformer",
        permanent: true,
      },
      {
        source: "/notes/llm/nn-03-loss",
        destination: "/notes/llm/nn-04-loss",
        permanent: true,
      },
      {
        source: "/notes/llm/nn-04-softmax",
        destination: "/notes/llm/nn-05-softmax",
        permanent: true,
      },
      {
        source: "/notes/llm/nn-05-sgd",
        destination: "/notes/llm/nn-06-sgd",
        permanent: true,
      },

      {
        source: "/notes/llm/math-05-prob",
        destination: "/notes/llm/math-06-prob",
        permanent: true,
      },
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
