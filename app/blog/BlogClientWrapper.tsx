// app/Blog/BlogClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// dynamically import the actual page to disable SSR
const BlogPageView = dynamic(() => import("./BlogPage"), {
  ssr: false,
});

export default function BlogClientWrapper() {
  return <BlogPageView />;
}
