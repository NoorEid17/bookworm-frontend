"use client";
import jwtDecode from "jwt-decode";
import React, {
  createContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

const initialState = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return {
      isAuthenticated: false,
      user: null,
    };
  }

  return {
    isAuthenticated: true,
    user: jwtDecode(token),
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
  dispatch: (() => null) as Dispatch<any>,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState());

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
