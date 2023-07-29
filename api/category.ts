import axios from "./axios";

export const createCategory = async (data: { name: string }) => {
  return axios.post("/category/create", data, { withCredentials: true });
};

export const fetchAllCategories = async () => {
  return axios.get("/category/all");
};
