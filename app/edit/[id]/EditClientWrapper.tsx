// app/Edit/EditClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// dynamically import the actual page to disable SSR
const EditPageView = dynamic(() => import("./EditPage"), {
  ssr: false,
});

export default function EditClientWrapper() {
  return <EditPageView />;
}
