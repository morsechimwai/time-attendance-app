// lib/utils/formatters/datetime-formatter.ts
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import localizedFormat from "dayjs/plugin/localizedFormat"
import relativeTime from "dayjs/plugin/relativeTime"
import buddhistEra from "dayjs/plugin/buddhistEra"
import "dayjs/locale/th"
import "dayjs/locale/en"

// Init plugins
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)
dayjs.extend(buddhistEra)

dayjs.tz.setDefault("Asia/Bangkok")

export type DateFormatStyle =
  | "short" // 10 พ.ย. 2568
  | "medium" // 10 พ.ย. 2568 14:30
  | "long" // 10 พฤศจิกายน 2568 เวลา 14:30 น.
  | "iso" // 2025-11-10T14:30:00+07:00
  | "time" // 14:30 น.
  | "date" // 10 พ.ย. 2568

type FormatOptions = {
  locale?: "th" | "en"
  tz?: string
  style?: DateFormatStyle
  showYearBE?: boolean // force พ.ศ. even in en
}

/**
 * formatDateTime()
 * แปลงวันที่เป็นข้อความตามรูปแบบ, locale, และ timezone
 */
export function formatDateTime(
  input: string | Date | number,
  {
    locale = "th",
    tz = "Asia/Bangkok",
    style = "medium",
    showYearBE = locale === "th",
  }: FormatOptions = {}
): string {
  const d = dayjs(input).tz(tz).locale(locale)

  switch (style) {
    case "short":
      return showYearBE ? d.format("D MMM BBBB") : d.format("D MMM YYYY")
    case "medium":
      return showYearBE ? d.format("D MMM BBBB HH:mm") : d.format("D MMM YYYY HH:mm")
    case "long":
      return showYearBE ? d.format("D MMMM BBBB เวลา HH:mm น.") : d.format("D MMMM YYYY HH:mm")
    case "iso":
      return d.toISOString()
    case "time":
      return d.format("HH:mm น.")
    case "date":
      return showYearBE ? d.format("D MMM BBBB") : d.format("D MMM YYYY")
    default:
      return d.format()
  }
}

/**
 * parseDate()
 * แปลง string เป็น Date (รองรับ timezone)
 */
export function parseDate(input: string, tz = "Asia/Bangkok"): Date {
  return dayjs.tz(input, tz).toDate()
}

/**
 * formatRelativeTime()
 * เช่น “5 นาทีที่แล้ว”, “3 วันก่อน”, “in 2 hours”
 */
export function formatRelativeTime(
  input: string | Date | number,
  {
    locale = "th",
    tz = "Asia/Bangkok",
    baseDate = new Date(),
  }: { locale?: "th" | "en"; tz?: string; baseDate?: string | Date } = {}
): string {
  const d = dayjs(input).tz(tz).locale(locale)
  const now = dayjs(baseDate).tz(tz)
  return d.from(now)
}

/**
 * formatDateRange()
 * เช่น "10–12 พ.ย. 2568" หรือ "10 พ.ย.–5 ธ.ค. 2568"
 */
export function formatDateRange(
  start: string | Date | number,
  end: string | Date | number,
  {
    locale = "th",
    tz = "Asia/Bangkok",
    showYearBE = locale === "th",
  }: { locale?: "th" | "en"; tz?: string; showYearBE?: boolean } = {}
): string {
  const s = dayjs(start).tz(tz).locale(locale)
  const e = dayjs(end).tz(tz).locale(locale)

  // ถ้าเดือนเดียวกัน
  if (s.month() === e.month() && s.year() === e.year()) {
    return showYearBE
      ? `${s.format("D")}-${e.format("D MMM BBBB")}`
      : `${s.format("D")}-${e.format("D MMM YYYY")}`
  }

  // ถ้าปีเดียวกัน
  if (s.year() === e.year()) {
    return showYearBE
      ? `${s.format("D MMM")}-${e.format("D MMM BBBB")}`
      : `${s.format("D MMM")}-${e.format("D MMM YYYY")}`
  }

  // ต่างปี
  return showYearBE
    ? `${s.format("D MMM BBBB")} – ${e.format("D MMM BBBB")}`
    : `${s.format("D MMM YYYY")} – ${e.format("D MMM YYYY")}`
}
