import Link from "next/link";

export default function Login() {
    return(
    <div>
    <a href="/">Polyhymnia</a>
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
    )
}
