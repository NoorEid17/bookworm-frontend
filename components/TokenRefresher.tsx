"use client";
import * as UserAPI from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import jwtDecode from "jwt-decode";
import { ReactNode, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Spinner from "./Spinner";

const TokenRefresher = ({ children }: { children: ReactNode }) => {
  const { dispatch } = useContext(AuthContext);
  const { data: token, isLoading } = useQuery({
    queryKey: ["users", "token"],
    queryFn: async () => await UserAPI.refreshToken(),
    refetchInterval: 1000 * 60 * 5,
    initialData: localStorage.getItem("token"),
  });

  useEffect(() => {
    if (!token) {
      return;
    }
    localStorage.setItem("token", token);
    dispatch({ type: "LOGIN", payload: jwtDecode(token) });
  }, [token]);

  return <div>{isLoading ? <Spinner className="my-72" /> : children}</div>;
};

export default TokenRefresher;
