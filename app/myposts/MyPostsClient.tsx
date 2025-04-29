"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/authStore";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import PostCard from "@/components/PostCard";

interface PopulatedUser {
  login_name: string;
  avatar?: string;
}

interface Post {
  _id: string;
  title: string;
  brief: string;
  content: string;
  type: string;
  image: string;
  createdAt: string;
  user: PopulatedUser | string;
}

export default function MyPostsClient() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchMyPosts = async () => {
      try {
        const res = await api.post("/posts/user", {
          login_name: user?.login_name,
        });
        setPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [user, router]);

  const handleDeletePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  return (
    <div className="min-h-screen mt-10">
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p> 
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-400">
          Та одоогоор нийтлэл оруулаагүй байна.
        </p>
      ) : (
        <div className="flex flex-col gap-3 w-5/8 m-auto">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={{
                ...post,
                user:
                  typeof post.user === "string"
                    ? { login_name: "Unknown", avatar: undefined }
                    : post.user,
              }}
              onDelete={handleDeletePost}
            />
          ))}
        </div>
      )}
    </div>
  );
}
