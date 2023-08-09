import { Book, RatingSection } from "@/components/BookCard";
import { ReviewsSection } from "@/components/ReviewsSection";
import Image from "next/image";
import { notFound } from "next/navigation";

type BookResponse = {
  book: Book;
};

async function fetchBook(slug: string): Promise<BookResponse> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/book/" + slug, {
    cache: "no-cache",
  });
  if (!res.ok) {
    notFound();
  }
  return await res.json();
}

export default async function page({ params }: { params: { slug: string } }) {
  const { book } = await fetchBook(params.slug);
  return (
    <main className="md:w-1/2 mx-auto mt-10">
      <BookInfoSection book={book} />
    </main>
  );
}

const BookInfoSection = ({ book }: { book: Book }) => (
  <div className="">
    <div className="sm:grid sm:grid-cols-3">
      <div className="w-48">
        <Image
          src={`http://localhost:5000/uploads/${book.cover}`}
          alt="book cover"
          height={400}
          width={200}
          className="rounded-md drop-shadow-md h-64 w-48 mb-4"
        />
        <RatingSection
          averageRating={book.averageRating}
          reviewsCount={book.reviewsCount}
        />
      </div>
      <div className="col-span-2">
        <h1 className="text-4xl font-bold">{book.title}</h1>
        <p className="text-gray-500 leading-6 mt-2">{book.description}</p>
      </div>
    </div>
    <ReviewsSection bookId={book.bookId} />
  </div>
);
