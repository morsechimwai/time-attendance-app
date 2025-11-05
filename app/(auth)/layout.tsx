import Squares from "@/components/Squares"
import { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  metadataBase: new URL("https://face.in"),
  title: {
    default: "Authenticate",
    template: "%s | FaceIN",
  },
  description: "Manage your time and attendance efficiently with FaceIN.",
}
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-secondary">
      <div className="mx-auto flex w-full flex-1 flex-col overflow-hidden bg-white md:flex-row">
        <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:gap-6 bg-primary text-white">
          <div className="h-screen relative">
            {/* Animation Background */}
            <Squares
              speed={0.0999}
              squareSize={40}
              direction="right" // up, down, left, right, diagonal
              borderColor="#7f22fe"
            ></Squares>
            <div className="absolute inset-0 flex flex-col justify-center px-16 py-12 lg:px-24 lg:py-24">
              <div className="flex flex-col gap-6 text-primary-foreground">
                <span className="inline-flex w-fit items-center rounded-full bg-primary-foreground/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/80">
                  AI-Driven Workforce
                </span>
                <div className="flex gap-4 items-center">
                  <h2 className="mt-8 text-6xl font-black font-sans">FaceShift</h2>
                </div>
                <p className="max-w-sm text-base leading-relaxed font-sans font-medium">
                  Supercharge attendance, payroll, and compliance with an AI-first platform that
                  learns workforce rhythms and automates every repetitive check.
                </p>
                <div className="mt-4 space-y-3 text-sm font-sans">
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-1 h-2 w-2 rounded-full bg-primary-foreground/70"
                      aria-hidden
                    />
                    <p className="opacity-90">
                      Adaptive facial recognition tuned for factory-lighting and shift changes.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-1 h-2 w-2 rounded-full bg-primary-foreground/70"
                      aria-hidden
                    />
                    <p className="opacity-90">
                      Real-time attendance insights, anomaly detection, and proactive coaching cues.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-1 h-2 w-2 rounded-full bg-primary-foreground/70"
                      aria-hidden
                    />
                    <p className="opacity-90">
                      Payroll engine that predicts OT, social security, and policy drift before it
                      happens.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-auto text-sm text-primary-foreground font-sans font-medium">
                © {new Date().getFullYear()} Morse Platform
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center bg-secondary px-8 py-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  )
}
