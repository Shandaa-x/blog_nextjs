'use client';

import { useEffect, useState } from 'react';

export default function NotFoundPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-8">Хуудас олдсонгүй</p>
        <a 
          href="/"
          className="px-6 py-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition"
        >
          Нүүр хуудас руу буцах
        </a>
      </div>
    </div>
  );
}