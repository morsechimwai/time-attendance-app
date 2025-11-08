interface AnimatedBackgroundProps {
  variant?: "default" | "minimal" | "intense"
  className?: string
}

export default function AnimatedBackground({
  variant = "default",
  className = "",
}: AnimatedBackgroundProps) {
  const renderElements = () => {
    switch (variant) {
      case "minimal":
        return (
          <>
            {/* Large orbs - minimal */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-400/15 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute top-40 -left-40 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute -bottom-40 right-1/3 w-80 h-80 bg-purple-400/15 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "4s" }}
            ></div>
          </>
        )

      case "intense":
        return (
          <>
            {/* Large orbs - intense */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-400/30 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute top-40 -left-40 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute -bottom-40 right-1/3 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "4s" }}
            ></div>

            {/* Extra large orbs */}
            <div
              className="absolute top-1/2 left-1/2 w-60 h-60 bg-cyan-300/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-300/25 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "3s" }}
            ></div>

            {/* Medium floating elements - more */}
            <div
              className="absolute top-1/4 right-1/4 w-40 h-40 bg-cyan-300/20 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-1/3 left-1/5 w-48 h-48 bg-indigo-300/20 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "3s" }}
            ></div>
            <div
              className="absolute top-2/3 right-2/3 w-32 h-32 bg-rose-300/20 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "5s" }}
            ></div>
            <div
              className="absolute top-1/6 left-2/5 w-28 h-28 bg-emerald-300/15 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "2.5s" }}
            ></div>

            {/* Small floating dots - more */}
            <div
              className="absolute top-1/6 left-1/3 w-4 h-4 bg-sky-500/50 rounded-full animate-bounce"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute top-1/2 right-1/5 w-3 h-3 bg-blue-500/60 rounded-full animate-bounce"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="absolute bottom-1/4 left-1/2 w-5 h-5 bg-purple-500/40 rounded-full animate-bounce"
              style={{ animationDelay: "2.5s" }}
            ></div>
            <div
              className="absolute top-3/4 left-1/6 w-3 h-3 bg-cyan-500/50 rounded-full animate-bounce"
              style={{ animationDelay: "3.5s" }}
            ></div>
            <div
              className="absolute top-1/3 right-1/3 w-4 h-4 bg-indigo-500/45 rounded-full animate-bounce"
              style={{ animationDelay: "4.5s" }}
            ></div>
            <div
              className="absolute bottom-1/6 right-2/5 w-2 h-2 bg-rose-500/40 rounded-full animate-bounce"
              style={{ animationDelay: "0.8s" }}
            ></div>
            <div
              className="absolute top-1/8 left-3/5 w-3 h-3 bg-emerald-500/35 rounded-full animate-bounce"
              style={{ animationDelay: "1.8s" }}
            ></div>

            {/* Geometric shapes - more */}
            <div
              className="absolute top-1/5 left-2/3 w-8 h-8 bg-sky-400/30 rotate-45 animate-pulse blur-sm"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-1/5 right-1/6 w-10 h-10 bg-blue-400/25 rotate-12 animate-pulse blur-sm"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute top-2/5 left-1/4 w-6 h-6 bg-purple-400/35 rotate-45 animate-pulse blur-sm"
              style={{ animationDelay: "3s" }}
            ></div>
            <div
              className="absolute bottom-2/5 right-3/5 w-7 h-7 bg-cyan-400/28 rotate-12 animate-pulse blur-sm"
              style={{ animationDelay: "1.5s" }}
            ></div>

            {/* Gradient streaks - more */}
            <div
              className="absolute top-0 left-1/4 w-px h-40 bg-linear-to-b from-sky-500/30 to-transparent animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-0 right-1/3 w-px h-32 bg-linear-to-t from-blue-500/30 to-transparent animate-pulse"
              style={{ animationDelay: "4s" }}
            ></div>
            <div
              className="absolute top-1/2 right-0 w-32 h-px bg-linear-to-l from-purple-500/30 to-transparent animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-1/3 left-0 w-28 h-px bg-linear-to-r from-cyan-500/30 to-transparent animate-pulse"
              style={{ animationDelay: "3s" }}
            ></div>
            <div
              className="absolute top-1/4 left-0 w-24 h-px bg-linear-to-r from-indigo-500/25 to-transparent animate-pulse"
              style={{ animationDelay: "2.5s" }}
            ></div>
            <div
              className="absolute bottom-1/4 right-0 w-36 h-px bg-linear-to-l from-rose-500/25 to-transparent animate-pulse"
              style={{ animationDelay: "3.5s" }}
            ></div>
          </>
        )

      default: // default variant
        return (
          <>
            {/* Large orbs */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute top-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute -bottom-40 right-1/3 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "4s" }}
            ></div>

            {/* Medium floating elements */}
            <div
              className="absolute top-1/4 right-1/4 w-32 h-32 bg-cyan-300/15 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-1/3 left-1/5 w-40 h-40 bg-indigo-300/15 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "3s" }}
            ></div>
            <div
              className="absolute top-2/3 right-2/3 w-24 h-24 bg-rose-300/15 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "5s" }}
            ></div>

            {/* Small floating dots */}
            <div
              className="absolute top-1/6 left-1/3 w-3 h-3 bg-sky-500/40 rounded-full animate-bounce"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute top-1/2 right-1/5 w-2 h-2 bg-blue-500/50 rounded-full animate-bounce"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-purple-500/30 rounded-full animate-bounce"
              style={{ animationDelay: "2.5s" }}
            ></div>
            <div
              className="absolute top-3/4 left-1/6 w-2 h-2 bg-cyan-500/40 rounded-full animate-bounce"
              style={{ animationDelay: "3.5s" }}
            ></div>
            <div
              className="absolute top-1/3 right-1/3 w-3 h-3 bg-indigo-500/35 rounded-full animate-bounce"
              style={{ animationDelay: "4.5s" }}
            ></div>

            {/* Geometric shapes */}
            <div
              className="absolute top-1/5 left-2/3 w-6 h-6 bg-sky-400/25 rotate-45 animate-pulse blur-sm"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-1/5 right-1/6 w-8 h-8 bg-blue-400/20 rotate-12 animate-pulse blur-sm"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute top-2/5 left-1/4 w-5 h-5 bg-purple-400/30 rotate-45 animate-pulse blur-sm"
              style={{ animationDelay: "3s" }}
            ></div>

            {/* Gradient streaks */}
            <div
              className="absolute top-0 left-1/4 w-px h-32 bg-linear-to-b from-sky-500/20 to-transparent animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-0 right-1/3 w-px h-24 bg-linear-to-t from-blue-500/20 to-transparent animate-pulse"
              style={{ animationDelay: "4s" }}
            ></div>
            <div
              className="absolute top-1/2 right-0 w-24 h-px bg-linear-to-l from-purple-500/20 to-transparent animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-1/3 left-0 w-20 h-px bg-linear-to-r from-cyan-500/20 to-transparent animate-pulse"
              style={{ animationDelay: "3s" }}
            ></div>
          </>
        )
    }
  }

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}>
      {renderElements()}
    </div>
  )
}
