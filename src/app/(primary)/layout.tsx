import '../globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function MainLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <div className="bg-rwood">
    <div className="flex flex-col min-h-screen px-4 pt-4 pb-16">
    <div className="flex-grow">
    <main className={inter.className}>{children}</main>
    </div>
    <footer><p>Footer</p></footer>
    </div>
    </div>
  )
}
