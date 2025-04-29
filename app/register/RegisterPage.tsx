"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { setLoading, setSuccess, setError } from "@/lib/uiSlice";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    login_name: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [error] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    setTimeout(async () => {
      try {
        const formData = new FormData();
        formData.append("login_name", form.login_name);
        formData.append("email", form.email);
        formData.append("password", form.password);
        if (avatar) {
          formData.append("avatar", avatar);
        }

        await api.post("/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        dispatch(setSuccess("Амжилттай бүргүүллээ!"));
        dispatch(setLoading(false));
        router.push("/login");
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
      <h1 className="text-4xl font-bold mb-10 text-center text-cyan-400 drop-shadow-lg">
        Бүргүүлэх
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Avatar сонголт */}
        <div className="flex justify-center">
          <label className="relative cursor-pointer">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
              {preview ? (
                <img
                  src={preview}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">Choose</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        <input
          type="text"
          name="login_name"
          placeholder="Username"
          value={form.login_name}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-[#314a5d] placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-[#333] shadow-inner transition"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-[#314a5d] placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-[#333] shadow-inner transition"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-[#314a5d] placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-[#333] shadow-inner transition"
          required
        />
        <button
          type="submit"
          className="w-full py-4 mt-6 bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-cyan-500/50 transition transform hover:-translate-y-1 active:scale-95"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
