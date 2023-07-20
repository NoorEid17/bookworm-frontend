import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import TokenRefresher from "@/components/TokenRefresher";
import Providers from "@/components/Providers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
          <TokenRefresher>
            <Navbar />
            {children}
          </TokenRefresher>
          <ReactQueryDevtools />
        </Providers>
      </body>
    </html>
  );
}
