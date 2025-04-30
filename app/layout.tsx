
import "./globals.css";
import Providers from "./provider";

export const metadata = {
  title: "Blog",
  description: "this is a blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <main>
          <Providers>
          {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
