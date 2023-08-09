"use client";
import * as UserAPI from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import jwtDecode from "jwt-decode";
import { ReactNode, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Spinner from "./Spinner";

const TokenRefresher = ({ children }: { children: ReactNode }) => {
  const { dispatch } = useContext(AuthContext);
  const {
    error,
    data: response,
    isLoading,
  } = useQuery({
    queryKey: ["users", "token"],
    queryFn: async () => await UserAPI.refreshToken(),
    refetchInterval: 1000 * 60 * 5,
  });

  if (error) {
  }

  useEffect(() => {
    if (!response?.data.token) {
      return dispatch({ type: "LOGOUT" });
    }
    dispatch({ type: "LOGIN", payload: jwtDecode(response.data.token) });
  }, [response]);

  return <div>{isLoading ? <Spinner className="my-72" /> : children}</div>;
};

export default TokenRefresher;
