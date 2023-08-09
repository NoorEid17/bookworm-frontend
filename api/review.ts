import { AxiosResponse } from "axios";
import axios from "./axios";
import { User } from "./user";

export interface Review {
  reviewId: number;
  rating: number;
  reviewContent: string;
  createdAt: Date;
  User: User;
}

type ReviewsResponse = {
  reviews: Review[];
  nextPage: number | undefined;
};

// that's proof that typescript sucks
export const fetchReviews = (
  bookId: number
): (({ pageParam = 1 }: { pageParam?: number }) => any) => {
  return async ({
    pageParam = 1,
  }: {
    pageParam?: number;
  }): Promise<ReviewsResponse> => {
    const { data } = await axios.get(
      "/review/" + bookId + "?page=" + pageParam
    );
    return data;
  };
};

export const fetchSingleReview = (
  bookId: number,
  userId: number
): Promise<AxiosResponse> => {
  return axios.get(`/review/single/${bookId}/${userId}`);
};

export const addRating = (data: {
  rating: number;
  reviewContent: string;
}): Promise<AxiosResponse> => {
  return axios.post("/review/add", data);
};
