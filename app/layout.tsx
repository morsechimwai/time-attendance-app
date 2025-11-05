import type { Metadata } from "next"
import { StackProvider, StackTheme } from "@stackframe/stack"
import { stackClientApp } from "../stack/client"
import { Geist, Geist_Mono, Inter } from "next/font/google"
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
  metadataBase: new URL("https://face.in"),
  title: {
    default: "Time and Attendance Management",
    template: "FaceIN | %s",
  },
  description: "Manage your time and attendance efficiently with FaceIN.",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StackProvider app={stackClientApp}>
          <StackTheme>{children}</StackTheme>
        </StackProvider>
      </body>
    </html>
  )
}
