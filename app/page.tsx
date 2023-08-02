"use client";

import { fetchBooks } from "@/api/book";
import BookCard from "@/components/BookCard";
import Sidebar from "@/components/Sidebar";
import Spinner from "@/components/Spinner";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import { toast } from "react-toastify";

const BooksWrapper = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  return (
    <div className="col-span-4 w-full">
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        toast.error("something went wrong while fetching books!")
      ) : (
        <div className="mt-20 grid gap-4 px-6 gap-y-24 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {data.pages.map((page, i) => {
            return (
              <Fragment key={i}>
                {page.books.map((book, i) => (
                  <BookCard book={book} key={i} />
                ))}{" "}
              </Fragment>
            );
          })}
        </div>
      )}
      {!hasNextPage ? (
        "That's it for today!"
      ) : isFetchingNextPage ? (
        <Spinner />
      ) : (
        <button
          onClick={() => fetchNextPage()}
          className="w-1/12 bg-primary text-white rounded-md mx-auto my-3 py-3"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <main className="grid grid-cols-5 mt-8">
      <BooksWrapper />
      <Sidebar />
    </main>
  );
}
