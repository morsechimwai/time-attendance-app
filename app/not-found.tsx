"use client"

import Link from "next/link"
import { ArrowUpRightIcon, CloudAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function NotFound() {
  return (
    <Empty className="h-screen">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
          <CloudAlert className="size-6 text-neutral-600 dark:text-neutral-300" />
        </EmptyMedia>
        <EmptyTitle>Page Not Found</EmptyTitle>
        <EmptyDescription className="text-neutral-600 dark:text-neutral-400">
          The page you are looking for does not exist.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          variant="link"
          asChild
          className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-50"
          size="sm"
        >
          <Link href="/">
            Go Home <ArrowUpRightIcon />
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  )
}
