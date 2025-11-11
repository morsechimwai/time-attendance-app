"use client"

import { Badge } from "@/components/ui/badge"

import type { EmployeeStatus } from "../types"

type EmployeeStatusBadgeProps = {
  status: EmployeeStatus
}

export function EmployeeStatusBadge({ status }: EmployeeStatusBadgeProps) {
  switch (status) {
    case "ACTIVE":
      return (
        <Badge variant="default" className="text-xs px-2 py-0">
          ปฏิบัติงาน
        </Badge>
      )
    case "PROBATION":
      return (
        <Badge variant="secondary" className="text-xs px-2 py-0">
          ทดลองงาน
        </Badge>
      )
    case "SUSPENDED":
      return (
        <Badge variant="outline" className="border-red-200 text-red-700 text-xs px-2 py-0">
          พักงาน
        </Badge>
      )
    case "RESIGNED":
      return (
        <Badge variant="outline" className="text-xs px-2 py-0">
          ลาออก
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="text-xs px-2 py-0">
          {status}
        </Badge>
      )
  }
}
