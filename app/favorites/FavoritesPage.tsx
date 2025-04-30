"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/authStore";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setSuccess, setError } from "@/lib/uiSlice";
import { AppDispatch } from "@/lib/store";
import PostCard from "@/components/PostCardClient";

interface PopulatedUser {
  login_name: string;
  avatar?: string;
}

interface Favorite {
  _id: string;
  post: string | { _id: string };
  title: string;
  brief: string;
  content: string;
  image: string;
  type: string;
  postOwner: string;
  postOwnerLoginName: string;
  postOwnerAvatar: string;
  createdAt: string;
  user: PopulatedUser | string;
}

interface UiState {
  loading: boolean;
  success: string | null;
  error: string | null;
}

export default function FavoritesPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, success, error } = useSelector(
    (state: { ui: UiState }) => state.ui
  );

  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchFavoritePosts = async () => {
      try {
        dispatch(setLoading(true));
        const res = await api.get("/favorites");
        setFavorites(res.data);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
        dispatch(setError("Failed to fetch favorites."));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchFavoritePosts();
  }, [user, router, dispatch]);

  const handleRemoveFavorite = async (postId: string) => {
    try {
      const res = await api.post("/favorites/remove", { postId });
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) =>
          typeof favorite.post === "string"
            ? favorite.post !== postId
            : favorite.post._id !== postId
        )
      );
      dispatch(setSuccess(res.data.message || "Post removed from favorites!"));
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      dispatch(setError("Failed to remove favorite."));
    }
  };

  return (
    <div className="min-h-screen mt-10">
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p> 
      ) : favorites.length === 0 ? (
        <p className="text-center text-gray-400">
          Танд хадгалсан нийтлэл байхгүй байна.
        </p>
      ) : (
        <div className="flex flex-col gap-3 w-5/8 m-auto">
          {favorites.map((favorite) => {
            const postId =
              typeof favorite.post === "string"
                ? favorite.post
                : favorite.post._id;

            return (
              <PostCard
                key={favorite._id}
                post={{
                  _id: postId,
                  title: favorite.title,
                  brief: favorite.brief,
                  content: favorite.content,
                  type: favorite.type,
                  image: favorite.image,
                  createdAt: favorite.createdAt,
                  user: {
                    login_name: favorite.postOwnerLoginName,
                    avatar: favorite.postOwnerAvatar,
                  },
                }}
                onUnfavorite={() => handleRemoveFavorite(postId)}
                onDelete={() => handleRemoveFavorite(postId)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
