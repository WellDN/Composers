import Link from "next/link"
// use flexbox (flex with flex-col (grid))

export default function Home() {
    const user = useOptionalUser();
    // TODO: make isUser context
    return(
    <main>
    <Link href="/">Polyhymnia</Link>
    { user ? (

        <p>Logged User: {user.email}</p>

    ) : (
    <div>
    <Link href="/login">
    Login
    </Link>
    <Link href="/register">
    Register
    </Link>
    <Link href="/single">single</Link>
    </div>
    )})
    </main>
    )
}
