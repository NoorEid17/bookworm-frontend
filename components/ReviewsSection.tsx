"use client";

import {
  addRating,
  fetchReviews,
  fetchSingleReview,
  Review,
} from "@/api/review";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { FieldError, useForm, UseFormRegister } from "react-hook-form";
import { AuthContext } from "./AuthProvider";
import { RatingStars } from "./BookCard";
import Spinner from "./Spinner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

export const ReviewsSection = ({ bookId }: { bookId: number }) => {
  const { isLoading, isError, data, isFetching, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["reviews", bookId],
      getNextPageParam: (lastPage, pages) => (lastPage as any).nextPage,
      queryFn: fetchReviews(bookId),
    });
  const [myReviewId, setMyReviewId] = useState<number>(0);
  const {
    state: { isAuthenticated },
  } = useContext(AuthContext);

  return (
    <section className="mt-14">
      {isAuthenticated && (
        <MyReviewSection bookId={bookId} setMyReviewId={setMyReviewId} />
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h3 className="text-2xl text-primary font-bold mb-5">Reviews: </h3>
          {data?.pages.map((page) =>
            page.reviews
              .filter((review: Review) => review.reviewId !== myReviewId)
              .map((review: Review) => {
                return <ReviewCard review={review} />;
              })
          )}
        </>
      )}
    </section>
  );
};

export const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="grid grid-cols-5">
      <figure>
        <Image
          src={
            `http://localhost:5000/uploads/${review.User.avatar}` ||
            "/assets/user.png"
          }
          height={75}
          width={75}
          alt="user avatar"
          className="rounded-full"
        />
      </figure>
      <div className="col-span-3">
        <h5 className=" font-bold">
          <Link href={"/user/" + review.User.username}>
            {review.User.fullName}
          </Link>
        </h5>
        <RatingStars rating={review.rating} className="text-2xl mt-2" />
        <p className="whitespace-pre-line text-gray-500">
          {review.reviewContent}
        </p>
      </div>
    </div>
  );
};

export const MyReviewSection = ({
  bookId,
  setMyReviewId,
}: {
  bookId: number;
  setMyReviewId: Dispatch<SetStateAction<number>>;
}) => {
  const {
    state: { user },
  } = useContext(AuthContext);
  const { data: response } = useQuery({
    queryKey: ["reviews", bookId, user.userId],
    queryFn: () => fetchSingleReview(bookId, user.userId),
    enabled: !!user,
  });
  const [myReview, setMyReview] = useState<Review>();

  useEffect(() => {
    const myReview: Review = response?.data.review;
    if (myReview) {
      setMyReview(myReview);
      setMyReviewId(myReview.reviewId);
    }
  }, [response]);

  return (
    <section>
      {myReview ? (
        <ReviewCard review={myReview} />
      ) : (
        <ReviewCreator bookId={bookId} />
      )}
    </section>
  );
};

const ratingSchema = yup.object({
  rating: yup.number().integer().min(1).max(5).required(),
  reviewContent: yup.string().max(1000).optional(),
});

export const ReviewCreator = ({ bookId }: { bookId: number }) => {
  const {
    state: { user },
  } = useContext(AuthContext);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(ratingSchema),
  });
  const queryClient = useQueryClient();
  const addRatingMutation = useMutation({
    mutationKey: ["reviews", bookId, user.userId],
    mutationFn: (data: any) => addRating(data),
    onSuccess: (response: AxiosResponse, variables, context) => {
      if (response.status !== 201) {
        toast.error("something went wrong!");
        return;
      }
      toast.success("Book rated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["reviews", bookId, user.userId],
      });
    },
  });
  const submitHanlder = (data: any) =>
    addRatingMutation.mutate({ ...data, bookId });

  return (
    <section className="my-4 w-full">
      <form onSubmit={handleSubmit(submitHanlder)}>
        <div className="grid grid-cols-5">
          <figure>
            <Image
              src={
                user.avatar
                  ? `http://localhost:5000/uploads/${user.avatar}`
                  : "/assets/user.png"
              }
              height={75}
              width={75}
              alt="user avatar"
              className="rounded-full"
            />
          </figure>
          <div className="col-span-3">
            <div className="flex flex-col gap-3">
              <StarRatingInput
                register={register}
                validationError={errors.rating}
              />
              <textarea
                className="bg-gray-200 p-2"
                placeholder="Write A review (Optional)"
                required={false}
                {...register("reviewContent")}
              />
              {errors.reviewContent && (
                <span className="text-red-300">
                  {errors.reviewContent.message}
                </span>
              )}
              {addRatingMutation.isLoading ? (
                <Spinner className="ml-auto" />
              ) : (
                <button
                  className="rounded-md px-4 py-1 ml-auto bg-primary text-white w-fit"
                  type="submit"
                >
                  Send
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

const StarRatingInput = ({
  register,
  validationError,
}: {
  register: UseFormRegister<any>;
  validationError: FieldError | undefined;
}) => {
  return (
    <div>
      <div className="rating">
        <input value="5" id="star5" type="radio" {...register("rating")} />
        <label htmlFor="star5"></label>
        <input value="4" id="star4" type="radio" {...register("rating")} />
        <label htmlFor="star4"></label>
        <input value="3" id="star3" type="radio" {...register("rating")} />
        <label htmlFor="star3"></label>
        <input value="2" id="star2" type="radio" {...register("rating")} />
        <label htmlFor="star2"></label>
        <input value="1" id="star1" type="radio" {...register("rating")} />
        <label htmlFor="star1"></label>
      </div>
      {validationError && (
        <span className="text-red-300">{validationError.message}</span>
      )}
    </div>
  );
};
