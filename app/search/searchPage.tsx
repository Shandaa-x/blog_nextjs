// /app/search/SearchPage.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import api from "@/lib/api";

const PostCard = dynamic(() => import("@/components/PostCard"), { ssr: false });

interface Post {
  _id: string;
  title: string;
  brief: string;
  content: string;
  image: string;
  type: string;
  createdAt: string;
  user: {
    login_name: string;
    avatar?: string;
  };
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        &quot;{query}&quot; хайлтын үр дүн
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Ачааллаж байна...</p>
      ) : (
        <div className="w-3/5 m-auto my-10 min-h-screen">
          {filteredPosts.length > 0 ? (
            <div className="flex flex-col gap-6">
              {filteredPosts.map((post) => (
                <div className="flex flex-col gap-3" key={post._id}>
                  <PostCard post={post} onDelete={() => {}} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">Илэрц олдсонгүй.</p>
          )}
        </div>
      )}
    </div>
  );
}
