import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";

export interface Book {
  bookId: number;
  title: string;
  description: string;
  cover: string | null;
  slug: string;
  averageRating: number;
  Categories: any[];
  reviewsCount: number;
}

const BookCard = ({ book }: { book: Book }) => {
  return (
    <div className="max-sm:mt-24 max-sm:first:mt-2 max-w-xs p-3 pt-20 pb-5 flex flex-col gap-3 text-sm bg-white drop-shadow-md rounded-md relative hover:-top-1">
      <Link href={`/book/${book.slug}`}>
        <Image
          src={`http://localhost:5000/uploads/${book.cover}`}
          alt="Book cover"
          width={200}
          height={300}
          className="w-32 h-36 absolute -top-16 rounded-md"
        />
      </Link>
      <Link href={`/book/${book.slug}`}>
        <h1 className="text-xl text-primary font-bold">{book.title}</h1>
        <p className="h-16 overflow-hidden whitespace-pre-wrap line-clamp-4 text-xs text-gray-500">
          {book.description}
        </p>
        <RatingSection
          averageRating={book.averageRating}
          reviewsCount={book.reviewsCount}
        />
        <CategoriesSection categories={book.Categories} />
      </Link>
    </div>
  );
};

export const RatingSection = ({
  averageRating,
  reviewsCount,
}: {
  averageRating: number;
  reviewsCount: number;
}) => {
  const roundedRating = Math.round(averageRating);
  return (
    <div className="flex mt-2 justify-between items-center">
      <RatingStars rating={roundedRating} />
      <span className="text-gray-400">{`${reviewsCount} reviews`}</span>
    </div>
  );
};

export const RatingStars = ({
  rating,
  className = "",
}: {
  rating: number;
  className?: string;
}) => (
  <div className={"flex" + " " + className}>
    {[...Array(rating)].map((value, i) => (
      <AiTwotoneStar color="#ffbb00" key={i} />
    ))}
    {[...Array(5 - rating)].map((value, i) => (
      <AiOutlineStar key={i} strokeWidth={"1px"} />
    ))}
  </div>
);

const CategoriesSection = ({ categories }: { categories: any[] }) => (
  <div className="mt-4 flex gap-1">
    {categories.slice(0, 3).map((category, i) => (
      <Link
        href={"/category/" + category.slug}
        key={i}
        className="bg-amber-100 text-gray-700 p-2 rounded-md"
      >
        {category.name}
      </Link>
    ))}
  </div>
);

export default BookCard;
