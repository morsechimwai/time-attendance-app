# Face Attendance & Payroll System Requirements

## Overview

Multi-tenant SaaS for Thai SMEs/factories to manage face-based time tracking and payroll. Tenancy is enforced through StackAuth teams (`teamId` on every core record).

---

## Roles & Access

- **Admin only (MVP)** — HR/Admin users sign in via StackAuth. Employees do not log in; they interact through kiosk capture.
- Future roles can attach to StackAuth permissions (guard layer prepared).

---

## Core Modules

### 1) Authentication & Team Context

- Login/signup handled by StackAuth (Next StackProvider on client, StackServerApp on server).
- Users belong to exactly one StackAuth team in MVP.
- Middleware sets headers (`x-facein-user-*`, `x-facein-team-id`) for server components/services.
- Server helpers (`requireAuthContext`) enforce authenticated access.

### 2) Employee Management

- Create / edit / soft-disable employees per team.
- Fields:
  - Name, Position, Department
  - Status enum: `ACTIVE`, `RESIGNED`, `PROBATION`, `SUSPENDED`
  - Payroll metadata: salary type (`MONTHLY` / `DAILY`), base salary, OT eligibility, SSF eligibility
  - OT profile link (optional, per employee override)
  - Audit timestamps (created/updated)
- Face embeddings stored separately (see module 3).

### 3) Face Attendance (Kiosk)

- Route `/kiosk` runs in fullscreen kiosk mode.
- Flow: camera capture → embedding match → optional liveness flag.
- Logs `CheckEvent` with geolocation metadata when available.
- UI buttons: **Check-in** / **Check-out** (maps to `CheckKind` enum).

### 4) Attendance Engine

- Aggregates `CheckEvent` data into `AttendanceDay`.
- Stored metrics:
  - workMinutes, lateMinutes
  - OT minutes split by weekday/weekend/holiday
  - Status enum: `OK`, `ABSENT`, `LATE`, `LEAVE`
- Manual override supported (`overrideBy`, `overrideAt`, `notes`).
- Snapshot timestamp (`computedAt`) for recalculation tracking.
- Lunch deduction, OT thresholds, consecutive-day logic handled by OT rule engine (see module 6).

### 5) Holiday

- Team-defined holidays with enum kind: `PUBLIC`, `COMPANY`, `SPECIAL`.
- Holidays override OT classification priority (holiday > weekend > weekday).

### 6) OT Rule Profiles (JSON)

Rule profiles stored as JSON payload on `OtProfile`. Employees or payroll periods can reference snapshots.

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

- `PAY_PERIOD` — standard semimonthly/biweekly
- `ROLLING_7_DAYS` — sliding window for 24/7 operations
- `ISO_WEEK` — ISO week-based

### 7) Payroll

- `PayrollPeriod` per team:
  - Mode (`PayrollMode`), start/end dates, status (`DRAFT` / `FINAL`)
  - Optional `otProfileSnapshot` + `timezone`
- Payroll generation creates `PayrollRow` per employee with:
  - basePay, otPay, lateDeduction, ssf, adjustments, netPay
  - raw metrics (workMinutes, otMinutes, lateMinutes) for auditing
  - `adjustNote`, `adjustBy` for manual tweaks
- Unique constraints prevent duplicate rows per employee/period.

### 8) Salary Slip

- Printable slip generator (A6) consuming `PayrollRow` data snapshots.
- Includes employee info, period, earnings, deductions, net pay.

### 9) Audit Logging

- `AuditLog` table records sensitive operations across entities.
- Fields: entity name, entityId, action (`CREATE`, `UPDATE`, `DELETE`, `LOGIN`, `LOGOUT`, `SYNC`, `GENERATE`), data snapshot, optional metadata/userId.
- Indexed by team, entity, createdAt for fast compliance queries.

---

## Pages / Routes

### Navigation Structure

- **Dashboard**
- **Employees**
- **Attendance**
- **Payroll**
- **Settings**

Additional kiosk route: `/kiosk`

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
* `/kiosk` — face scan terminal

---

## Pages / Routes

StackAuth handles `/signin`, `/signout`, `/signup`; protected app routes listed above. Kiosk (`/kiosk`) stays unauthenticated but isolated.

---

## Key Logic Summary

### Attendance

```
work = totalMinutes - lunch
if work > 8h → OT = work - 8h
streak >= 7 days → OT full day bonus
holiday > weekend > weekday
```

### Payroll

```
Net = Base + OT + Adjustments - Late - SSF
```

---

## Non-Functional

- Sub-1s face recognition target
- Tenant isolation via StackAuth team IDs + secured middleware headers
- Manual override where HR needs control
- Full audit trail (createdAt/updatedAt + `AuditLog`)

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
