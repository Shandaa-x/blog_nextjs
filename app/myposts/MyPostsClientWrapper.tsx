// app/MyPosts/MyPostsClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// dynamically import the actual page to disable SSR
const MyPostsPageView = dynamic(() => import("./MyPostsClient"), {
  ssr: false,
});

export default function MyPostsClientWrapper() {
  return <MyPostsPageView />;
}
