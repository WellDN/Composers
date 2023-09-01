"use client"
import Link from "next/link"
import { useAuth } from "../context/authContext";
// use flexbox (flex with flex-col (grid))

export default function Home() {
    const { user } = useAuth();
    return(
    //perhaps wrap the component with a layout idk which one
    <main>
    <div>
    <Link href="/">Polyhymnia</Link>
    { user ? (
    <>
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
