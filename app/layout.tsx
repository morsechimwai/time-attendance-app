import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import AppProviders from "./_providers/app-providers"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://clokin.app"),
  title: {
    default: "ลงเวลาเข้างานด้วยใบหน้า",
    template: "ClokIn | %s",
  },
  description: "Manage your time and attendance efficiently with ClokIn.",
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
        <AppProviders>
          <main className="w-full min-h-screen">{children}</main>
        </AppProviders>
      </body>
    </html>
  )
}
