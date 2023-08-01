"use client";

import { AuthContext } from "@/components/AuthProvider";
import CategoriesSelect, { Category } from "@/components/CategoriesSelect";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { addBook } from "@/api/book";
import Spinner from "@/components/Spinner";

const schema = yup.object({
  title: yup.string().required().min(2).max(100),
  description: yup.string().required().min(2).max(1000),
});

const page = () => {
  const {
    state: { isAuthenticated },
  } = useContext(AuthContext);
  const router = useRouter();
  const [cover, setCover] = useState<File>();
  const [coverError, setCoverError] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const addBookMutation = useMutation({
    mutationFn: (data) => addBook(data),
    onSettled: (response, error, variables, context) => {
      if (error) {
        return toast.error("Something went wrong!");
      }
      if (response?.status === 400) {
        return toast.error(response.data.validationErrors[0].msg);
      }
      toast.success("Book added successfully!");
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      return router.push("/login");
    }
  }, []);

  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const coverFile = e.target.files[0];

    if (!coverFile && !cover) {
      return setCoverError("Cover is required!");
    }
    if (coverFile.size > 10 ** 6) {
      return setCoverError("Cover file should not exceed 1 MB");
    }
    setCoverError("");
    setCover(coverFile);
  };

  const submitHandler = (data: any) => {
    if (!cover) {
      return setCoverError("Cover is required!");
    }

    if (!selectedCategories.length) {
      return toast.error("Must select at least one category!");
    }

    const fullData = { ...data, cover, categories: selectedCategories };

    addBookMutation.mutate(fullData);
  };

  return (
    <main className="text-center my-10">
      <h1 className="text-xl font-bold text-primary">Add new book</h1>
      <form
        className="w-1/3 mx-auto my-5 flex flex-col gap-5"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex flex-col gap-1">
          <label>title</label>
          <input
            type="text"
            className="bg-gray-200 rounded-sm py-1 px-4 text-sm"
            autoFocus
            {...register("title")}
          />
          <span className="text-red-500">
            {errors.title && errors.title.message}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <label>Description</label>
          <textarea
            className="bg-gray-200 rounded-sm py-1 px-4 text-sm h-16"
            {...register("description")}
          />
          <span className="text-red-500">
            {errors.description && errors.description.message}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="cover"
            className="border-dashed border-4 bg-slate-100 py-1 text-slate-700 hover:cursor-pointer"
          >
            {cover ? cover.name : "Cover upload"}
          </label>
          <span className="text-red-500">{coverError && coverError}</span>
          <input
            id="cover"
            type="file"
            accept=".jpg, .jpeg, .png"
            className="hidden"
            onChange={handleCoverChange}
          />
        </div>
        <div>
          <CategoriesSelect
            selected={selectedCategories}
            setSelected={setSelectedCategories}
          />
        </div>
        <div className="w-full">
          {addBookMutation.isLoading ? (
            <Spinner />
          ) : (
            <button
              className="bg-primary py-1 rounded-m text-white w-full transition-all hover:contrast-150"
              type="submit"
            >
              ADD
            </button>
          )}
        </div>
      </form>
    </main>
  );
};

export default page;
