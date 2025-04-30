// app/MyPosts/MyPostsClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// dynamically import the actual page to disable SSR
const SearchPageView = dynamic(() => import("./searchPage"), {
  ssr: false,
});

export default function PostsClientWrapper() {
  return <SearchPageView />;
}
