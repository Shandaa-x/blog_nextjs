'use client';

import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useAuthStore } from "@/lib/authStore";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { setLoading, setSuccess, setError } from "@/lib/uiSlice";
import api from "@/lib/api";
import { useFavoriteStore } from "@/lib/favoriteStore";

dayjs.extend(relativeTime);

interface PostProps {
  post: {
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
  };
  onDelete: (postId: string) => void;
  initialFavorite?: boolean;
  onUnfavorite?: (postId: string) => void;
}

export default function PostCard({
  post,
  onDelete,
  onUnfavorite,
}: PostProps) {
  const { user } = useAuthStore();
  const dispatch = useDispatch<AppDispatch>();
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
  const isFavorite = favorites.includes(post._id);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleFavorite = async () => {
    dispatch(setLoading(true));
    try {
      if (isFavorite) {
        const res = await api.post("/favorites/remove", { postId: post._id });
        removeFavorite(post._id);
        dispatch(setSuccess(res.data.message || "Removed from favorites"));
        if (onUnfavorite) onUnfavorite(post._id);
      } else {
        const res = await api.post("/favorites/add", { postId: post._id });
        addFavorite(post._id);
        dispatch(setSuccess(res.data.message || "Added to favorites"));
      }
    } catch (err: unknown) { 
      console.error("Favorite error:", err);

      if (err instanceof Error && err.message) {
        dispatch(setError(err.message || "Error toggling favorite"));
      } else {
        dispatch(setError("Error toggling favorite"));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deletePost = async () => {
    setShowConfirm(false);
    dispatch(setLoading(true));
    try {
      const res = await api.delete(`/posts/${post._id}`);
      dispatch(setSuccess(res.data.message || "Post deleted successfully"));
      onDelete(post._id);
    } catch (err: unknown) { 
      console.error("Delete post error:", err);
    
      if (err instanceof Error && err.message) {
        dispatch(setError("Error deleting post"));
      } else {
        dispatch(setError("Error deleting post"));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const isMyPost = user?.login_name === post.user?.login_name;

  return (
    <>
      {/* Post Card */}
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden p-4 gap-4">
        {/* Left: Text Section */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              {post.user?.avatar ? (
                <img
                  src={`http://localhost:5000/uploads/${post.user.avatar}`}
                  alt={post.user.login_name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm font-bold">
                  {post.user?.login_name[0]}
                </div>
              )}
              <span>posted by {post.user?.login_name}</span>
            </div>

            <Link href={`/posts/${post._id}`} className="group">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:underline mb-2 line-clamp-2">
                {post.brief}
              </h2>
              <p className="text-gray-600 text-base line-clamp-2">{post.title}</p>
            </Link>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 mt-4">
            <span>{dayjs(post.createdAt).format("MMM D, YYYY")}</span>
            <div className="flex items-center gap-4">
              {isMyPost && (
                <>
                  <Link href={`/edit/${post._id}`} className="hover:underline">
                    Edit
                  </Link>
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="hover:underline text-red-500"
                  >
                    Delete
                  </button>
                </>
              )}
              <button onClick={toggleFavorite}>
                {isFavorite ? (
                  <AiFillHeart size={18} className="text-red-500" />
                ) : (
                  <AiOutlineHeart size={18} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Image Section */}
        {post.image && (
          <div className="w-full md:w-40 flex-shrink-0">
            <img
              src={`http://localhost:5000${post.image}`}
              alt="Post"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        )}
      </div>

      {/* Confirm Delete Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl w-80 text-center space-y-6">
            <h2 className="text-xl font-bold">Та устгахдаа итгэлтэй байна уу?</h2>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-6 py-2 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold transition"
              >
                Болих
              </button>

              <button
                onClick={deletePost}
                className="px-6 py-2 rounded-full bg-[#1F2937] hover:bg-cyan-500 text-white font-semibold transition"
              >
                Устгах
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
