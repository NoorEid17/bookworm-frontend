"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import * as UserAPI from "@/api/user";
import { useContext, useState } from "react";
import { AuthContext } from "@/components/AuthProvider";
import axios from "@/api/axios";
import { useRouter } from "next/navigation";

const schema = yup.object({
  username: yup.string().required().min(3).max(20),
  firstName: yup.string().required().min(3).max(20),
  lastName: yup.string().required().min(3).max(20),
  password: yup.string().required().min(6).max(20),
});

type Inputs = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

const page = () => {
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const { dispatch } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setServerError("");
    const response = await UserAPI.signup(data);
    if (response.statusText !== "Created") {
      setServerError(response.data.validationErrors[0].msg);
    } else {
      dispatch({ type: "LOGIN", payload: response.data.user });
      axios.defaults.headers.common[
        "Authorization"
      ] = `bearer ${response.data.token}`;
      router.push("/");
    }
  };

  return (
    <form
      className="flex flex-col gap-5 mx-auto my-10 w-1/5 text-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-1">
        <label>Username</label>
        <input
          type="text"
          className="bg-gray-200 rounded-sm py-1 px-4 text-sm"
          {...register("username")}
          autoFocus
        />
        {errors.username && (
          <span className="text-red-400 text-sm">
            {errors?.username?.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label>First Name</label>
        <input
          type="text"
          className="bg-gray-200 rounded-sm py-1 px-4 text-sm"
          {...register("firstName")}
        />
        {errors.firstName && (
          <span className="text-red-400 text-sm">
            {errors?.firstName?.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label>Last Name</label>
        <input
          type="text"
          className="bg-gray-200 rounded-sm py-1 px-4 text-sm"
          {...register("lastName")}
        />
        {errors.lastName && (
          <span className="text-red-400 text-sm">
            {errors?.lastName?.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label>Password</label>
        <input
          type="password"
          className="bg-gray-200 rounded-sm py-1 px-4 text-sm"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-400 text-sm">
            {errors?.password?.message}
          </span>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="bg-primary w-full text-white rounded-sm py-1 transition-all duration-300 hover:contrast-150 focus:contrast-150"
        >
          SIGNUP
        </button>
        {serverError && (
          <span className="text-red-400 text-sm">{serverError}</span>
        )}
      </div>
      <span>Or</span>
      <Link href="/login" className="underline">
        Already have an account?
      </Link>
    </form>
  );
};

export default page;
