-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('ACTIVE', 'RESIGNED', 'PROBATION', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "SalaryType" AS ENUM ('MONTHLY', 'DAILY');

-- CreateEnum
CREATE TYPE "CheckKind" AS ENUM ('IN', 'OUT');

-- CreateEnum
CREATE TYPE "PayrollStatus" AS ENUM ('DRAFT', 'FINAL');

-- CreateEnum
CREATE TYPE "PayrollMode" AS ENUM ('PAY_PERIOD', 'ROLLING_7_DAYS', 'ISO_WEEK');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('OK', 'ABSENT', 'LATE', 'LEAVE');

-- CreateEnum
CREATE TYPE "HolidayKind" AS ENUM ('PUBLIC', 'COMPANY', 'SPECIAL');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'SYNC', 'GENERATE');

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT,
    "department" TEXT,
    "salaryType" "SalaryType" NOT NULL,
    "baseSalary" DECIMAL(12,2) NOT NULL,
    "otEligible" BOOLEAN NOT NULL DEFAULT true,
    "ssfEligible" BOOLEAN NOT NULL DEFAULT true,
    "status" "EmployeeStatus" NOT NULL DEFAULT 'ACTIVE',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "otProfileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaceEmbedding" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "vector" BYTEA NOT NULL,
    "version" TEXT NOT NULL,
    "embeddingDim" INTEGER NOT NULL DEFAULT 512,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FaceEmbedding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckEvent" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "kind" "CheckKind" NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL,
    "source" TEXT,
    "timezone" TEXT,
    "liveness" BOOLEAN NOT NULL DEFAULT false,
    "latitude" DECIMAL(9,6),
    "longitude" DECIMAL(9,6),
    "accuracy" DECIMAL(5,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CheckEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendanceDay" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "workMinutes" INTEGER NOT NULL DEFAULT 0,
    "lateMinutes" INTEGER NOT NULL DEFAULT 0,
    "otWeekday" INTEGER NOT NULL DEFAULT 0,
    "otWeekend" INTEGER NOT NULL DEFAULT 0,
    "otHoliday" INTEGER NOT NULL DEFAULT 0,
    "status" "AttendanceStatus" NOT NULL DEFAULT 'OK',
    "notes" TEXT,
    "computedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "overrideBy" TEXT,
    "overrideAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AttendanceDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Holiday" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "kind" "HolidayKind" NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Holiday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtProfile" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Default',
    "json" JSONB NOT NULL,
    "snapshot" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OtProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayrollPeriod" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "mode" "PayrollMode" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "PayrollStatus" NOT NULL DEFAULT 'DRAFT',
    "otProfileSnapshot" JSONB,
    "timezone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PayrollPeriod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayrollRow" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "basePay" DECIMAL(12,2) NOT NULL,
    "otPay" DECIMAL(12,2) NOT NULL,
    "lateDeduction" DECIMAL(12,2) NOT NULL,
    "ssf" DECIMAL(12,2) NOT NULL,
    "adjustments" DECIMAL(12,2) NOT NULL,
    "adjustNote" TEXT,
    "adjustBy" TEXT,
    "netPay" DECIMAL(12,2) NOT NULL,
    "workMinutes" INTEGER NOT NULL DEFAULT 0,
    "otMinutes" INTEGER NOT NULL DEFAULT 0,
    "lateMinutes" INTEGER NOT NULL DEFAULT 0,
    "data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PayrollRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "action" "AuditAction" NOT NULL,
    "data" JSONB NOT NULL,
    "metadata" JSONB,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Employee_teamId_active_idx" ON "Employee"("teamId", "active");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_teamId_code_key" ON "Employee"("teamId", "code");

-- CreateIndex
CREATE INDEX "FaceEmbedding_teamId_employeeId_idx" ON "FaceEmbedding"("teamId", "employeeId");

-- CreateIndex
CREATE INDEX "CheckEvent_teamId_ts_idx" ON "CheckEvent"("teamId", "ts");

-- CreateIndex
CREATE INDEX "CheckEvent_teamId_employeeId_ts_idx" ON "CheckEvent"("teamId", "employeeId", "ts");

-- CreateIndex
CREATE INDEX "AttendanceDay_teamId_employeeId_date_idx" ON "AttendanceDay"("teamId", "employeeId", "date");

-- CreateIndex
CREATE INDEX "AttendanceDay_teamId_date_idx" ON "AttendanceDay"("teamId", "date");

-- CreateIndex
CREATE INDEX "AttendanceDay_teamId_date_status_idx" ON "AttendanceDay"("teamId", "date", "status");

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceDay_teamId_employeeId_date_key" ON "AttendanceDay"("teamId", "employeeId", "date");

-- CreateIndex
CREATE INDEX "Holiday_teamId_date_idx" ON "Holiday"("teamId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Holiday_teamId_date_key" ON "Holiday"("teamId", "date");

-- CreateIndex
CREATE INDEX "OtProfile_teamId_idx" ON "OtProfile"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "OtProfile_teamId_name_key" ON "OtProfile"("teamId", "name");

-- CreateIndex
CREATE INDEX "PayrollPeriod_teamId_startDate_endDate_idx" ON "PayrollPeriod"("teamId", "startDate", "endDate");

-- CreateIndex
CREATE INDEX "PayrollRow_teamId_employeeId_periodId_idx" ON "PayrollRow"("teamId", "employeeId", "periodId");

-- CreateIndex
CREATE INDEX "PayrollRow_teamId_employeeId_idx" ON "PayrollRow"("teamId", "employeeId");

-- CreateIndex
CREATE INDEX "PayrollRow_teamId_periodId_idx" ON "PayrollRow"("teamId", "periodId");

-- CreateIndex
CREATE UNIQUE INDEX "PayrollRow_teamId_periodId_employeeId_key" ON "PayrollRow"("teamId", "periodId", "employeeId");

-- CreateIndex
CREATE INDEX "AuditLog_teamId_entity_idx" ON "AuditLog"("teamId", "entity");

-- CreateIndex
CREATE INDEX "AuditLog_teamId_createdAt_idx" ON "AuditLog"("teamId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_teamId_userId_idx" ON "AuditLog"("teamId", "userId");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_otProfileId_fkey" FOREIGN KEY ("otProfileId") REFERENCES "OtProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaceEmbedding" ADD CONSTRAINT "FaceEmbedding_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckEvent" ADD CONSTRAINT "CheckEvent_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceDay" ADD CONSTRAINT "AttendanceDay_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollRow" ADD CONSTRAINT "PayrollRow_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "PayrollPeriod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollRow" ADD CONSTRAINT "PayrollRow_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
