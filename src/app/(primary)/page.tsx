import Link from "next/link"
// use flexbox (flex with flex-col (grid))

export default function Home() {
    return(
    <main>
    <Link href="/">Polyhymnia</Link>
    <Link href="/login">
    Login
    </Link>
    <Link href="/register">
    Register
    </Link>
    <Link href="/single">single</Link>
    </main>
    )
}
