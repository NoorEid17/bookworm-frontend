import { Book } from "@/components/BookCard";
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

interface BooksResponse {
  books: Book[];
  nextPage: undefined | number;
}

export const fetchBooks = async ({ pageParam = 1 }): Promise<BooksResponse> => {
  const { data } = await axios.get(`/book?page=${pageParam}`);
  return data;
};
