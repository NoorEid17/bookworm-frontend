"use client";
import * as UserAPI from "@/api/user";
import jwtDecode from "jwt-decode";
import { ReactNode, useEffect, useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import Spinner from "./Spinner";

const TokenRefresher = ({ children }: { children: ReactNode }) => {
  const { dispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function refreshToken() {
      const response = await UserAPI.refreshToken();
      if (response.statusText !== "OK") {
        setIsLoading(false);
        return;
      }
      const user = await jwtDecode(response.data.token);
      dispatch({ type: "LOGIN", payload: user });
      setIsLoading(false);
    }
    refreshToken();
  }, []);

  return <div>{isLoading ? <Spinner /> : children}</div>;
};

export default TokenRefresher;
