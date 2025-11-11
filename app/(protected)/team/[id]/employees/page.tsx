"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  Edit,
  MoreHorizontal,
  Trash2,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Building2,
  UserRoundPlus,
  UserSearch,
  Download,
  SlidersHorizontal,
  Check,
  X,
} from "lucide-react"

// UI Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDateTime, formatRelativeTime } from "@/lib/utils/formatters/datetime-formatter"

// Mock data (จะเปลี่ยนเป็น API จริงในอนาคต)
const mockEmployees = [
  {
    id: "1",
    code: "EMP001",
    name: "สมชาย ใจดี",
    position: "วิศวกรซอฟต์แวร์",
    department: "IT",
    status: "ACTIVE",
    baseSalary: 50000,
    salaryType: "MONTHLY",
    avatar: null,
    email: "somchai@company.com",
    phone: "081-234-5678",
    address: "กรุงเทพมหานคร",
    startDate: "2023-01-15",
    lastCheckIn: "2024-11-10 08:30",
    ssfEligible: true,
    otEligible: true,
    otProfileId: "default",
    otRates: {
      weekday: 1.5,
      weekend: 2.0,
      holiday: 3.0,
    },
    createdAt: "2023-01-15 09:00",
    updatedAt: "2024-11-08 14:30",
  },
  {
    id: "2",
    code: "EMP002",
    name: "สมหญิง รักดี",
    position: "นักบัญชี",
    department: "การเงิน",
    status: "ACTIVE",
    baseSalary: 35000,
    salaryType: "MONTHLY",
    avatar: null,
    email: "somying@company.com",
    phone: "081-234-5679",
    address: "นนทบุรี",
    startDate: "2022-06-01",
    lastCheckIn: "2024-11-10 08:15",
    ssfEligible: true,
    otEligible: true,
    otProfileId: "default",
    otRates: {
      weekday: 1.5,
      weekend: 2.0,
      holiday: 3.0,
    },
    createdAt: "2022-06-01 08:30",
    updatedAt: "2024-11-09 10:15",
  },
  {
    id: "3",
    code: "EMP003",
    name: "อนันต์ ขยันทำงาน",
    position: "พนักงานผลิต",
    department: "โรงงาน",
    status: "PROBATION",
    baseSalary: 400,
    salaryType: "DAILY",
    avatar: null,
    email: "anan@company.com",
    phone: "081-234-5680",
    address: "ปทุมธานี",
    startDate: "2024-10-01",
    lastCheckIn: "2024-11-10 07:45",
    ssfEligible: false, // ทดลองงานยังไม่มีสิทธิ์ประกันสังคม
    otEligible: true,
    otProfileId: "production",
    otRates: {
      weekday: 1.5,
      weekend: 1.8,
      holiday: 2.5,
    },
    createdAt: "2024-10-01 07:00",
    updatedAt: "2024-11-10 07:45",
  },
  {
    id: "4",
    code: "MGR001",
    name: "มาลี สวยงาม",
    position: "HR Manager",
    department: "ทรัพยากรบุคคล",
    status: "ACTIVE",
    baseSalary: 45000,
    salaryType: "MONTHLY",
    avatar: null,
    email: "malee@company.com",
    phone: "081-234-5681",
    address: "กรุงเทพมหานคร",
    startDate: "2021-03-01",
    lastCheckIn: "2024-11-10 08:00",
    ssfEligible: true,
    otEligible: false, // ผู้จัดการไม่ได้รับ OT
    otProfileId: "manager",
    otRates: {
      weekday: 0,
      weekend: 0,
      holiday: 0,
    },
    createdAt: "2021-03-01 09:00",
    updatedAt: "2024-11-05 16:20",
  },
  {
    id: "5",
    code: "SAL001",
    name: "วิชัย ยิ้มแย้ม",
    position: "พนักงานขาย",
    department: "ขาย",
    status: "SUSPENDED",
    baseSalary: 25000,
    salaryType: "MONTHLY",
    avatar: null,
    email: "wichai@company.com",
    phone: "081-234-5682",
    address: "สมุทรปราการ",
    startDate: "2023-08-15",
    lastCheckIn: "2024-11-05 08:20",
    ssfEligible: true,
    otEligible: true,
    otProfileId: "default",
    otRates: {
      weekday: 1.5,
      weekend: 2.0,
      holiday: 3.0,
    },
    createdAt: "2023-08-15 08:00",
    updatedAt: "2024-11-01 14:30",
  },
]

// Status badge styles - Natural colors only
const getStatusBadge = (status: string) => {
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

// Enhanced Work Statistics Component
const EnhancedWorkStats = ({
  selectedEmployee, // eslint-disable-line @typescript-eslint/no-unused-vars
}: {
  selectedEmployee: (typeof mockEmployees)[0]
}) => {
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

export default function EmployeesPage() {
  const params = useParams()
  const teamId = params?.id as string
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState<(typeof mockEmployees)[0] | null>(
    mockEmployees[0]
  )
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [salaryTypeFilter, setSalaryTypeFilter] = useState<string>("all")
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([])

  // Get unique departments and salary types for filters
  const departments = Array.from(new Set(mockEmployees.map((emp) => emp.department)))
  const salaryTypes = Array.from(new Set(mockEmployees.map((emp) => emp.salaryType)))

  // Filter employees based on search term and filters
  const filteredEmployees = mockEmployees.filter((employee) => {
    // Search term filter
    const matchesSearch =
      searchTerm === "" ||
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter

    // Department filter
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter

    // Salary type filter
    const matchesSalaryType = salaryTypeFilter === "all" || employee.salaryType === salaryTypeFilter

    return matchesSearch && matchesStatus && matchesDepartment && matchesSalaryType
  })

  // Bulk actions functions
  const handleBulkExport = () => {
    console.log("Exporting employees:", selectedEmployeeIds)
    // TODO: Implement actual export functionality
  }

  const handleBulkStatusChange = (newStatus: string) => {
    console.log("Changing status to:", newStatus, "for employees:", selectedEmployeeIds)
    // TODO: Implement actual bulk status update
    setSelectedEmployeeIds([])
  }

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden">
      {/* Left Sidebar - Employee List */}
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
                    <DropdownMenuItem onClick={handleBulkExport}>
                      <Download className="size-4 mr-2" />
                      Export ที่เลือก
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleBulkStatusChange("ACTIVE")}>
                      เปลี่ยนเป็น &ldquo;ปฏิบัติงาน&rdquo;
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkStatusChange("SUSPENDED")}>
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-9 text-sm bg-background/60 border-border/50 focus:bg-background focus:border-primary"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-3 gap-1.5">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
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

              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
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

              <Select value={salaryTypeFilter} onValueChange={setSalaryTypeFilter}>
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
                ทั้งหมด <span className="font-medium text-foreground">{mockEmployees.length}</span>
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
              onClick={() => setSelectedEmployee(employee)}
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
                    {getStatusBadge(employee.status)}
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col xl:flex-row">
        {/* Employee Details */}
        <div className="flex-1 flex flex-col">
          {selectedEmployee ? (
            <>
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
                        <h2 className="text-xl font-bold text-foreground">
                          {selectedEmployee.name}
                        </h2>
                        <Badge variant="secondary" className="text-xs px-2 py-0.5">
                          {selectedEmployee.code}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium">
                        {selectedEmployee.position}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {getStatusBadge(selectedEmployee.status)}
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
                          <div className="text-sm font-medium text-foreground break-all">
                            {selectedEmployee.email}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted/20 rounded-lg flex items-center justify-center">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-muted-foreground">เบอร์โทรศัพท์</div>
                          <div className="text-sm font-medium text-foreground">
                            {selectedEmployee.phone}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted/20 rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-muted-foreground">ที่อยู่</div>
                          <div className="text-sm font-medium text-foreground">
                            {selectedEmployee.address}
                          </div>
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
                          <div className="text-sm font-medium text-foreground">
                            {selectedEmployee.department}
                          </div>
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
                      <h3 className="text-sm font-semibold text-foreground">
                        ข้อมูลเงินเดือนและสวัสดิการ
                      </h3>
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
                            <div className="text-xs text-muted-foreground">
                              หัก 5% (สูงสุด ฿750)
                            </div>
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
                                  (selectedEmployee.baseSalary /
                                    (selectedEmployee.salaryType === "MONTHLY" ? 220 : 8)) *
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
                                  (selectedEmployee.baseSalary /
                                    (selectedEmployee.salaryType === "MONTHLY" ? 220 : 8)) *
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
                                  (selectedEmployee.baseSalary /
                                    (selectedEmployee.salaryType === "MONTHLY" ? 220 : 8)) *
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
                  {selectedEmployee && (
                    <div className="col-span-1 lg:col-span-2">
                      <EnhancedWorkStats selectedEmployee={selectedEmployee} />
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-muted/10">
              <div className="text-center max-w-md">
                <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  เลือกพนักงานเพื่อดูรายละเอียด
                </h3>
                <p className="text-muted-foreground">
                  คลิกที่รายชื่อพนักงานทางด้านซ้ายเพื่อดูข้อมูลส่วนตัว ข้อมูลการทำงาน
                  และสถิติการทำงาน
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
