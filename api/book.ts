import axios from "./axios";

export const addBook = async (data: any) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (key === "categories") {
      for (const categoryId of value as string[]) {
        formData.append("categories[]", categoryId);
      }
    } else {
      formData.append(key, value as string | Blob);
    }
  }
  return axios.post("/book/create", formData, { withCredentials: true });
};
