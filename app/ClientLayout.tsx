// app/ClientLayout.tsx
"use client";

import Providers from "./provider"; // this includes Navbar, Footer, etc.

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
