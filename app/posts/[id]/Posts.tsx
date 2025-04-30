"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import api from "@/lib/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { setLoading } from "@/lib/uiSlice";

dayjs.extend(relativeTime);

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

export default function PostDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoadingState] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          dispatch(setLoading(true));
          const res = await api.get(`/posts/${id}`);
          setPost(res.data);
        } catch (err) {
          console.error(err);
        } finally {
          dispatch(setLoading(false));
          setLoadingState(false);
        }
      };

      fetchPost();
    }
  }, [id, dispatch]);

  // Don't show anything until loading finishes
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">Ачааллаж байна...</p>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-[#1F2937] rounded-3xl shadow-2xl text-white mb-10">
      {post.image && (
        <img
          src={`https://blog-back-end-9h38.onrender.com${post.image}`}
          alt={post.title}
          className="w-full object-cover rounded-2xl shadow-md mb-6"
        />
      )}

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="flex items-center gap-4 mb-6">
        {post.user?.avatar ? (
          <img
            src={`https://blog-back-end-9h38.onrender.com/uploads/${post.user.avatar}`}
            alt={post.user.login_name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white text-lg font-bold">
            {post.user?.login_name[0]}
          </div>
        )}
        <div>
          <p className="font-semibold">{post.user?.login_name}</p>
          <p className="text-sm text-gray-400">
            {dayjs(post.createdAt).fromNow()}
          </p>
        </div>
        <div className="flex justify-end ml-auto">
          <p className="text-md sm:text-1xl md:text-2xl text-white">
            {post.type}
          </p>
        </div>
      </div>

      <p className="text-lg font-medium mb-6 text-gray-300">{post.brief}</p>

      <div className="leading-relaxed text-gray-200">
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
