"use client"

import Link from "next/link"
import {
  Building2,
  Calendar,
  Check,
  Clock,
  Edit,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Trash2,
  User,
  X,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDateTime, formatRelativeTime } from "@/lib/utils/formatters/datetime-formatter"

import { EmployeeStatusBadge } from "./employee-status-badge"
import { EnhancedWorkStats } from "./enhanced-work-stats"
import type { Employee } from "../types"

type EmployeeDetailsProps = {
  selectedEmployee: Employee | null
  teamId: string
}

export function EmployeeDetails({ selectedEmployee, teamId }: EmployeeDetailsProps) {
  if (!selectedEmployee) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/10">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">เลือกพนักงานเพื่อดูรายละเอียด</h3>
          <p className="text-muted-foreground">
            คลิกที่รายชื่อพนักงานทางด้านซ้ายเพื่อดูข้อมูลส่วนตัว ข้อมูลการทำงาน และสถิติการทำงาน
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Employee Header */}
      <div className="border-b bg-linear-to-r from-background to-muted/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-14 w-14 ring-1 ring-background">
                <AvatarImage src={selectedEmployee.avatar || undefined} />
                <AvatarFallback className="bg-linear-to-br from-primary/20 to-primary/5">
                  {selectedEmployee.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-foreground">{selectedEmployee.name}</h2>
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  {selectedEmployee.code}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground font-medium">{selectedEmployee.position}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <EmployeeStatusBadge status={selectedEmployee.status} />
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  <Building2 className="w-3 h-3 mr-1" />
                  {selectedEmployee.department}
                </Badge>
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatRelativeTime(selectedEmployee.startDate)}
                </Badge>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/team/${teamId}/employees/${selectedEmployee.id}`}>
                  <Edit className="h-4 w-4 mr-2" />
                  แก้ไข
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="text-red-500 bg-red-50">
                <Trash2 className="size-4 text-red-500 mr-2" />
                ลบพนักงาน
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Employee Details Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Personal Information */}
          <div className="lg:border-r">
            <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/20">
              <h3 className="text-sm font-semibold text-foreground">ข้อมูลส่วนตัว</h3>
            </div>
            <div className="space-y-3 p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">อีเมล</div>
                  <div className="text-sm font-medium text-foreground break-all">{selectedEmployee.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">เบอร์โทรศัพท์</div>
                  <div className="text-sm font-medium text-foreground">{selectedEmployee.phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">ที่อยู่</div>
                  <div className="text-sm font-medium text-foreground">{selectedEmployee.address}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div className="border-t lg:border-t-0">
            <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/20">
              <h3 className="text-sm font-semibold text-foreground">ข้อมูลการทำงาน</h3>
            </div>
            <div className="space-y-3 p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted/20 rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">แผนกงาน</div>
                  <div className="text-sm font-medium text-foreground">{selectedEmployee.department}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">วันที่เริ่มงาน</div>
                  <div className="text-sm font-medium text-foreground">
                    {formatDateTime(selectedEmployee.startDate, { style: "date" })}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    อายุงาน {formatRelativeTime(selectedEmployee.startDate)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">เข้างานล่าสุด</div>
                  <div className="text-sm font-medium text-foreground">
                    {formatDateTime(selectedEmployee.lastCheckIn, { style: "long" })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Salary Information */}
          <div className="col-span-1 lg:col-span-2 border-t border-b bg-muted/10">
            <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/20">
              <h3 className="text-sm font-semibold text-foreground">ข้อมูลเงินเดือนและสวัสดิการ</h3>
            </div>

            {/* Compact Salary Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b">
              {/* Base Salary */}
              <div className="flex items-center gap-3 p-4 border-r bg-white/50">
                <div className="w-8 h-8 bg-muted/20 rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">เงินเดือนพื้นฐาน</div>
                  <div className="text-sm font-bold text-foreground">
                    ฿{selectedEmployee.baseSalary.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {selectedEmployee.salaryType === "MONTHLY" ? "รายเดือน" : "รายวัน"}
                  </div>
                </div>
              </div>

              {/* SSF */}
              <div className="flex items-center gap-3 p-4 border-r bg-white/50">
                <div className="w-8 h-8 bg-muted/20 rounded-lg flex items-center justify-center">
                  {selectedEmployee.ssfEligible ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">ประกันสังคม</div>
                  <div className="text-sm font-bold text-foreground">
                    {selectedEmployee.ssfEligible ? "มีสิทธิ์" : "ไม่มีสิทธิ์"}
                  </div>
                  {selectedEmployee.ssfEligible && (
                    <div className="text-xs text-muted-foreground">หัก 5% (สูงสุด ฿750)</div>
                  )}
                </div>
              </div>

              {/* OT */}
              <div className="flex items-center gap-3 p-4 bg-white/50">
                <div className="w-8 h-8 bg-muted/20 rounded-lg flex items-center justify-center">
                  {selectedEmployee.otEligible ? (
                    <Clock className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">ค่าแรงล่วงเวลา</div>
                  <div className="text-sm font-bold text-foreground">
                    {selectedEmployee.otEligible ? "มีสิทธิ์" : "ไม่มีสิทธิ์"}
                  </div>
                  <Badge variant="outline" className="text-xs px-1 py-0 mt-0.5">
                    {selectedEmployee.otProfileId}
                  </Badge>
                </div>
              </div>
            </div>

            {/* OT Rates - Box Layout like Salary Info */}
            {selectedEmployee.otEligible && (
              <div>
                <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/30">
                  <div className="text-sm font-medium text-foreground">
                    อัตราค่าแรงล่วงเวลา (ต่อชั่วโมง)
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3">
                  {/* Weekday Rate */}
                  <div className="flex items-center gap-3 p-3 border-r bg-white/50">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-3 h-3 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground">วันธรรมดา</div>
                      <div className="text-sm font-bold text-foreground">
                        ฿
                        {Math.round(
                          (selectedEmployee.baseSalary / (selectedEmployee.salaryType === "MONTHLY" ? 220 : 8)) *
                            selectedEmployee.otRates.weekday
                        ).toLocaleString()}
                      </div>
                      <Badge variant="secondary" className="text-xs px-1 py-0 mt-0.5">
                        {selectedEmployee.otRates.weekday}x
                      </Badge>
                    </div>
                  </div>

                  {/* Weekend Rate */}
                  <div className="flex items-center gap-3 p-3 border-r bg-white/50">
                    <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-3 h-3 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground">สุดสัปดาห์</div>
                      <div className="text-sm font-bold text-foreground">
                        ฿
                        {Math.round(
                          (selectedEmployee.baseSalary / (selectedEmployee.salaryType === "MONTHLY" ? 220 : 8)) *
                            selectedEmployee.otRates.weekend
                        ).toLocaleString()}
                      </div>
                      <Badge variant="secondary" className="text-xs px-1 py-0 mt-0.5">
                        {selectedEmployee.otRates.weekend}x
                      </Badge>
                    </div>
                  </div>

                  {/* Holiday Rate */}
                  <div className="flex items-center gap-3 p-3 bg-white/50">
                    <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-3 h-3 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground">นักขัตฤกษ์</div>
                      <div className="text-sm font-bold text-foreground">
                        ฿
                        {Math.round(
                          (selectedEmployee.baseSalary / (selectedEmployee.salaryType === "MONTHLY" ? 220 : 8)) *
                            selectedEmployee.otRates.holiday
                        ).toLocaleString()}
                      </div>
                      <Badge variant="secondary" className="text-xs px-1 py-0 mt-0.5">
                        {selectedEmployee.otRates.holiday}x
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Work Performance Statistics */}
          <div className="col-span-1 lg:col-span-2">
            <EnhancedWorkStats selectedEmployee={selectedEmployee} />
          </div>
        </div>
      </div>
    </div>
  )
}
