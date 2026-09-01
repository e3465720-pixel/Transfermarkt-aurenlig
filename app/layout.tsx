import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AurenLig Transfer Market',
  description: 'AurenLig Discord sunucusu için futbol transfer piyasası',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="bg-light text-dark">
        {children}
      </body>
    </html>
  )
}
