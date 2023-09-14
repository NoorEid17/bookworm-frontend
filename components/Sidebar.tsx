import { fetchAllCategories } from "@/api/category";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import CreateCategoryModal from "./CreateCategoryModal";

const Sidebar = () => {
  return (
    <div>
      <CategoriesList />
      <CreateCategoryModal />
    </div>
  );
};

function CategoriesList() {
  const { data } = useQuery({
    queryKey: ["categories"],
    initialData: [],
    queryFn: fetchAllCategories,
  });
  return (
    <div>
      <h3 className="text-primary font-bold text-lg">Categories: </h3>
      <div className="mt-4">
        {data.map((category) => (
          <Link
            key={category.categoryId}
            href={"/category/" + category.slug}
            className="bg-amber-100 text-gray-700 p-2 rounded-md inline-block m-2"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Sidebar;
