import { CopyrightIcon } from "lucide-react"
import Link from "next/link"

interface CopyrightProps {
  className?: string
}

export default function Copyright({ className }: CopyrightProps) {
  return (
    <div
      className={`flex gap-1 items-center w-full mt-auto text-sm font-sans font-medium ${className}`}
    >
      <CopyrightIcon className="size-4" />
      <span>{new Date().getFullYear()} built with 🩵 by</span>
      <Link
        href="https://github.com/morsechimwai"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 hover:text-neutral-900 dark:hover:text-neutral-50 font-semibold"
      >
        morsechimwai
      </Link>
    </div>
  )
}
