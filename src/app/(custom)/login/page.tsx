import Link from "next/link";

async function getData() {
    const res = await fetch("http://localhost:8000/login")

    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }
    return res.json()
}
export default async function Login() {
    const data = await getData();

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
