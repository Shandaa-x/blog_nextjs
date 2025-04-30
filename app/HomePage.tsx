"use client";

import { useAuthStore } from "@/lib/authStore";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { user } = useAuthStore();
  const router = useRouter();

  const handleCreatePost = () => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/create");
      console.log("User infoooooooooo:", user);
    }
  };

  return (
    <div style={{ backgroundColor: "#1F2937" }}>
      <div className="relative w-full">
        <img
          src="/landingHuman.png"
          alt="Landing Human"
          className="w-full h-auto object-cover"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-20">
          <h1 className="text-1xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-4 text-white drop-shadow-lg leading-tight">
            Манай системд <br />
            тавтай морилно уу!
          </h1>
        </div>
      </div>

      <div className=" w-full flex flex-col lg:flex-row items-center">
        {/* Background img */}
        <div className="w-full lg:w-1/2 sm:w-3/5 dm:w-2/5">
          <img
            src="/group7.png"
            alt="Group 7"
            className="w-full h-auto object-cover object-right"
          />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
          <p className="text-1xl sm:text-1xl md:text-1xl lg:text-2xl 2xl:text-2xl text-left text-gray-200 leading-relaxed">
            Манай блог руу зочлон хамгийн сүүлийн мэдээ, нийтлэл, кино,
            анимегийн талаарх мэдээллүүдийг уншаарай. Сонирхолтой агуулгуудыг
            танд зориулан өдөр бүр шинэчлэн хүргэж байна.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center mt-6">
        <button
          className="bg-[#181818] hover:bg-cyan-500 text-white p-5 rounded-full shadow-lg transition shadow-white/5"
          onClick={handleCreatePost}
        >
          Блог үүсгэх
        </button>
      </div>
    </div>
  );
}
