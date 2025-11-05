-- CreateEnum
CREATE TYPE "SalaryType" AS ENUM ('MONTHLY', 'DAILY');

-- CreateEnum
CREATE TYPE "CheckKind" AS ENUM ('IN', 'OUT');

-- CreateEnum
CREATE TYPE "PayrollStatus" AS ENUM ('DRAFT', 'FINAL');

-- CreateEnum
CREATE TYPE "PayrollMode" AS ENUM ('PAY_PERIOD', 'ROLLING_7_DAYS', 'ISO_WEEK');

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "locale" TEXT,
    "timezone" TEXT,
    "otProfileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT,
    "department" TEXT,
    "salaryType" "SalaryType" NOT NULL,
    "baseSalary" DECIMAL(12,2) NOT NULL,
    "otEligible" BOOLEAN NOT NULL DEFAULT true,
    "ssfEligible" BOOLEAN NOT NULL DEFAULT true,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaceEmbedding" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
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
    "orgId" TEXT NOT NULL,
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
    "orgId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "workMinutes" INTEGER NOT NULL DEFAULT 0,
    "lateMinutes" INTEGER NOT NULL DEFAULT 0,
    "otWeekday" INTEGER NOT NULL DEFAULT 0,
    "otWeekend" INTEGER NOT NULL DEFAULT 0,
    "otHoliday" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'OK',
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
    "orgId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "kind" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Holiday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Default',
    "json" JSONB NOT NULL,
    "otProfileSnapshot" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OtProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayrollPeriod" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "mode" "PayrollMode" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "PayrollStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PayrollPeriod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayrollRow" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "Organization_otProfileId_key" ON "Organization"("otProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Employee_orgId_active_idx" ON "Employee"("orgId", "active");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_orgId_code_key" ON "Employee"("orgId", "code");

-- CreateIndex
CREATE INDEX "FaceEmbedding_orgId_employeeId_idx" ON "FaceEmbedding"("orgId", "employeeId");

-- CreateIndex
CREATE INDEX "CheckEvent_orgId_ts_idx" ON "CheckEvent"("orgId", "ts");

-- CreateIndex
CREATE INDEX "CheckEvent_orgId_employeeId_ts_idx" ON "CheckEvent"("orgId", "employeeId", "ts");

-- CreateIndex
CREATE INDEX "AttendanceDay_orgId_date_idx" ON "AttendanceDay"("orgId", "date");

-- CreateIndex
CREATE INDEX "AttendanceDay_orgId_date_status_idx" ON "AttendanceDay"("orgId", "date", "status");

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceDay_orgId_employeeId_date_key" ON "AttendanceDay"("orgId", "employeeId", "date");

-- CreateIndex
CREATE INDEX "Holiday_orgId_date_idx" ON "Holiday"("orgId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Holiday_orgId_date_key" ON "Holiday"("orgId", "date");

-- CreateIndex
CREATE INDEX "OtProfile_id_idx" ON "OtProfile"("id");

-- CreateIndex
CREATE INDEX "PayrollPeriod_orgId_startDate_endDate_idx" ON "PayrollPeriod"("orgId", "startDate", "endDate");

-- CreateIndex
CREATE INDEX "PayrollRow_orgId_employeeId_idx" ON "PayrollRow"("orgId", "employeeId");

-- CreateIndex
CREATE INDEX "PayrollRow_orgId_periodId_idx" ON "PayrollRow"("orgId", "periodId");

-- CreateIndex
CREATE UNIQUE INDEX "PayrollRow_orgId_periodId_employeeId_key" ON "PayrollRow"("orgId", "periodId", "employeeId");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_otProfileId_fkey" FOREIGN KEY ("otProfileId") REFERENCES "OtProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaceEmbedding" ADD CONSTRAINT "FaceEmbedding_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckEvent" ADD CONSTRAINT "CheckEvent_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceDay" ADD CONSTRAINT "AttendanceDay_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holiday" ADD CONSTRAINT "Holiday_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollPeriod" ADD CONSTRAINT "PayrollPeriod_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollRow" ADD CONSTRAINT "PayrollRow_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "PayrollPeriod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollRow" ADD CONSTRAINT "PayrollRow_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
