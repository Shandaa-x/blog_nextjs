// components/PostCardClient.tsx
"use client";
import dynamic from "next/dynamic";

const PostCard = dynamic(() => import("./PostCard"), { ssr: false });
export default PostCard;
