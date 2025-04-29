'use client';

import { create } from "zustand";
import api from "@/lib/api"; 

interface FavoriteItem {
  post: string;
}

interface FavoriteState {
  favorites: string[];
  fetchFavorites: () => Promise<void>;
  addFavorite: (postId: string) => void;
  removeFavorite: (postId: string) => void;
  clearFavorites: () => void; 
}

export const useFavoriteStore = create<FavoriteState>((set) => ({
  favorites: [],
  fetchFavorites: async () => {
    try {
      const res = await api.get("/favorites");
      
      const postIds = res.data.map((fav: FavoriteItem) => fav.post);
      set({ favorites: postIds });
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    }
  },
  addFavorite: (postId) =>
    set((state) => ({ favorites: [...state.favorites, postId] })),
  removeFavorite: (postId) =>
    set((state) => ({ favorites: state.favorites.filter((id) => id !== postId) })),
  clearFavorites: () => set({ favorites: [] }), 
}));
