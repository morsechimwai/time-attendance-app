import type { ReactNode } from "react"
import FaultyTerminal from "./FaultyTerminal"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-secondary">
      <div className="mx-auto flex w-full flex-1 flex-col overflow-hidden bg-white md:flex-row">
        <div className="hidden lg:flex lg:flex-1 flex-col justify-center gap-6 bg-primary px-10 py-12 text-white">
          <div style={{ width: "100%", height: "600px", position: "relative" }}>
            <FaultyTerminal
              scale={1.5}
              gridMul={[2, 1]}
              digitSize={1.2}
              timeScale={1}
              pause={false}
              scanlineIntensity={1}
              glitchAmount={1}
              flickerAmount={1}
              noiseAmp={1}
              chromaticAberration={0}
              dither={0}
              curvature={0}
              tint="#ffffff"
              mouseReact={true}
              mouseStrength={0.5}
              pageLoadAnimation={false}
              brightness={1}
            />
          </div>
          <div>
            <div className="flex gap-4 items-center">
              <h2 className="mt-2 text-6xl font-black font-sans text-primary-foreground">
                Face IN
              </h2>
            </div>
            <p className="mt-4 max-w-sm text-base text-primary-foreground font-sans font-semibold">
              Face recognition powered attendance system for efficient and accurate tracking.
            </p>
          </div>
          <div className="mt-auto text-sm text-primary-foreground font-sans font-medium">
            © {new Date().getFullYear()} Morse Platform
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center bg-secondary px-8 py-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  )
}
