import axios from "./axios";
import { type AxiosResponse } from "axios";

interface UserCredentials {
  username: string;
  password: string;
}

export const login = (data: UserCredentials): Promise<AxiosResponse> => {
  return axios.post("/user/login", data, { withCredentials: true });
};

export const refreshToken = (): Promise<AxiosResponse> => {
  return axios.get("/user/token", { withCredentials: true });
};

export const logut = (): Promise<AxiosResponse> => {
  return axios.post("/user/logout", null, { withCredentials: true });
};
