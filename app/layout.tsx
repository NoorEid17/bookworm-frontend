import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Bookworm",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="assets/favicon.ico" sizes="any" />
      </head>
      <body>
        <Providers>
          <Navbar />
          {children}
          <ToastContainer position="top-right" />
          <ReactQueryDevtools />
        </Providers>
      </body>
    </html>
  );
}
