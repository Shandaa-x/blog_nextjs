"use client";

import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1F2937] text-gray-600 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Blog System</h2>
          <p className="text-sm">
            Мэдээ мэдээллийг бусадтай хуваалцах вебсайт. Блогоо бичээд бусдын
            блогийг уншаарай.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Support
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: mungunshand6@gmail.com</li>
            <li>Phone: +976 9975-7164</li>
            <li>Location: Ulaanbaatar, Mongolia</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Social links</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <a
                href="https://www.facebook.com/shandaa.ks"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
              >
                <FaFacebook size={20} />
                Facebook
              </a>
            </li>

            <li>
              <a
                href="https://www.instagram.com/shandaa_ks/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-pink-500 hover:text-pink-600 transition"
              >
                <FaInstagram size={20} />
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700 text-center text-xs py-4">
        © {new Date().getFullYear()} Blog System.
      </div>
    </footer>
  );
}
