import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.faceshift.com"),
  title: "FaceShift - Time and Attendance Management",
  description: "Manage your time and attendance efficiently with FaceShift.",

  keywords: [
    "Time Tracking",
    "Attendance Management",
    "Employee Scheduling",
    "Workforce Management",
    "Time and Attendance Software",
    "Employee Time Clock",
    "Shift Management",
    "Payroll Integration",
    "Remote Work Tracking",
    "FaceShift",
  ],

  openGraph: {
    title: "FaceShift - Time and Attendance Management",
    description: "Manage your time and attendance efficiently with FaceShift.",
    url: "https://www.faceshift.com",
    siteName: "FaceShift",
    images: [
      {
        url: "https://www.faceshift.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FaceShift Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          try {
            const theme = localStorage.getItem("theme")
            if (theme === "dark") {
              document.documentElement.classList.add("dark")
            }
          } catch (_) {}
        `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
