"use client"
import '@/app/styles/globals.css'
import { CookiesProvider } from 'react-cookie';

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
          <CookiesProvider>{children}</CookiesProvider>
        </body>
      </html>
    )
  }