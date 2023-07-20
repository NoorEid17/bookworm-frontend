import axios from "./axios";
import { type AxiosResponse } from "axios";

interface UserCredentials {
  username: string;
  password: string;
}

export const login = (data: UserCredentials): Promise<AxiosResponse> => {
  return axios.post("/user/login", data, { withCredentials: true });
};

export const refreshToken = (): Promise<string> => {
  return axios
    .get("/user/token", { withCredentials: true })
    .then((res) => res.data.token);
};

export const logut = (): Promise<AxiosResponse> => {
  return axios.post("/user/logout", null, { withCredentials: true });
};

export const signup = (data: any): Promise<AxiosResponse> => {
  return axios.post("/user/signup", data);
};

export const update = (data: any) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (!value) {
      continue;
    }
    formData.append(key, value as string | Blob);
  }
  return axios.patch("/user/update", formData, { withCredentials: true });
};
