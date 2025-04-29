"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import Notifications from "@/components/Notifications";
import Loader from "@/components/Loader";
import Head from "next/head"; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>My Blog - Share Your Stories</title>
        <meta name="description" content="My Blog is a place to share your posts, thoughts, and favorite articles." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content="My Blog - Share Your Stories" />
        <meta property="og:description" content="Create, share, and explore blogs with My Blog platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:image" content="https://yourdomain.com/og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Blog - Share Your Stories" />
        <meta name="twitter:description" content="Create, share, and explore blogs with My Blog platform." />
        <meta name="twitter:image" content="https://yourdomain.com/og-image.png" />
      </Head>

      <body className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <Provider store={store}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
          >
            <Navbar />

            <Loader />
            <Notifications />

            <main className="">
              {children}
            </main>

            <Footer />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
