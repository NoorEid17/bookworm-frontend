"use client";
import { useQuery } from "@tanstack/react-query";
import jwtDecode from "jwt-decode";
import React, {
  createContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import * as UserAPI from "@/api/user";
import Spinner from "./Spinner";
import axios from "@/api/axios";

const initialState = (token?: string) => {
  if (token) {
    return {
      isAuthenticated: true,
      user: jwtDecode(token),
    };
  }
  return {
    isAuthenticated: false,
    user: null,
  };
};

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export type AuthContext = {
  state: {
    isAuthenticated: boolean;
    user: any;
  };
  dispatch: Dispatch<any>;
};

export const AuthContext = createContext<AuthContext>({
  state: initialState(),
  dispatch: () => null,
});

export const AuthProvider = ({
  children,
  token,
}: {
  children: ReactNode;
  token: string;
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState(token));
  const {
    error,
    data: response,
    isLoading,
  } = useQuery({
    queryKey: ["users", "token"],
    queryFn: async () => await UserAPI.refreshToken(),
    refetchInterval: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!response) {
      return;
    }
    const token = response?.data.token;
    axios.defaults.headers["Authorization"] = `bearer ${token}`;
    if (response?.statusText !== "OK") {
      dispatch({ type: "LOGOUT" });
      return;
    }
    dispatch({ type: "LOGIN", payload: jwtDecode(token) });
  }, [response, error]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {isLoading ? <Spinner className="my-72 text-center" /> : children}
    </AuthContext.Provider>
  );
};
