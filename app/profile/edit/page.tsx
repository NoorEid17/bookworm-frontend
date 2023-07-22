"use client";
import { AuthContext } from "@/components/AuthProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineFileImage } from "react-icons/ai";
import { IconContext } from "react-icons/lib/esm/iconContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as UserAPI from "@/api/user";
import Spinner from "@/components/Spinner";
import { useMutation } from "@tanstack/react-query";

const schema = yup.object({
  username: yup.string().required().min(3).max(20),
  firstName: yup.string().required().min(3).max(20),
  lastName: yup.string().optional().max(20),
  bio: yup.string().optional().min(0).max(250),
  oldPassword: yup.string().optional().min(6).max(20),
  newPassword: yup.string().optional().min(6).max(20),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});

const page = () => {
  const {
    state: { user, isAuthenticated },
  } = useContext(AuthContext);
  const router = useRouter();
  const [avatar, setAvatar] = useState<File>();
  const [avatarURL, setAvatarURL] = useState("/assets/user.png");
  const [avatarError, setAvatarError] = useState("");
  const { setValue, register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    setValue("username", user.username);
    setValue("firstName", user.firstName);
    setValue("lastName", user.lastName);
    setValue("bio", user.bio);
    if (user.avatar) {
      setAvatarURL("http://localhost:5000/uploads/" + user.avatar);
    }
  }, []);

  const updateMutation = useMutation({
    mutationFn: (data) => UserAPI.update(data),
  });

  const submitHandler = (data: any) => {
    const dataWithAvatar = { ...data, avatar };
    updateMutation.mutate(dataWithAvatar);
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const avatar = e.target.files[0];
    const MAX_SIZE = 1000000; /* 1MB */
    setAvatarError("");
    if (avatar.size > MAX_SIZE) {
      return setAvatarError("Image shouldn't be greater than 1 MB");
    }
    setAvatar(avatar);
    setAvatarURL(URL.createObjectURL(avatar));
  };

  return (
    <form
      className="mx-auto my-10 w-1/4 flex gap-10"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="User Avatar">
        <Image
          src={`${avatarURL}`}
          alt="user avatar"
          className="rounded-full mb-2"
          width={128}
          height={128}
        />
        <div className="flex flex-col gap-2 justify-around">
          <label
            htmlFor="avatar-upload"
            className="p-2 bg-slate-300 flex content-center text-sm gap-1 rounded-sm cursor-pointer"
          >
            <IconContext.Provider value={{ size: "24px" }}>
              <AiOutlineFileImage />
            </IconContext.Provider>
            Upload photo
          </label>
          <input
            className="hidden"
            type="file"
            accept=".jpg, .jpeg, .png"
            id="avatar-upload"
            onChange={handleAvatarChange}
          />
          <button className="p-2 bg-red-300 flex content-center text-sm gap-1 rounded-sm">
            <IconContext.Provider value={{ size: "24px" }}>
              <AiOutlineDelete />
            </IconContext.Provider>
            Delete Photo
          </button>
          {avatarError && (
            <span className="text-red-400 text-sm">{avatarError}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label>Username</label>
          <input
            type="text"
            className="bg-gray-200 rounded-sm py-1 px-4 text-sm"
            {...register("username")}
          />
          {formState.errors.username && (
            <span className="text-red-400 text-sm">
              {formState.errors.username.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label>First name</label>
          <input
            type="text"
            className="bg-gray-200 rounded-sm py-1 px-4 text-sm"
            {...register("firstName")}
          />
          {formState.errors.firstName && (
            <span className="text-red-400 text-sm">
              {formState.errors.firstName.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label>Last name</label>
          <input
            type="text"
            className="bg-gray-200 rounded-sm py-1 px-4 text-sm"
            {...register("lastName")}
          />
          {formState.errors.lastName && (
            <span className="text-red-400 text-sm">
              {formState.errors.lastName.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label>Old password</label>
          <input
            type="password"
            className="bg-gray-200 rounded-sm py-1 px-4 text-sm"
          />
          {formState.errors.oldPassword && (
            <span className="text-red-400 text-sm">
              {formState.errors.oldPassword.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label>New Password</label>
          <input
            type="password"
            className="bg-gray-200 rounded-sm py-1 px-4 text-sm"
          />
          {formState.errors.newPassword && (
            <span className="text-red-400 text-sm">
              {formState.errors.newPassword.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label>Confirm New Password</label>
          <input
            type="password"
            className="bg-gray-200 rounded-sm py-1 px-4 text-sm"
            {...register("confirmPassword")}
          />
          {formState.errors.confirmPassword && (
            <span className="text-red-400 text-sm">
              {formState.errors.confirmPassword.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label>Bio</label>
          <textarea
            className="bg-gray-200 rounded-sm py-1 px-4 text-sm"
            id="bio"
            style={{ minHeight: "4rem" }}
            {...register("bio")}
          />
        </div>
        <div>
          {updateMutation.isLoading ? (
            <Spinner className="text-center" />
          ) : (
            <button
              type="submit"
              className="bg-primary w-1/2 float-right text-white rounded-sm py-1 transition-all duration-300 hover:contrast-150 focus:contrast-150"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default page;
