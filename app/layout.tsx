import type React from "react"
import type { Metadata } from "next"
import { Open_Sans, Poppins } from "next/font/google"
import "./globals.css"

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "DG PROJECTS | Web & Software Development",
  description: "Web & Software Development",
  icons: {
    icon: "/images/2.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${openSans.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  )
}
