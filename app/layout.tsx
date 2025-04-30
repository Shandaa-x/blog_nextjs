// app/layout.tsx
import "./globals.css";
import ClientLayout from "./ClientLayout"; // ✅ client-only layer

export const metadata = {
  title: "Blog",
  description: "this is a blog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          <main>{children}</main>
        </ClientLayout>
      </body>
    </html>
  );
}
