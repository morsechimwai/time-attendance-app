# 📘 Database Schema Documentation — Face Attendance & Payroll System

Version: v1.0 (MVP ready)

---

## 🏢 **Organization**

> เก็บข้อมูลของบริษัท / tenant แต่ละรายในระบบ (multi-tenant SaaS)

| Field | Type | Description |
|--------|------|-------------|
| `id` | String (CUID) | รหัสองค์กร (primary key) |
| `name` | String | ชื่อองค์กร |
| `locale` | String? | รูปแบบ locale เช่น `"th-TH"`, `"en-US"` |
| `timezone` | String? | Time zone เช่น `"Asia/Bangkok"` ใช้คำนวณเวลา check-in/out |
| `otProfileId` | String? | อ้างถึงโปรไฟล์ OT ปัจจุบันที่องค์กรใช้ |
| `otProfile` | Relation → `OtProfile` | ความสัมพันธ์ไปยัง rule engine ของ OT |
| `createdAt` / `updatedAt` | DateTime | บันทึกเวลาสร้าง/อัปเดต |

**Relations:**
`users`, `employees`, `holidays`, `payrolls`

---

## 👤 **User**

> ผู้ใช้ระบบ (ตอน MVP มีแค่ Admin)

| Field | Type | Description |
|--------|------|-------------|
| `id` | String | StackAuth ID ของ user |
| `orgId` | String | อ้างถึงองค์กรที่ user สังกัด |
| `email` | String | ใช้ login / ติดต่อ |
| `name` | String | ชื่อเต็มของ user |
| `role` | String | บทบาท เช่น `"ADMIN"` |
| `createdAt`, `updatedAt` | DateTime | เวลาสร้าง / อัปเดต |

---

## 👨‍🏭 **Employee**

> ข้อมูลพนักงานแต่ละคน ใช้ใน Attendance และ Payroll

| Field | Type | Description |
|--------|------|-------------|
| `id` | String | รหัสพนักงานภายในระบบ |
| `orgId` | String | องค์กรที่สังกัด |
| `code` | String | รหัสพนักงาน (HR code) |
| `name` | String | ชื่อพนักงาน |
| `position` | String? | ตำแหน่ง |
| `department` | String? | แผนก |
| `salaryType` | Enum (`MONTHLY` / `DAILY`) | ประเภทเงินเดือน |
| `baseSalary` | Decimal(12,2) | เงินเดือนหรือค่าจ้างพื้นฐาน |
| `otEligible` | Boolean | มีสิทธิ์ OT หรือไม่ |
| `ssfEligible` | Boolean | มีสิทธิ์ประกันสังคมหรือไม่ |
| `active` | Boolean | สถานะการทำงาน |
| `createdAt`, `updatedAt` | DateTime | Audit timestamps |

**Relations:**
`faces`, `checkEvents`, `attendance`, `payrollRows`

---

## 🧠 **FaceEmbedding**

> เก็บเวกเตอร์ใบหน้าที่ encode จากภาพเพื่อใช้ตรวจจับใน kiosk

| Field | Type | Description |
|--------|------|-------------|
| `id` | String | Primary key |
| `orgId` | String | องค์กรเจ้าของข้อมูล |
| `employeeId` | String | อ้างถึงพนักงาน |
| `vector` | Bytes | ข้อมูลเวกเตอร์ (Float32Array serialized) |
| `version` | String | เวอร์ชันของโมเดล เช่น `"arcface_512_v1"` |
| `embeddingDim` | Int | ความยาวของ embedding (default 512) |
| `createdAt` | DateTime | เวลาสร้าง record |

**Cascade delete:** เมื่อพนักงานถูกลบ ข้อมูลใบหน้าจะถูกลบตาม

---

## 📸 **CheckEvent**

> เก็บข้อมูลการ Check-in / Check-out จาก kiosk (log ทุกครั้ง)

| Field | Type | Description |
|--------|------|-------------|
| `id` | String | Primary key |
| `orgId` | String | องค์กรที่สังกัด |
| `employeeId` | String | อ้างถึงพนักงาน |
| `kind` | Enum (`IN` / `OUT`) | ประเภทของ event |
| `ts` | DateTime | เวลาจริงของการสแกน |
| `source` | String? | kiosk ID หรือ IP ที่มาของข้อมูล |
| `timezone` | String? | โซนเวลาของ kiosk เช่น `"Asia/Bangkok"` |
| `liveness` | Boolean | ผ่านการตรวจ liveness หรือไม่ |
| `latitude` | Decimal(9,6)? | ละติจูด (องศา, optional) |
| `longitude` | Decimal(9,6)? | ลองจิจูด (องศา, optional) |
| `accuracy` | Decimal(5,2)? | ความแม่นยำ (เมตร, optional) |
| `createdAt` | DateTime | เวลา insert log |

**Index:** `(orgId, employeeId, ts)` เพื่อ query timeline ต่อพนักงานเร็วขึ้น

---

## 📅 **AttendanceDay**

> สรุปข้อมูลการทำงานของพนักงานต่อวัน (ใช้ในการคำนวณ Payroll)

| Field | Type | Description |
|--------|------|-------------|
| `id` | String | Primary key |
| `orgId`, `employeeId` | String | องค์กร + พนักงาน |
| `date` | Date | วันที่ (00:00 local time) |
| `workMinutes` | Int | นาทีที่ทำงานจริงหลังหักพักกลางวัน |
| `lateMinutes` | Int | นาทีที่มาสาย |
| `otWeekday` / `otWeekend` / `otHoliday` | Int | นาที OT แยกตามประเภทวัน |
| `status` | String | `"OK"` / `"ABSENT"` / `"MANUAL"` |
| `notes` | String? | หมายเหตุเพิ่มเติม |
| `computedAt` | DateTime | เวลา engine คำนวณล่าสุด |
| `overrideBy` | String? | userId ที่แก้ไขด้วยมือ |
| `overrideAt` | DateTime? | เวลาที่แก้ไขด้วยมือ |
| `createdAt` | DateTime | เวลา record ถูกสร้าง |

---

## 🎌 **Holiday**

> ตารางวันหยุดของแต่ละองค์กร (override OT / attendance logic)

| Field | Type | Description |
|--------|------|-------------|
| `id` | String | Primary key |
| `orgId` | String | องค์กรที่กำหนดวันหยุด |
| `date` | DateTime | วันที่หยุด |
| `kind` | String | ประเภท เช่น `"HOLIDAY"` หรือ `"SPECIAL"` |
| `name` | String | ชื่อวันหยุด |
| `createdAt`, `updatedAt` | DateTime | audit timestamps |

---

## ⚙️ **OtProfile**

> กติกาคำนวณ OT ของแต่ละองค์กร (rule engine configuration)

| Field | Type | Description |
|--------|------|-------------|
| `id` | String | Primary key |
| `orgId` | String | องค์กรเจ้าของ config |
| `name` | String | ชื่อโปรไฟล์ เช่น `"Default"` |
| `json` | Json | กติกา OT ปัจจุบัน เช่น rate, lunch break, bonus |
| `otProfileSnapshot` | Json? | (optional) สำเนากติกาที่ใช้จริงต่อ period ถ้ามี versioning |
| `createdAt`, `updatedAt` | DateTime | audit timestamps |

---

## 💵 **PayrollPeriod**

> ช่วงการจ่ายเงินเดือน (งวด 1–15 หรือ 16–สิ้นเดือน)

| Field | Type | Description |
|--------|------|-------------|
| `id` | String | Primary key |
| `orgId` | String | องค์กร |
| `title` | String | ชื่อช่วง เช่น `"งวด 1-15 พ.ย. 2025"` |
| `mode` | Enum | PAY_PERIOD / ROLLING_7_DAYS / ISO_WEEK |
| `startDate`, `endDate` | DateTime | วันที่เริ่ม–สิ้นสุดงวด |
| `status` | Enum | `"DRAFT"` หรือ `"FINAL"` |
| `createdAt`, `updatedAt` | DateTime | audit timestamps |
| `rows` | Relation → `PayrollRow[]` | รายการเงินเดือนในงวดนี้ |

---

## 🧾 **PayrollRow**

> แถวสรุปการจ่ายต่อพนักงานในแต่ละงวด (ใช้ทำ slip)

| Field | Type | Description |
|--------|------|-------------|
| `id` | String | Primary key |
| `orgId` | String | องค์กร |
| `periodId` | String | อ้างถึง `PayrollPeriod` |
| `employeeId` | String | พนักงานในงวดนั้น |
| `basePay` | Decimal | เงินเดือนพื้นฐาน (ตามจำนวนวันทำงาน) |
| `otPay` | Decimal | ค่าล่วงเวลา |
| `lateDeduction` | Decimal | หักมาสาย |
| `ssf` | Decimal | ประกันสังคม (5% capped 750฿) |
| `adjustments` | Decimal | ปรับเพิ่ม/ลดด้วยมือ |
| `adjustNote` | String? | เหตุผลของการปรับ |
| `adjustBy` | String? | ผู้แก้ไข |
| `netPay` | Decimal | เงินสุทธิหลังหักทุกอย่าง |
| `workMinutes`, `otMinutes`, `lateMinutes` | Int | ตัวเลขดิบ (ช่วยตรวจสอบ) |
| `data` | Json? | snapshot ของ rule/config ที่ใช้คำนวณตอนนั้น |
| `createdAt`, `updatedAt` | DateTime | audit timestamps |

---

## ⚙️ Enum Definitions

| Enum | Values | Description |
|-------|---------|-------------|
| `SalaryType` | `MONTHLY`, `DAILY` | ประเภทพนักงาน |
| `CheckKind` | `IN`, `OUT` | ประเภทการสแกน |
| `PayrollMode` | `PAY_PERIOD`, `ROLLING_7_DAYS`, `ISO_WEEK` | วิธีนับงวดจ่ายเงิน |
| `PayrollStatus` | `DRAFT`, `FINAL` | สถานะของงวดจ่าย |

---

## 🧩 Data Flow Overview

**Face → CheckEvent → AttendanceDay → PayrollRow → Slip**

1. `/kiosk` บันทึก CheckEvent (IN/OUT)
2. Attendance engine รวม event รายวัน → สร้าง/อัปเดต AttendanceDay
3. Payroll generator รวม AttendanceDay ช่วงงวด → PayrollRow
4. HR ตรวจแก้ / ปรับ adjustments
5. สถานะเปลี่ยนเป็น FINAL → พิมพ์ Slip
