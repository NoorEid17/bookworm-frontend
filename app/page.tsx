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
    <div className="sm:grid sm:grid-cols-3 mt-20 gap-y-24 col-span-4">
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        toast.error("something went wrong while fetching books!")
      ) : (
        <>
          {data.pages.map((page, i) => {
            return (
              <Fragment key={i}>
                {page.books.map((book, i) => (
                  <BookCard book={book} key={i} />
                ))}{" "}
              </Fragment>
            );
          })}
          {!hasNextPage ? (
            <h1 className="text-primary text-3xl font-bold col-span-3 mx-auto">
              That's it for today!
            </h1>
          ) : isFetchingNextPage ? (
            <div className="col-span-3 mx-auto">
              <Spinner />
            </div>
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="w-1/3 text-lg uppercase font-bold bg-primary text-white rounded-md mx-auto mb-3 py-3 col-span-3"
            >
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <main className="mt-8 grid grid-cols-5 px-10">
      <BooksWrapper />
      <Sidebar />
    </main>
  );
}
