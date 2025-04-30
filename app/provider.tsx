"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import Notifications from "@/components/Notifications";
import Loader from "@/components/Loader";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
      >
        <Navbar />
        <Loader />
        <Notifications />
        <div className="">{children}</div>
        <Footer />
      </ThemeProvider>
    </Provider>
  );
}
