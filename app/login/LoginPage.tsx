"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";
import { useDispatch } from "react-redux";
import { setLoading, setSuccess, setError } from "@/lib/uiSlice";
import { AppDispatch } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState({
    login_name: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    setTimeout(async () => {
      try {
        const res = await api.post("/login", form);
        const { token, user } = res.data;
  
        localStorage.setItem("token", token);
        setAuth(token, user);
  
        dispatch(setSuccess("Амжилттай нэвтэрлээ!"));
        dispatch(setLoading(false));
        router.push("/blog");
      } catch (err: unknown) { 
        console.error(err);
  
        if (err instanceof Error && err.message) {
          dispatch(setError("Aлдаа гарлаа"));
        } else {
          dispatch(setError("Aлдаа гарлаа"));
        }
        dispatch(setLoading(false));
      }
    }, 1000);
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white dark:bg-[#1F2937] rounded shadow rounded-3xl mb-10">
      <h1 className="text-3xl font-bold mb-10 text-center text-cyan-400 drop-shadow-lg">
        Log In
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="login_name"
          placeholder="Username"
          value={form.login_name}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-[#314a5d] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-[#333] shadow-inner transition"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-[#314a5d] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-[#333] shadow-inner transition"
          required
        />
        <button
          type="submit"
          className="w-full py-4 mt-6 bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-cyan-500/50 transition transform hover:-translate-y-1 active:scale-95"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
