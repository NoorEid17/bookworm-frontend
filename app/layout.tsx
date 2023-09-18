import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Bookworm",
};

async function fetchAccessToken() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/token", {
    headers: {
      Cookie: cookies().toString(),
    },
    cache: "no-cache",
  });

  if (!res.ok) {
    return {
      token: null,
    };
  }
  return res.json();
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tokenResponse = await fetchAccessToken();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="assets/favicon.ico" sizes="any" />
      </head>
      <body>
        <Providers token={tokenResponse.token}>
          <Navbar />
          {children}
          <ToastContainer position="top-right" />
          {/* <ReactQueryDevtools /> */}
        </Providers>
      </body>
    </html>
  );
}
