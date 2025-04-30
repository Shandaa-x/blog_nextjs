"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/authStore";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // New state to track client-side rendering
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/myposts", label: "My Posts" },
    { href: "/favorites", label: "Favorites" },
  ];

  useEffect(() => {
    // This runs only on the client-side to prevent server/client mismatch
    setIsClient(true);

    if (user?.avatar) {
      setAvatarUrl(`https://blog-back-end-9h38.onrender.com/uploads/${user.avatar}`);
    }

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, user]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Return null or a loading state if we're still waiting for client-side data to load
  if (!isClient) {
    return null;
  }

  return (
    <div
      className={`flex items-center justify-between p-4 shadow bg-[#1F2937] sticky top-0 text-white transition-transform duration-300 z-50 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex-1 flex items-center gap-3">
        <Link href="/" className="text-2xl font-bold text-cyan-400 hidden md:block">
          Blog
        </Link>

        <div className="flex items-center gap-2 md:hidden">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-sm">
              {user?.login_name ? user.login_name[0].toUpperCase() : "?"}
            </div>
          )}
          {user && <span className="text-sm font-medium">{user.login_name}</span>}
        </div>
      </div>

      <nav className="flex-1 hidden md:flex justify-center items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-2 text-lg ${
              pathname === link.href
                ? "text-cyan-400 font-semibold border-b-2 border-cyan-400 pb-1"
                : "text-white hover:text-cyan-400"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex-1 flex justify-end items-center gap-4">
        {/* Desktop Avatar + Name + Logout */}
        <div className="hidden md:flex items-center gap-4">
          {user && (
            <>
              {/* Avatar and User Info */}
              <div className="flex items-center gap-2">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-sm">
                    {user?.login_name ? user.login_name[0].toUpperCase() : "?"}
                  </div>
                )}
                <span className="text-sm font-medium">{user.login_name}</span>
              </div>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition"
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <>
              <Link href="/register" className="px-4 py-2 text-cyan-400 rounded hover:underline">
                Sign up
              </Link>
              <Link href="/login" className="px-4 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition">
                Log in
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden cursor-pointer" onClick={() => setIsMobileMenuOpen(true)}>
          Menu
        </div>
      </div>
    </div>
  );
}
