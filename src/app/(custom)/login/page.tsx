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
            throw new Error(res.statusText)
        }
        return res.json()
}
  return (
  <div className="flex flex-col flex-1">
    <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
    <p className="mx-auto mb-16 h-6 w-auto">Polyhymnia </p>
        <form onSubmit={handleSubmit(onSubmit)} className="h-full max-w-sm" action="/login">
        <div className="mb-6">
          <label htmlFor="email">
            Email address
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
    className={`w-full px-2 py-1 text-sm mt-2 leading-tight text-black border ${
              errors.email && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
          />
          {errors.email && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.email?.message}
            </p>
          )}
          </div>
          <div className="mb-6">
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
    className={`w-full px-2 py-1 text-sm mt-2 leading-tight text-black border ${
              errors.password && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
          />
          {errors.password && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.password?.message}
            </p>
          )}
          </div>
          <button type="submit" className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">
          Login
          </button>
          <p className="mt-8 text-center">
          <a href="/password/reset" className="text-sm hover:underline">Forgot Password?</a>
          </p>
        </form>
        </div>
        <footer className="relative shrink-0"> 
        <div className="space-y-4 text-sm sm:flex sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0">
        <p className="text-center sm:text-left">Don't have an account?</p>
        <a href="/register" className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 ring-1 ring-slate-900/10 hover:ring-slate-900/20">
        <span> "Register " <span aria-hidden="true">→</span>
        </span>
        </a>
        </div>
        </footer>
      </div>
  );
}

