"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "@/lib/postSlice";
import { RootState, AppDispatch } from "@/lib/store";
import { useAuthStore } from "@/lib/authStore";
import { setLoading } from "@/lib/uiSlice";
import { useRouter } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
import PostCard from "@/components/PostCardClient";

export default function BlogPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, error } = useSelector((state: RootState) => state.posts);
  const { user } = useAuthStore();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Бүгд"); 

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(fetchPosts())
      .unwrap()
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  const handleCreatePost = () => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/create");
    }
  };

  const handleDeletePost = (postId: string) => {
    dispatch(deletePost(postId));
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "Бүгд" ||
      (activeTab === "Кино" && post.type === "Movies") ||
      (activeTab === "Аниме" && post.type === "Animes") ||
      (activeTab === "Мэдээ" && post.type === "News");
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen mt-10">
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="w-11/12 md:w-3/4 mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Хайх..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-full py-2 pl-6 pr-12 text-black placeholder-gray-400 focus:outline-none focus:ring-1 transition"
          />
          <AiOutlineSearch
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black"
            size={20}
          />
        </div>

        <div className="flex gap-6 mt-6 overflow-x-auto text-gray-500 border-b">
          {["Бүгд", "Кино", "Аниме", "Мэдээ"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm whitespace-nowrap ${
                activeTab === tab
                  ? "border-b-2 border-black text-black font-semibold"
                  : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="w-11/12 md:w-3/4 mx-auto mb-10">
        {filteredPosts.length === 0 ? (
          <div className="text-center text-gray-400">
            Нийтлэл байхгүй байна.
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onDelete={handleDeletePost}
              />
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleCreatePost}
        className="fixed bottom-6 right-6 bg-[#181818] hover:bg-cyan-500 text-white p-4 rounded-full shadow-lg transition shadow-white/30"
      >
        + Блог нэмэх
      </button>
    </div>
  );
}
