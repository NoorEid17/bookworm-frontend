import { fetchBooksByCategorySlug } from "@/api/book";
import WideBookCard from "@/components/WideBookCard";

const page = async ({ params }: { params: { slug: string } }) => {
  const { books } = await fetchBooksByCategorySlug({ slug: params.slug });
  return (
    <div className="flex gap-10 w-3/5 flex-col mx-auto my-10">
      <h1 className="text-primary text-lg font-bold">
        All Books For {params.slug}:{" "}
      </h1>
      {books.map((book) => (
        <WideBookCard book={book} key={book.bookId} />
      ))}
    </div>
  );
};

export default page;
