"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import api from "@/lib/api";
import { useDispatch } from "react-redux";
import { setLoading, setSuccess, setError } from "@/lib/uiSlice";
import { AppDispatch } from "@/lib/store";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

type RichTextEditorHandle = {
  getContent: () => string;
};

export default function CreatePostPage() {
  const editorRef = useRef<RichTextEditorHandle>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState({
    title: "",
    brief: "",
    content: "",
    type: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editorRef.current) {
      console.error("Editor not ready");
      return;
    }

    const editorContent = editorRef.current.getContent();
    console.log("HTML content:", editorContent);

    dispatch(setLoading(true));

    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("brief", form.brief);
      formData.append("content", editorContent);
      formData.append("type", form.type);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await api.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(setSuccess(res.data.message || "Пост амжилттай үүслээ!"));
      router.push("/blog");
    } catch (err: unknown) {
      console.error(err);

      // Check if the error is an instance of Error
      if (err instanceof Error) {
        dispatch(setError(err.message || "Пост үүсгэхэд алдаа гарлаа"));
      } else {
        dispatch(setError("Пост үүсгэхэд алдаа гарлаа"));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-[#1F2937] rounded-3xl shadow-2xl text-white mb-10">
      <h1 className="text-4xl font-bold mb-10 text-center text-cyan-400 drop-shadow-lg">
        Пост үүсгэх
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="title"
          placeholder="Гарчиг..."
          value={form.title}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-[#314a5d] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-[#333] shadow-inner transition"
          required
        />

        <textarea
          name="brief"
          placeholder="Товч тайлбар..."
          value={form.brief}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-[#314a5d] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-[#333] shadow-inner transition"
          required
        />

        <div className="space-y-4">
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full object-cover rounded-2xl shadow-md"
            />
          )}
          <label className="block w-full cursor-pointer rounded-xl bg-[#314a5d] p-4 text-center hover:bg-[#314a5d] transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <span className="text-gray-400">Зураг сонгох (дарна уу)</span>
          </label>
        </div>

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-[#314a5d] text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-[#333] shadow-inner transition"
          required
        >
          <option value="" disabled>
            Төрөл сонгох...
          </option>
          <option value="Movies">Кино</option>
          <option value="News">Мэдээ</option>
          <option value="Animes">Анимэ</option>
        </select>

        <div className="bg-[#8c8c8c] rounded-xl p-4 focus-within:ring-2 focus-within:ring-cyan-500 transition">
          <RichTextEditor ref={editorRef} />
        </div>

        <button
          type="submit"
          className="w-full py-4 mt-6 bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-cyan-500/50 transition transform hover:-translate-y-1 active:scale-95"
        >
          Пост үүсгэх
        </button>
      </form>
    </div>
  );
}
