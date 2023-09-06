"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authContext";

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

const { registerUser } = useAuth();

const router = useRouter()

   const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
        const res = await fetch("http://localhost:8080/register", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error(res.statusText)
        }
        const userData = await res.json()
        registerUser(userData);
        
        router.push("/")
  }

    return(
  <div className="flex flex-col flex-1">
    <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
    <p className="mx-auto mb-16 h-6 w-auto">Polyhymnia </p>
    <form onSubmit={handleSubmit(onSubmit)} className="h-full max-w-sm" action="/register">
    <div className="mb-6">
    <label htmlFor="email">
    Email address
    </label>
    <input
    type="email"
    id="email"
    {...register("email")}
    className={`w-full px-2 mt-2 py-1 text-sm leading-tight text-black border ${
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
    className={`w-full px-2 py-1 mt-2 text-sm leading-tight text-black border ${
              errors.password && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            />
{errors.password && (
        <p className="text-xs italic text-red-500 mt-2">
        {errors.password?.message}
        </p>
        )}
</div>
    <div className="mb-6">
    <label htmlFor="confirmPassword" className="block">
    Confirm password
    </label>
    <input 
    type="password"
    id="confirmPassword"
    {...register("confirmPassword")}
    className={`w-full mt-2 px-2 py-1 text-sm leading-tight text-black border ${
              errors.confirmPassword && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            />
{errors.confirmPassword && (
        <p className="text-xs italic text-red-500 mt-2">
        {errors.confirmPassword?.message}
        </p>
        )}
</div>
    <button type="submit" className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">
    register
    </button> 
          <p className="mt-8 text-center">
          <a href="/password/reset" className="text-sm hover:underline">Forgot Password?</a>
          </p>
        </form>
        </div>
        <footer className="relative shrink-0"> 
        <div className="space-y-4 text-sm sm:flex sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0">
        <p className="text-center sm:text-left">Already have an account?</p>
        <a href="/login" className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 ring-1 ring-slate-900/10 hover:ring-slate-900/20">
        <span> "Login " <span aria-hidden="true">→</span>
        </span>
        </a>
        </div>
        </footer>
      </div>
    )
}
