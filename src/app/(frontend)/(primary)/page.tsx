"use client"
import Link from "next/link"
import { useAuth } from "../../context/authContext";
import { handleLogout } from "@/app/backend/logout";

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
    <button onClick={() => handleLogout()}>Logout</button>
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
