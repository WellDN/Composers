import Link from "next/link";

export default async function Login() {

    return(
    <div>
    <div className="flex flex-col min-h-full mx-auto max-w-2xl px-4 pt-8 pb-16">
    <div className="flex justify-center align-middle m-60">
    <p>Login</p>
    <form action="post" noValidate>
    <label htmlFor="email" className="">
    Email address
    </label>
    <input />
    <label htmlFor="password" className="">
    password
    </label>
    <input />
    </form>
    <Link href="/register">register here!!!</Link>
    </div>
    </div>
    </div>
    )
}
