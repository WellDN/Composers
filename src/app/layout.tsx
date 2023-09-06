"use client"
import { AuthProvider } from './context/authContext'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <AuthProvider>
    <html lang="en" className='bg-rwood h-full'>
      <body className="font-sans antialiased min-h-full flex flex-col [overflow-anchor:none]">
      {children}
      </body>
    </html>
    </AuthProvider>
  )
}
