import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/components/AuthProvider";
import TokenRefresher from "@/components/TokenRefresher";

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
        <AuthProvider>
          <TokenRefresher>
            <Navbar />
            {children}
          </TokenRefresher>
        </AuthProvider>
      </body>
    </html>
  );
}
