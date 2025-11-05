// lib/errors/app-error.ts
import { ErrorCode } from "./handle-error"

export type AppErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "BAD_REQUEST"
  | "VALIDATION_ERROR"
  | "INTERNAL_ERROR"
  | ErrorCode // allow re-use from handle-error

/**
 * Represents controlled (expected) application-level errors.
 * These should be thrown intentionally inside business logic or actions.
 */
export class AppError extends Error {
  readonly code: AppErrorCode
  readonly status: number
  readonly meta?: Record<string, unknown>
  readonly isAppError = true
  readonly timestamp = new Date().toISOString()

  constructor(code: AppErrorCode, message?: string, meta?: Record<string, unknown>) {
    super(message || code)
    this.name = "AppError"
    this.code = code
    this.status = STATUS_MAP[code] ?? 500
    this.meta = meta

    // Preserve stack trace (Node.js)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

const STATUS_MAP: Record<AppErrorCode, number> = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  VALIDATION_ERROR: 400,
  INTERNAL_ERROR: 500,
  CONFLICT: 409,
  FK_CONSTRAINT: 409,
  DB_INIT_ERROR: 503,
  DB_PANIC: 500,
}
