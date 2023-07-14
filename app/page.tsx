"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <main className="">hello world</main>
    </ProtectedRoute>
  );
}
