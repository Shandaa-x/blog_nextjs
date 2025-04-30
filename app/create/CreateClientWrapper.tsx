// app/create/CreateClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// dynamically import the actual page to disable SSR
const CreatePageView = dynamic(() => import("./CreatePage"), {
  ssr: false,
});

export default function CreateClientWrapper() {
  return <CreatePageView />;
}
