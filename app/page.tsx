"use client";

import { AuthContext } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { state } = useContext(AuthContext);
  const { isAuthenticated } = state;

  if (!isAuthenticated) {
    router.push("/login");
  }

  return <main className="">hello world</main>;
}
