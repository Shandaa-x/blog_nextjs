// /app/search/page.tsx
"use client";

import { Suspense } from "react";
import SearchPage from "./searchPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Уншиж байна...</div>}>
      <SearchPage />
    </Suspense>
  );
}
