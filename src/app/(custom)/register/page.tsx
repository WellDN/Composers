"use client"
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";

const registerSchema = z.object({
email: z.string().min(1, {message: "Email is required"}).email(),
password: z.string().min(8, {message: "Password is invalid"}),
confirmPassword: z.string().min(8, {message: "Password is invalid"}),
})
.refine((data) => data.password === data.confirmPassword, {
path: ["confirmPassword"],
message: "Password don't match",
})

type RegisterSchema = z.infer<typeof registerSchema> 


export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterSchema>({
resolver: zodResolver(registerSchema),
});


   const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
        const res = await fetch("/register", {
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

    return(
    <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
    <form onSubmit={handleSubmit(onSubmit)} className="h-full max-w-sm" action="/register">
    <label htmlFor="email" className="">
    Email address
    </label>
    <input
    type="email"
    id="email"
    {...register("email")}
    className={`w-96 px-2 py-1 text-sm leading-tight text-black border ${
              errors.email && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            />
{errors.email && (
    <p className="text-xs italic text-red-500 mt-2">
    {errors.email?.message}
    </p>
)}
    <label htmlFor="password" className="pt-7">
    Password
    </label>
    <input
    id="password"
    type="password"
    {...register("password")}
    className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.password && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            />
{errors.password && (
        <p className="text-xs italic text-red-500 mt-2">
        {errors.password?.message}
        </p>
        )}
    <label htmlFor="confirmPassword" className="pt-7">
    Confirm password
    </label>
    <input 
    type="password"
    id="confirmPassword"
    {...register("confirmPassword")}
    className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.confirmPassword && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            />
{errors.confirmPassword && (
        <p className="text-xs italic text-red-500 mt-2">
        {errors.confirmPassword?.message}
        </p>
        )}
    <button type="submit">register</button> 
    <Link href="/login">Login here!!!!!</Link>
    </form>
    </div>
    )
}
