import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import AppProviders from "./_providers/app-providers"
import MainBackground from "@/components/main-background"

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
          <MainBackground
            backgroundVariant="minimal"
            backdropIntensity="medium"
            backdropTint="white"
            className="w-full bg-linear-to-b from-white to-neutral-50 text-neutral-900"
          >
            <main className="w-full min-h-screen">{children}</main>
          </MainBackground>
        </AppProviders>
      </body>
    </html>
  )
}
