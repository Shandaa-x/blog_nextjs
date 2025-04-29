'use client';

import { create } from "zustand";

interface User {
  _id: string;
  login_name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,

  setAuth: (token, user) => {
    set({ token, user });
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Login хиймэгц Favorites татах
      import("@/lib/favoriteStore").then(async (mod) => {
        await mod.useFavoriteStore.getState().fetchFavorites();
      });
    }
  },

  logout: () => {
    set({ user: null, token: null });

    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      import("@/lib/favoriteStore").then((mod) => {
        mod.useFavoriteStore.getState().clearFavorites();
      });
    }
  },
}));
