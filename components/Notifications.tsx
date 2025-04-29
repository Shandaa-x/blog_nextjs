"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { clearMessages } from "@/lib/uiSlice";
import { useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"; // Icons

export default function Notifications() {
  const { error, success } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success, dispatch]);

  if (!error && !success) return null;

  return (
    <div className="fixed top-6 right-6 z-50 space-y-2">
      {error && (
        <div className="flex items-center gap-3 bg-red-600 text-white px-6 py-4 rounded-xl shadow-lg animate-slide-in">
          <AiOutlineCloseCircle size={24} className="text-white" />
          <div className="text-sm font-medium">{error}</div>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-3 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg animate-slide-in">
          <AiOutlineCheckCircle size={24} className="text-white" />
          <div className="text-sm font-medium">{success}</div>
        </div>
      )}
    </div>
  );
}
