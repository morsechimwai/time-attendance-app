// For Service Layer

// lib/errors/with-error-handling.ts
import { AppError } from "./app-error"
import { handleError, type HandledError } from "./handle-error"

/**
 * Wrap async function to handle and normalize all errors.
 * Designed for service layer or business logic functions.
 */
export function withErrorHandling<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>
): (...args: TArgs) => Promise<TResult> {
  return async (...args: TArgs): Promise<TResult> => {
    try {
      return await fn(...args)
    } catch (error: unknown) {
      const handled: HandledError = handleError(error)

      // Log verbose details only in dev mode
      if (process.env.NODE_ENV === "development") {
        console.error(`[withErrorHandling] ${handled.code}:`, error)
      }

      // Rethrow as standardized AppError
      throw new AppError(
        handled.code as AppError["code"], // safe narrow cast
        handled.message,
        handled.meta
      )
    }
  }
}
