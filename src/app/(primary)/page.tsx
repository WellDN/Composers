import Link from "next/link"

export default function Page() {
    return(
      <div>
    <div className="flex">
    <div className="w-screen bg-sexo h-screen">
    <Link href="/">Polyhymnia</Link>
    <Link href="/login">
    Login
    </Link>
    <Link href="/register">
    Register
    </Link>
    <Link href="/single">single</Link>
    </div>
    </div>
    </div>
    )
}
