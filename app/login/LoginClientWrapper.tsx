// app/Login/LoginClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// dynamically import the actual page to disable SSR
const LoginPageView = dynamic(() => import("./LoginPage"), {
  ssr: false,
});

export default function LoginClientWrapper() {
  return <LoginPageView />;
}
