// app/register/RegisterClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";

const RegisterPageView = dynamic(() => import("./RegisterPage"), {
  ssr: false,
});

export default function RegisterClientWrapper() {
  return <RegisterPageView />;
}
