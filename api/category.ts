import axios from "./axios";

export interface Category {
  name: string;
  categoryId: string;
  slug: string;
}

export const createCategory = async (data: { name: string }) => {
  return axios.post("/category/create", data, { withCredentials: true });
};

export const fetchAllCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get("/category/all");
  return data.categories;
};
