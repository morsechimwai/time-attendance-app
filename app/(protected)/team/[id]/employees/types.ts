export type EmployeeStatus = "ACTIVE" | "PROBATION" | "SUSPENDED" | "RESIGNED" | string

export type SalaryType = "MONTHLY" | "DAILY" | string

export type OTRates = {
  weekday: number
  weekend: number
  holiday: number
}

export type Employee = {
  id: string
  code: string
  name: string
  position: string
  department: string
  status: EmployeeStatus
  baseSalary: number
  salaryType: SalaryType
  avatar: string | null
  email: string
  phone: string
  address: string
  startDate: string
  lastCheckIn: string
  ssfEligible: boolean
  otEligible: boolean
  otProfileId: string
  otRates: OTRates
  createdAt: string
  updatedAt: string
}
