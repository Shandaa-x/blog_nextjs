"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Lottie from "lottie-react";
import loadingAnimation from "@/public/loader.json";

export default function Loader() {
  const loading = useSelector((state: RootState) => state.ui.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/1">
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
}
