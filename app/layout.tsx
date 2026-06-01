import type React from "react"
import type { Metadata } from "next"
import { Open_Sans, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
<<<<<<< HEAD
  weight: ["500", "600", "700"],
=======
  weight: ["500", "700"],
>>>>>>> 2e75fbc5163599263dac2ce52ccb2b18979f3265
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "DG Projects | Digital Growth Agency — Web Design, SEO & Online Presence",
  description:
    "DG Projects is a full-service digital agency helping businesses grow online. We design high-performance websites, implement SEO strategies, and provide ongoing digital support for businesses in El Salvador and beyond.",
  keywords: [
    "digital agency El Salvador",
    "web design El Salvador",
    "SEO El Salvador",
    "website development",
    "digital marketing",
    "web agency",
    "DG Projects",
  ],
  openGraph: {
    title: "DG Projects | Digital Growth Agency",
    description:
      "Websites, SEO, and digital growth that generate real business results.",
    type: "website",
    locale: "es_SV",
  },
  icons: {
    icon: "/images/2.png",
  },
  robots: {
    index: true,
    follow: true,
  },
=======
  title: "DG PROJECTS | Web & Software Development",
  description: "Web & Software Development",
  icons: {
    icon: "/images/2.png",
  },
  generator: "v0.app",
>>>>>>> 2e75fbc5163599263dac2ce52ccb2b18979f3265
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
<<<<<<< HEAD
    <html lang="es" className={`${openSans.variable} ${poppins.variable}`}>
=======
    <html lang="fr" className={`${openSans.variable} ${poppins.variable}`}>
>>>>>>> 2e75fbc5163599263dac2ce52ccb2b18979f3265
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
