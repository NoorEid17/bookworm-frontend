"use client";
import { createCategory } from "@/api/category";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Fragment, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";
import Spinner from "./Spinner";

function CreateCategoryModal() {
  let [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const {
    state: { isAuthenticated },
  } = useContext(AuthContext);
  const createCategoryMutation = useMutation({
    mutationFn: (data: any) => createCategory(data),
    onSuccess(response: AxiosResponse, variables, context) {
      if (response.statusText !== "Created") {
        toast.error("Category name is already used!");
        return;
      }
      toast.success("Category created!");
      setIsOpen(false);
    },
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    if (!isAuthenticated) {
      return toast.error("Must login first!");
    }
    setIsOpen(true);
  }

  const submitHandler = (data: any) => {
    createCategoryMutation.mutate(data);
  };

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-primary text-white px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Create Category
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={handleSubmit(submitHandler)}>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Create new category
                    </Dialog.Title>
                    <div className="mt-2">
                      <input
                        placeholder="Name"
                        {...register("name", {
                          required: true,
                          minLength: 5,
                          maxLength: 20,
                        })}
                        className="border-solid border-2 w-full px-1 py-2 rounded-md bg-slate-200"
                      />
                    </div>

                    <div className="mt-4 float-right">
                      {createCategoryMutation.isLoading ? (
                        <Spinner />
                      ) : (
                        <button
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          type="submit"
                        >
                          Create category
                        </button>
                      )}
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default CreateCategoryModal;
