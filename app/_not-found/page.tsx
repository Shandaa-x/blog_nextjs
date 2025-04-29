'use client';

import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    console.log('NotFound page rendered on the client side');
  }, []);

  return (
    <div className="text-center mt-20">
      <h1>Уучлаарай, хуудас олдсонгүй!</h1>
    </div>
  );
}