"use client"

import Link from "next/link"
import { Download, SlidersHorizontal, UserRoundPlus, UserSearch } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { EmployeeStatusBadge } from "./employee-status-badge"
import type { Employee } from "../types"

type EmployeeSidebarProps = {
  teamId: string
  employees: Employee[]
  filteredEmployees: Employee[]
  selectedEmployee: Employee | null
  onSelectEmployee: (employee: Employee) => void
  searchTerm: string
  onSearchTermChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  departmentFilter: string
  onDepartmentFilterChange: (value: string) => void
  salaryTypeFilter: string
  onSalaryTypeFilterChange: (value: string) => void
  departments: string[]
  salaryTypes: string[]
  selectedEmployeeIds: string[]
  onBulkExport: () => void
  onBulkStatusChange: (status: string) => void
}

export function EmployeeSidebar({
  teamId,
  employees,
  filteredEmployees,
  selectedEmployee,
  onSelectEmployee,
  searchTerm,
  onSearchTermChange,
  statusFilter,
  onStatusFilterChange,
  departmentFilter,
  onDepartmentFilterChange,
  salaryTypeFilter,
  onSalaryTypeFilterChange,
  departments,
  salaryTypes,
  selectedEmployeeIds,
  onBulkExport,
  onBulkStatusChange,
}: EmployeeSidebarProps) {
  return (
    <div className="w-full lg:w-80 lg:border-r bg-muted/30 flex flex-col max-h-[45vh] lg:max-h-full">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-3 py-3 border-b">
          <h1 className="text-lg font-bold text-foreground">พนักงาน</h1>
          <div className="flex gap-1">
            {selectedEmployeeIds.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="secondary" className="h-8 text-xs">
                    <SlidersHorizontal className="size-3 mr-1" />
                    จัดการ ({selectedEmployeeIds.length})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onBulkExport}>
                    <Download className="size-4 mr-2" />
                    Export ที่เลือก
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onBulkStatusChange("ACTIVE")}>
                    เปลี่ยนเป็น &ldquo;ปฏิบัติงาน&rdquo;
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onBulkStatusChange("SUSPENDED")}>
                    เปลี่ยนเป็น &ldquo;พักงาน&rdquo;
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Link href={`/team/${teamId}/employees/new`}>
              <Button size="sm" variant="outline" className="h-8">
                <UserRoundPlus className="size-3" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-3 space-y-2 bg-muted/20">
          {/* Search */}
          <div className="relative">
            <UserSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="ค้นหาพนักงาน..."
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              className="pl-10 h-9 text-sm bg-background/60 border-border/50 focus:bg-background focus:border-primary"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-3 gap-1.5">
            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
              <SelectTrigger className="h-8 text-xs px-2 bg-background/60 border-border/50 focus:bg-background focus:border-primary">
                <SelectValue placeholder="สถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกสถานะ</SelectItem>
                <SelectItem value="ACTIVE">ปฏิบัติงาน</SelectItem>
                <SelectItem value="PROBATION">ทดลองงาน</SelectItem>
                <SelectItem value="SUSPENDED">พักงาน</SelectItem>
                <SelectItem value="RESIGNED">ลาออก</SelectItem>
              </SelectContent>
            </Select>

            <Select value={departmentFilter} onValueChange={onDepartmentFilterChange}>
              <SelectTrigger className="h-8 text-xs px-2 bg-background/60 border-border/50 focus:bg-background focus:border-primary">
                <SelectValue placeholder="แผนก" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกแผนก</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={salaryTypeFilter} onValueChange={onSalaryTypeFilterChange}>
              <SelectTrigger className="h-8 text-xs px-2 bg-background/60 border-border/50 focus:bg-background focus:border-primary">
                <SelectValue placeholder="ประเภท" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกประเภท</SelectItem>
                {salaryTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "MONTHLY" ? "รายเดือน" : "รายวัน"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between px-3 py-2 text-xs text-muted-foreground border-t bg-muted/10">
          <div className="flex items-center gap-3">
            <span>
              ทั้งหมด <span className="font-medium text-foreground">{employees.length}</span>
            </span>
            <span>•</span>
            <span>
              แสดง <span className="font-medium text-foreground">{filteredEmployees.length}</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="font-medium text-foreground">
              {filteredEmployees.filter((e) => e.status === "ACTIVE").length}
            </span>
          </div>
        </div>
      </div>

      {/* Employee List */}
      <div className="flex-1 overflow-y-auto">
        {filteredEmployees.map((employee) => (
          <div
            key={employee.id}
            onClick={() => onSelectEmployee(employee)}
            className={`p-3 cursor-pointer border-b hover:bg-muted/40 transition-all duration-200 ${
              selectedEmployee?.id === employee.id
                ? "bg-primary/5 border-l-4 border-l-primary shadow-sm"
                : "hover:shadow-sm"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="size-10 ring-1 ring-background">
                  <AvatarImage src={employee.avatar || undefined} />
                  <AvatarFallback className="bg-linear-to-br from-muted to-muted/50 text-xs">
                    {employee.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${
                    employee.status === "ACTIVE"
                      ? "bg-green-500"
                      : employee.status === "PROBATION"
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                  }`}
                ></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium text-foreground truncate text-sm">
                    {employee.name}
                  </div>
                  <EmployeeStatusBadge status={employee.status} />
                </div>
                <div className="text-xs text-muted-foreground truncate mt-0.5">
                  {employee.code} • {employee.position}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{employee.department}</div>
              </div>
            </div>
          </div>
        ))}

        {filteredEmployees.length === 0 && (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <UserSearch className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="text-sm font-medium text-muted-foreground mb-1">ไม่พบพนักงาน</div>
            <div className="text-xs text-muted-foreground">
              ลองเปลี่ยนเงื่อนไขการค้นหาหรือตัวกรองใหม่
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
