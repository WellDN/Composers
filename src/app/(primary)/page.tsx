"use client"
import { useSession } from "next-auth/react"
import Link from "next/link"
// use flexbox (flex with flex-col (grid))

export default function Home() {
    const { data: session } = useSession();

    return(
    <main>
    <div>
    <Link href="/">Polyhymnia</Link>
    { session ? (
    <>
    <p>Your email: </p>
    <pre>{session.user?.email}</pre>
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
