// For Action Handlers or API Routes

// lib/errors/with-action-handler.ts
import { handleError, type HandledError } from "./handle-error"

/**
 * Wrap async server actions or API route handlers to standardize responses.
 * Converts any thrown error (AppError, Prisma, etc.) into a safe client response.
 */
export function withActionHandler<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>
): (
  ...args: TArgs
) => Promise<
  { ok: true; data: TResult } | { ok: false; code: string; message: string; status: number }
> {
  return async (...args: TArgs) => {
    try {
      const data = await fn(...args)
      return { ok: true, data }
    } catch (error: unknown) {
      const handled: HandledError = handleError(error)

      if (process.env.NODE_ENV === "development") {
        console.error(`[withActionHandler] ${handled.code}:`, error)
      }

      return {
        ok: false,
        code: handled.code,
        message: handled.message,
        status: handled.status,
      }
    }
  }
}
