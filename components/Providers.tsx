"use client";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./AuthProvider";

const Providers = ({
  children,
  token,
}: {
  children: ReactNode;
  token: string;
}) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider token={token}>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default Providers;
