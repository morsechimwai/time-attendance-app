# 📘 Database Schema — Time Attendance & Payroll

Version: v1.2 (schema synced with `prisma/schema.prisma`)

ระบบเป็น multi-tenant เชื่อมกับ StackAuth; ทุกตารางหลักมี `teamId` สำหรับแยกข้อมูลแต่ละองค์กร

---

## 👨‍🏭 Employee

> เก็บข้อมูลพนักงาน ใช้ร่วมทั้ง attendance และ payroll

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (CUID) | Primary key |
| `teamId` | String | StackAuth Team ID |
| `code` | String | รหัสพนักงาน (unique per team) |
| `name` | String | ชื่อ-นามสกุล |
| `position` | String? | ตำแหน่ง |
| `department` | String? | แผนก |
| `salaryType` | `SalaryType` | `MONTHLY` \| `DAILY` |
| `baseSalary` | Decimal(12,2) | ฐานเงินเดือน/ค่าแรง |
| `otEligible` | Boolean | default `true` |
| `ssfEligible` | Boolean | default `true` |
| `status` | `EmployeeStatus` | default `ACTIVE` |
| `active` | Boolean | default `true` (soft-active flag) |
| `otProfileId` | String? | FK → `OtProfile.id` |
| `otProfile` | Relation | OT rule ที่ผูกกับพนักงาน (nullable) |
| `createdAt` | DateTime | default `now()` |
| `updatedAt` | DateTime | auto update |

**Relations:** `faces`, `checkEvents`, `attendance`, `payrollRows`  
**Indexes:** `@@unique([teamId, code])`, `@@index([teamId, active])`

---

## 🧠 FaceEmbedding

> เก็บ Face vector ของพนักงานเพื่อทำ face recognition

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (CUID) | Primary key |
| `teamId` | String | Multi-tenant isolation |
| `employeeId` | String | FK → `Employee.id` (cascade) |
| `vector` | Bytes | Serialized embedding |
| `version` | String | เวอร์ชันโมเดล เช่น `arcface_v1` |
| `embeddingDim` | Int | default `512` |
| `createdAt` | DateTime | default `now()` |

**Indexes:** `@@index([teamId, employeeId])`

---

## 📸 CheckEvent

> Log การ check-in/check-out ทุกครั้งจาก kiosk หรือ mobile

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (CUID) | Primary key |
| `teamId` | String | Multi-tenant isolation |
| `employeeId` | String | FK → `Employee.id` (cascade) |
| `kind` | `CheckKind` | `IN` \| `OUT` |
| `ts` | DateTime | เวลาจริงของการสแกน |
| `source` | String? | เช่น kiosk ID |
| `timezone` | String? | เช่น `Asia/Bangkok` |
| `liveness` | Boolean | default `false` |
| `latitude` | Decimal(9,6)? | Optional geo |
| `longitude` | Decimal(9,6)? | Optional geo |
| `accuracy` | Decimal(5,2)? | Optional geo accuracy (m) |
| `createdAt` | DateTime | default `now()` |

**Indexes:** `@@index([teamId, ts])`, `@@index([teamId, employeeId, ts])`

---

## 📅 AttendanceDay

> สรุปผลการทำงานรายวัน (input สำคัญของ payroll)

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (CUID) | Primary key |
| `teamId` | String | Multi-tenant isolation |
| `employeeId` | String | FK → `Employee.id` (cascade) |
| `date` | DateTime | วันที่ (เก็บ UTC) |
| `workMinutes` | Int | default `0` |
| `lateMinutes` | Int | default `0` |
| `otWeekday` | Int | default `0` |
| `otWeekend` | Int | default `0` |
| `otHoliday` | Int | default `0` |
| `status` | `AttendanceStatus` | default `OK` |
| `notes` | String? | หมายเหตุ |
| `computedAt` | DateTime | default `now()` |
| `overrideBy` | String? | StackAuth userId |
| `overrideAt` | DateTime? | เวลาที่แก้ไขด้วยมือ |
| `createdAt` | DateTime | default `now()` |

**Indexes:** `@@unique([teamId, employeeId, date])`, `@@index([teamId, employeeId, date])`, `@@index([teamId, date])`, `@@index([teamId, date, status])`

---

## 🎌 Holiday

> วันหยุดประจำปีหรือพิเศษของแต่ละทีม

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (CUID) | Primary key |
| `teamId` | String | Multi-tenant isolation |
| `date` | DateTime | วันที่หยุด |
| `kind` | `HolidayKind` | `PUBLIC` \| `COMPANY` \| `SPECIAL` |
| `name` | String | ชื่อวันหยุด |
| `createdAt` | DateTime | default `now()` |
| `updatedAt` | DateTime | auto update |

**Indexes:** `@@unique([teamId, date])`, `@@index([teamId, date])`

---

## ⚙️ OtProfile

> เก็บ config สำหรับกติกา OT ต่อทีม และสามารถผูกตรงกับพนักงาน

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (CUID) | Primary key |
| `teamId` | String | Multi-tenant isolation |
| `name` | String | default `"Default"` |
| `json` | Json | rule ปัจจุบัน |
| `snapshot` | Json? | สำเนา rule (เช่น ขณะ generate payroll) |
| `createdAt` | DateTime | default `now()` |
| `updatedAt` | DateTime | auto update |

**Relations:** `employees` → `Employee[]`  
**Indexes:** `@@unique([teamId, name])`, `@@index([teamId])`

---

## 💵 PayrollPeriod

> กำหนดช่วงการจ่ายเงินเดือนเพื่อ grouping attendance

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (CUID) | Primary key |
| `teamId` | String | Multi-tenant isolation |
| `title` | String | เช่น `งวด 1-15 พ.ย. 2025` |
| `mode` | `PayrollMode` | `PAY_PERIOD` \| `ROLLING_7_DAYS` \| `ISO_WEEK` |
| `startDate` | DateTime | วันเริ่มงวด |
| `endDate` | DateTime | วันสิ้นสุดงวด |
| `status` | `PayrollStatus` | default `DRAFT` |
| `otProfileSnapshot` | Json? | Snapshot ของ OT config |
| `timezone` | String? | เช่น `Asia/Bangkok` |
| `createdAt` | DateTime | default `now()` |
| `updatedAt` | DateTime | auto update |

**Relations:** `rows` → `PayrollRow[]`  
**Indexes:** `@@index([teamId, startDate, endDate])`

---

## 🧾 PayrollRow

> รายการเงินเดือนต่อพนักงานในแต่ละงวด (ใช้สร้าง payslip)

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (CUID) | Primary key |
| `teamId` | String | Multi-tenant isolation |
| `periodId` | String | FK → `PayrollPeriod.id` (cascade) |
| `employeeId` | String | FK → `Employee.id` (cascade) |
| `basePay` | Decimal(12,2) | ค่าจ้างพื้นฐาน |
| `otPay` | Decimal(12,2) | ค่า OT |
| `lateDeduction` | Decimal(12,2) | หักมาสาย |
| `ssf` | Decimal(12,2) | เงินประกันสังคม |
| `adjustments` | Decimal(12,2) | ปรับเพิ่มลด |
| `adjustNote` | String? | บันทึกการปรับ |
| `adjustBy` | String? | StackAuth userId |
| `netPay` | Decimal(12,2) | เงินสุทธิ |
| `workMinutes` | Int | default `0` |
| `otMinutes` | Int | default `0` |
| `lateMinutes` | Int | default `0` |
| `data` | Json? | Snapshot ตอนคำนวณ |
| `createdAt` | DateTime | default `now()` |
| `updatedAt` | DateTime | auto update |

**Indexes:** `@@unique([teamId, periodId, employeeId])`, `@@index([teamId, employeeId, periodId])`, `@@index([teamId, employeeId])`, `@@index([teamId, periodId])`

---

## 🗃️ AuditLog

> เก็บประวัติการเปลี่ยนแปลงหรือกิจกรรมสำคัญของระบบ

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (CUID) | Primary key |
| `teamId` | String | Multi-tenant isolation |
| `entity` | String | ชื่อ entity เช่น `Employee` |
| `entityId` | String | รหัส entity ที่ได้รับผลกระทบ |
| `action` | `AuditAction` | ประเภทกิจกรรม |
| `data` | Json | Snapshot เมื่อเกิด event |
| `metadata` | Json? | ข้อมูลเสริม เช่น diff, request |
| `userId` | String? | StackAuth userId ที่กระทำ |
| `createdAt` | DateTime | default `now()` |

**Indexes:** `@@index([teamId, entity])`, `@@index([teamId, createdAt])`, `@@index([teamId, userId])`

---

## ⚙️ Enums

| Enum | Values | Usage |
|------|--------|-------|
| `EmployeeStatus` | `ACTIVE`, `RESIGNED`, `PROBATION`, `SUSPENDED` | สถานะพนักงาน |
| `SalaryType` | `MONTHLY`, `DAILY` | ประเภทการจ่ายเงิน |
| `CheckKind` | `IN`, `OUT` | ชนิดของ check event |
| `PayrollStatus` | `DRAFT`, `FINAL` | สถานะปิดงวด |
| `PayrollMode` | `PAY_PERIOD`, `ROLLING_7_DAYS`, `ISO_WEEK` | สูตรแบ่งงวด |
| `AttendanceStatus` | `OK`, `ABSENT`, `LATE`, `LEAVE` | ผลสรุป attendance |
| `HolidayKind` | `PUBLIC`, `COMPANY`, `SPECIAL` | ประเภทวันหยุด |
| `AuditAction` | `CREATE`, `UPDATE`, `DELETE`, `LOGIN`, `LOGOUT`, `SYNC`, `GENERATE` | ประเภทกิจกรรม audit |

---

## 🧩 Data Flow Summary

`FaceEmbedding` → `CheckEvent` → `AttendanceDay` → `PayrollRow` → Payslip  
Attendance engine จะ update `AttendanceDay` เมื่อมี `CheckEvent` ใหม่ และ payroll generator รวมข้อมูลเหล่านี้ต่อ `PayrollPeriod` ตาม `teamId`; การเปลี่ยนแปลงสำคัญจะถูกบันทึกไว้ใน `AuditLog`.
