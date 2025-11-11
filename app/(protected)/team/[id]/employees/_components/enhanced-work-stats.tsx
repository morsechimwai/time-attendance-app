"use client"

import { Calendar, Clock } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

import type { Employee } from "../types"

type EnhancedWorkStatsProps = {
  selectedEmployee: Employee
}

export function EnhancedWorkStats({ selectedEmployee }: EnhancedWorkStatsProps) {
  void selectedEmployee
  // Mock performance data (in real app, this would come from API)
  const workDays = 22
  const attendedDays = 22
  const lateCount = 2
  const leaveDays = 0
  const leaveBalance = 12

  const attendancePercentage = Math.round((attendedDays / workDays) * 100)
  const punctualityScore = Math.max(0, 100 - lateCount * 5) // Deduct 5% per late day
  const leaveUsage = Math.round((leaveDays / (leaveDays + leaveBalance || 1)) * 100)

  return (
    <div>
      <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/20">
        <h4 className="text-sm font-semibold text-foreground">สถิติการทำงาน</h4>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Attendance */}
        <div className="p-4 border-r border-b bg-white/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-muted/30 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground">การเข้างาน</div>
              <div className="text-sm font-bold text-foreground">
                {attendedDays}/{workDays} วัน
              </div>
            </div>
            <Badge
              variant={
                attendancePercentage >= 95
                  ? "default"
                  : attendancePercentage >= 85
                  ? "secondary"
                  : "destructive"
              }
              className="text-xs px-1 py-0"
            >
              {attendancePercentage}%
            </Badge>
          </div>
          <Progress value={attendancePercentage} className="h-2" />
        </div>

        {/* Punctuality */}
        <div className="p-4 border-r border-b bg-white/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-muted/30 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground">ความตรงต่อเวลา</div>
              <div className="text-sm font-bold text-foreground">มาสาย {lateCount} ครั้ง</div>
            </div>
            <Badge
              variant={
                punctualityScore >= 95
                  ? "default"
                  : punctualityScore >= 80
                  ? "secondary"
                  : "destructive"
              }
              className="text-xs px-1 py-0"
            >
              {punctualityScore}%
            </Badge>
          </div>
          <Progress value={punctualityScore} className="h-2" />
        </div>

        {/* Leave Balance */}
        <div className="p-4 border-b bg-white/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-muted/30 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground">วันลา</div>
              <div className="text-sm font-bold text-foreground">เหลือ {leaveBalance} วัน</div>
            </div>
            <Badge variant="outline" className="text-xs px-1 py-0">
              ใช้ {leaveDays}
            </Badge>
          </div>
          <Progress value={leaveUsage} className="h-2" />
        </div>
      </div>
    </div>
  )
}
