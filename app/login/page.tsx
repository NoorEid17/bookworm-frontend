"use client";

import {useForm, SubmitHandler} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import Link from "next/link";

const schema = yup.object({
  username: yup.string().required().min(3).max(20),
  password: yup.string().required().min(3).max(20),
})

type Inputs = {
  username: string
  password: string
}

const page = () => {
  const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema)})
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)


  return (
    <form className="flex flex-col gap-5 mx-auto my-10 w-1/5 text-center" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <label>Username</label>
        <input type="text" className="bg-gray-200 rounded-sm py-1 px-4 text-sm" {...register("username")} autoFocus/>
        {errors.username && (
          <span className="text-red-400 text-sm">{errors?.username?.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label>Password</label>
        <input type="password" className="bg-gray-200 rounded-sm py-1 px-4 text-sm"  {...register("password")}/>
        {errors.password && (
          <span className="text-red-400 text-sm">{errors?.password?.message}</span>
        )}
      </div>
      <div>
        <button type="submit" className="bg-primary w-full text-white rounded-sm py-1 transition-all duration-300 hover:contrast-150 focus:contrast-150">LOGIN</button>
      </div>
      <span>Or</span>
      <Link href="/signup" className="underline">Create new account</Link>
    </form>
  )
}

export default page