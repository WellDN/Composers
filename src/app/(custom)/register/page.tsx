import Link from "next/link";

export default function Register() {
    return(
    <div className="flex flex-col min-h-full mx-auto max-w-2xl px-4 pt-8 pb-16">
    <div className="flex justify-center align-middle m-60">
    <p>Register</p>
    <form action="post" noValidate>
    <label htmlFor="email" className="">
    Email address
    </label>
    <input />
    <label htmlFor="password" className="">
    password
    </label>
    <input />
    <label htmlFor="confirmPassword" className="">
    password
    </label>
    <input />
    </form>
    <Link href="/login">Login here!!!!!</Link>
    </div>
    </div>
    )
}
