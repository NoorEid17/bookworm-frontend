"use client";
import * as UserAPI from "@/api/user";
import jwtDecode from "jwt-decode";
import { ReactNode, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider";

const TokenRefresher = ({ children }: { children: ReactNode }) => {
  const { dispatch } = useContext(AuthContext);
  useEffect(() => {
    async function refreshToken() {
      const response = await UserAPI.refreshToken();
      if (response.statusText !== "OK") {
        return;
      }
      const user = await jwtDecode(response.data.token);
      console.log(user);
      dispatch({ type: "LOGIN", payload: user });
    }
    refreshToken();
  }, []);

  return <div>{children}</div>;
};

export default TokenRefresher;
