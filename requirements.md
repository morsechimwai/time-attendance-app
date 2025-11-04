# Face Attendance & Payroll System Requirements

## Overview

A multi-tenant SaaS system for Thai SMEs and factories to manage face-based attendance and advanced payroll with OT logic, social security, and rule engine support.

---

## Roles & Access

* **Admin only** (MVP) — Employees don't login, they only use Kiosk
* Future roles prepared via guard functions

---

## Core Modules

### 1) Authentication & Organization

* Login via StackAuth
* Organization membership (single-org per user MVP)
* Tenant isolation on all data

### 2) Employee Management

* Add / Edit / Disable employee
* Fields:

  * Name, Position, Department
  * Salary type: Monthly / Daily
  * Base salary
  * OT eligible
  * Social security flag
  * Face image + embeddings
* Quick inline edit for payroll fields

### 3) Face Attendance (Kiosk)

* Route: `/kiosk`
* Fullscreen mode
* Buttons: **Check-in** / **Check-out**
* Face detect → match → basic liveness
* Success feedback with employee name & time
* One check-in + one check-out per day

### 4) Attendance Engine

* Auto compute per day:

  * work minutes
  * late minutes
  * OT minutes (weekday / weekend / holiday)
  * lunch deduction logic (60 min default)
* **8-hour daily threshold:** OT starts after 8 hours
* Consecutive days rule:

  * If work ≥ 7 consecutive days → next day OT full day
* Manual override for HR

### 5) Holiday

* Org-defined holiday table
* Holidays override OT type (holiday > weekend > weekday)

### 6) OT Rule Profiles (JSON)

Flexible config:

```
{
  "weekday": 1.5,
  "weekend": 2.0,
  "holiday": 3.0,
  "workHoursPerDay": 8,
  "autoLunchBreak": true,
  "lunchBreakMinutes": 60,
  "allowLunchAsOT": false,
  "weeklyContinuousWorkBonus": {
    "enabled": true,
    "days": 7,
    "rate": 2.0
  }
}
```

### OT Period Modes

* **PAY_PERIOD** — default payroll period
* **ROLLING_7_DAYS** — factory / 24/7 rule
* **ISO_WEEK** — Mon–Sun international mode

### 7) Payroll

* Create payroll period
* Auto-generate payroll rows
* Compute:

  * base pay
  * OT pay
  * late deduction
  * social security (5% capped 750฿)
  * manual adjustment
  * net pay
* Status: DRAFT / FINAL
* Inline spreadsheet-like editing

### 8) Salary Slip

* A6 slip template
* Preview + Print
* Fields: Employee, period, base pay, OT, deductions, net

---

## Pages / Routes

### Navigation Structure

**Main Navigation (Admin Dashboard)**

* Dashboard
* Employees
* Attendance
* Payroll
* Settings

**Navigation Paths**

* `/dashboard` — system overview
* `/employees` — employee list
* `/employees/new` — add employee
* `/employees/[id]` — edit/record view
* `/attendance` — attendance daily table + manual fix
* `/payroll` — payroll periods
* `/payroll/new` — create payroll period
* `/payroll/[periodId]` — payroll summary table
* `/payroll/[periodId]/employee/[id]` — employee payroll detail
* `/payroll/[periodId]/slip/preview` — slip preview
* `/payroll/[periodId]/print` — slip print batch
* `/settings` — org + payroll config

**Kiosk**

* `/kiosk` — face scan terminal

---

## Pages / Routes

**Admin**

* `/auth/login`
* `/dashboard`
* `/employees`
* `/employees/new`
* `/employees/[id]`
* `/attendance` — history + manual fix
* `/payroll`
* `/payroll/new`
* `/payroll/[periodId]`
* `/payroll/[periodId]/employee/[id]`
* `/payroll/[periodId]/slip/preview`
* `/payroll/[periodId]/print`
* `/settings`

**Kiosk**

* `/kiosk`

---

## Key Logic Summary

### Attendance

```
work = totalMinutes - lunch
if work > 8h → OT = work - 8h
streak >= 7 days → OT full day
holiday > weekend > weekday
```

### Payroll

```
Net = Base + OT + Adjustments - Late - SSF
```

---

## Non-Functional

* Sub-1s face recognition
* Tenant data isolation
* Manual override everywhere needed
* Audit timestamps

---

## Out of Scope for MVP

* Employee login
* Mobile app / GPS
* Complex leave system
* Tax withholding
* Export Excel (later)
* Multi-kiosk UI

---

## Next Steps

* OT Engine implementation
* Attendance → Payroll pipeline
* Test cases for Thai labor rules
* A6 PDF slip generation
