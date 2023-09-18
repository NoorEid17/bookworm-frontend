import Image from "next/image";
import Link from "next/link";
import { Book } from "./BookCard";

const WideBookCard = ({ book }: { book: Book }) => {
  return (
    <div className="grid grid-cols-4 rounded gap-3 bg-white shadow-md">
      <figure>
        <Image
          src={"http://localhost:5000/uploads/" + book.cover}
          alt="book cover"
          width={200}
          height={400}
          className="rounded-md"
        />
      </figure>
      <div className="flex flex-col gap-3 col-span-3 p-5">
        <Link href={"/book/" + book.slug} className="text-3xl text-primary">
          {book.title}
        </Link>
        <p>{book.description}</p>
      </div>
    </div>
  );
};

export default WideBookCard;
