import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Bookworm',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="assets/favicon.ico" sizes="any" />
      </head>
      <body>
        <Navbar />
        {children}
        </body>
    </html>
  )
}
