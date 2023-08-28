"use client"
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z.string().min(8, { message: "Password is invalid" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

   const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
        const res = await fetch("/login", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error("Failed to fetch data")
        }
        return res.json()
}
  return (
    <div className="flex flex-col min-h-full mx-auto max-w-2xl px-4 pt-8 pb-16">
      <div className="flex justify-center align-middle m-60">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className="">
            Email address
          </label>
          <input
            type="email"
            id="email"
            placeholder="email"
            {...register("email")}
            className={`${
              errors.email && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
          />
          {errors.email && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.email?.message}
            </p>
          )}
          <label htmlFor="password" className="">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className={`${
              errors.password && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
          />
          {errors.password && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.password?.message}
            </p>
          )}
          <button type="submit">Login</button>
        </form>
        <Link href="/register">Register here!</Link>
      </div>
    </div>
  );
}

