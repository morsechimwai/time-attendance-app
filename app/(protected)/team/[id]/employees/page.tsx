"use client"

import { useState } from "react"
import { useParams } from "next/navigation"

import { EmployeeDetails } from "./_components/employee-details"
import { EmployeeSidebar } from "./_components/employee-sidebar"
import type { Employee } from "./types"

// Mock data (จะเปลี่ยนเป็น API จริงในอนาคต)
const mockEmployees: Employee[] = [
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

// Components are extracted to ./_components

export default function EmployeesPage() {
  const params = useParams()
  const teamId = params?.id as string
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(mockEmployees[0])
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
      <EmployeeSidebar
        teamId={teamId}
        employees={mockEmployees}
        filteredEmployees={filteredEmployees}
        selectedEmployee={selectedEmployee}
        onSelectEmployee={setSelectedEmployee}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        departmentFilter={departmentFilter}
        onDepartmentFilterChange={setDepartmentFilter}
        salaryTypeFilter={salaryTypeFilter}
        onSalaryTypeFilterChange={setSalaryTypeFilter}
        departments={departments}
        salaryTypes={salaryTypes}
        selectedEmployeeIds={selectedEmployeeIds}
        onBulkExport={handleBulkExport}
        onBulkStatusChange={handleBulkStatusChange}
      />

      <div className="flex-1 flex flex-col xl:flex-row">
        <EmployeeDetails selectedEmployee={selectedEmployee} teamId={teamId} />
      </div>
    </div>
  )
}
