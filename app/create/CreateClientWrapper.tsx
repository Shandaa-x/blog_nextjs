// app/create/CreateClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";

const CreateClientInner = dynamic(() => import("./CreateClientInner"), {
  ssr: false,
});

export default function CreateClientWrapper() {
  return <CreateClientInner />;
}
