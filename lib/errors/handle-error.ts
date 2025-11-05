// lib/errors/handle-error.ts
import { Prisma } from "@prisma/client"
import { AppError } from "./app-error"

export enum ErrorCode {
  CONFLICT = "CONFLICT",
  NOT_FOUND = "NOT_FOUND",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  FK_CONSTRAINT = "FK_CONSTRAINT",
  DB_INIT_ERROR = "DB_INIT_ERROR",
  DB_PANIC = "DB_PANIC",
}

export type HandledError = {
  type: "app" | "prisma" | "validation" | "unknown"
  status: number
  code: ErrorCode | string
  message: string
  meta?: Record<string, unknown>
}

/**
 * Normalize all thrown errors (AppError, Prisma, unknown) into a consistent structure.
 * Used internally by withErrorHandling() and withActionHandler().
 *
 * Never throws — always returns a safe HandledError object.
 */
export function handleError(error: unknown): HandledError {
  if (error instanceof AppError) {
    return {
      type: "app",
      status: error.status,
      code: error.code,
      message: error.message,
      meta: error.meta,
    }
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return {
          type: "prisma",
          status: 409,
          code: ErrorCode.CONFLICT,
          message: `Duplicate field: ${String(error.meta?.target)}`,
        }
      case "P2003":
        return {
          type: "prisma",
          status: 409,
          code: ErrorCode.FK_CONSTRAINT,
          message: "Operation violates foreign key constraint",
        }
      case "P2025":
        return {
          type: "prisma",
          status: 404,
          code: ErrorCode.NOT_FOUND,
          message: "Record not found",
        }
      default:
        return {
          type: "prisma",
          status: 400,
          code: error.code,
          message: error.message,
        }
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      type: "validation",
      status: 400,
      code: ErrorCode.VALIDATION_ERROR,
      message: error.message,
    }
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return {
      type: "prisma",
      status: 503,
      code: ErrorCode.DB_INIT_ERROR,
      message: "Database initialization failed",
    }
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return {
      type: "prisma",
      status: 500,
      code: ErrorCode.DB_PANIC,
      message: "Prisma engine panicked",
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.error("[Unhandled Error]", error)
  }

  return {
    type: "unknown",
    status: 500,
    code: ErrorCode.INTERNAL_ERROR,
    message: "An unexpected error occurred",
  }
}
