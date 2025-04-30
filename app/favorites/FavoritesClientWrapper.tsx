// app/Favorites/FavoritesClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// dynamically import the actual page to disable SSR
const FavoritesPageView = dynamic(() => import("./FavoritesPage"), {
  ssr: false,
});

export default function FavoritesClientWrapper() {
  return <FavoritesPageView />;
}
