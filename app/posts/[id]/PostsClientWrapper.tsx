// app/MyPosts/MyPostsClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// dynamically import the actual page to disable SSR
const PostsPageView = dynamic(() => import("./Posts"), {
  ssr: false,
});

export default function PostsClientWrapper() {
  return <PostsPageView />;
}
