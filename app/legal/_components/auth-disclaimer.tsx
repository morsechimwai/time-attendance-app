// NextJS
import Link from "next/link"

export default function AuthDisclaimer() {
  return (
    <div
      className="font-sans text-sm text-primary/30
          mt-4"
    >
      By using this service, you agree to our{" "}
      <Link className="hover:opacity-60 underline text-primary" href="/legal/terms">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link className="hover:opacity-60 underline text-primary" href="/legal/privacy">
        Privacy Policy
      </Link>
      . We may send product updates & account notifications. You can unsubscribe anytime.
    </div>
  )
}
