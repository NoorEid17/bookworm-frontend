import { searchBooks } from "@/api/book";
import { Book } from "@/components/BookCard";
import WideBookCard from "@/components/WideBookCard";
import Image from "next/image";
import Link from "next/link";

async function page({
  searchParams: { searchQuery },
}: {
  searchParams: { searchQuery?: string };
}) {
  if (!searchQuery) {
    return <h3 className="text-2xl text-primary">No search query provided</h3>;
  }

  const { books } = await searchBooks({ searchQuery });

  return (
    <div className="p-10 px-20">
      <h1 className="text-3xl text-primary mb-10">Search Results: </h1>
      <div className="flex flex-col gap-10 w-1/2">
        {books.map((book) => (
          <WideBookCard book={book} key={book.bookId} />
        ))}
      </div>
    </div>
  );
}

export default page;
