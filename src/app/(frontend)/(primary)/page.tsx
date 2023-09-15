"use client"
import Link from "next/link"
import { useAuth } from "../../context/authContext";

export default function Home() {
    const { user } = useAuth();

    return(
    <main>
    <div>
    <Link href="/">Polyhymnia</Link>
    { user ? (
    <>
    <Link href="/profile">Profile</Link>
    <p>Your email: </p>
    <pre>{user.email}</pre>
    <Link href="/logout">logout</Link>
    </>
    ) : (
    <>
    <Link href="/login">
    Login
    </Link>
    <Link href="/register">
    Register
    </Link>
    </>
    )}
    <Link href="/unique">unique page</Link>
    </div>
    </main>
    )
}
