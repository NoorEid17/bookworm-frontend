"use client";
import { searchBooks } from "@/api/book";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";

const SearchBar = () => {
  const { register } = useForm();
  return (
    <form
      className="flex gap-2 justify-between mr-20 items-center bg-white rounded-md shadow-md mb-28"
      method="GET"
      action={"search"}
    >
      <BiSearch size={24} className="ml-3" />
      <input
        type="text"
        {...register("searchQuery", { required: true })}
        className="w-full p-3"
      />
      <button className="bg-primary text-white h-full w-min p-3 rounded-md">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
