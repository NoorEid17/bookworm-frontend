"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const {
    state: { isAuthenticated },
  } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return <div>{children}</div>;
};

export default ProtectedRoute;
