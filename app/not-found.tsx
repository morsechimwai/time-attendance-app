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
        <EmptyMedia variant="icon">
          <CloudAlert className="size-6 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>Page Not Found</EmptyTitle>
        <EmptyDescription>The page you are looking for does not exist.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="link" asChild className="text-muted-foreground" size="sm">
          <Link href="/">
            Go Home <ArrowUpRightIcon />
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  )
}
