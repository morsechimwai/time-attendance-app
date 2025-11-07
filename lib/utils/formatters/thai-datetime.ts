// lib/utils/thai-date-formatter.ts
import dayjs from "dayjs"
import buddhistEra from "dayjs/plugin/buddhistEra"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import localizedFormat from "dayjs/plugin/localizedFormat"
import relativeTime from "dayjs/plugin/relativeTime"
import duration from "dayjs/plugin/duration"
import "dayjs/locale/th"

// Initialize dayjs with Thai locale and Buddhist Era support
dayjs.extend(buddhistEra)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.locale("th")
dayjs.tz.setDefault("Asia/Bangkok")

// Define types for date input and presets
export type DateInput = string | number | Date | dayjs.Dayjs

// Preset formats for Thai date formatting
export type ThaiPreset =
  | "dateShort" // 7 พ.ย. 2568
  | "dateLong" // 7 พฤศจิกายน 2568
  | "dateTime" // 7 พ.ย. 2568 14:35
  | "time" // 14:35
  | "monthYear" // พ.ย. 2568
  | "weekdayDate" // ศุกร์ 7 พ.ย. 2568
  | "iso" // 2025-11-07T14:35:00+07:00
  | "relative" // 5 นาทีที่แล้ว

// Convert input to dayjs object in Bangkok timezone
const toDayjs = (input: DateInput): dayjs.Dayjs => dayjs(input).tz("Asia/Bangkok")

// Convert AD year to BE year and vice versa
export const toBE = (adYear: number): number => adYear + 543
export const toAD = (beYear: number): number => beYear - 543

// Get the start of the Thai day (00:00) for a given date
export function startOfThaiDay(input: DateInput): dayjs.Dayjs {
  return toDayjs(input).startOf("day")
}

// Get the ISO string for the start of the Thai day
export function startOfThaiDayISO(input: DateInput): string {
  return startOfThaiDay(input).format("YYYY-MM-DDT00:00:00+07:00")
}

// Format a date according to the specified Thai preset
function formatThai(input: DateInput, preset: ThaiPreset = "dateShort"): string {
  const date = toDayjs(input)

  switch (preset) {
    case "dateShort":
      return date.format("D MMM BBBB")
    case "dateLong":
      return date.format("D MMMM BBBB")
    case "dateTime":
      return date.format("D MMM BBBB HH:mm")
    case "time":
      return date.format("HH:mm")
    case "monthYear":
      return date.format("MMM BBBB")
    case "weekdayDate":
      return date.format("ddd D MMM BBBB")
    case "iso":
      return date.format("YYYY-MM-DDTHH:mm:ssZ")
    case "relative":
      return date.fromNow()
    default:
      return date.format("D MMM BBBB")
  }
}

// Format a date range, reducing redundancy when possible
function formatRange(start: DateInput, end: DateInput, preset: ThaiPreset = "dateShort"): string {
  const s = toDayjs(start)
  const e = toDayjs(end)
  if (s.isSame(e, "day")) return formatThai(s, preset)

  // Same mounth and year
  if (s.month() === e.month() && s.year() === e.year()) {
    // Same month and year: 7–9 พ.ย. 2568
    return `${s.format("D")}–${e.format("D MMM BBBB")}`
  }
  return `${s.format("D MMM BBBB")} – ${e.format("D MMM BBBB")}`
}

// Format a duration between two dates in a human-readable Thai format
export function humanDuration(from: DateInput, to: DateInput): string {
  const diffMs = Math.abs(toDayjs(to).diff(toDayjs(from)))
  const d = dayjs.duration(diffMs)

  const parts: string[] = []
  if (d.days()) parts.push(`${d.days()} วัน`)
  if (d.hours()) parts.push(`${d.hours()} ชม.`)
  if (d.minutes()) parts.push(`${d.minutes()} นาที`)
  if (!d.days() && !d.hours() && !d.minutes()) parts.push(`${d.seconds()} วิ`)

  return parts.join(" ")
}

// Exported ThaiDate utility with formatting functions
export const ThaiDateTime = {
  raw: dayjs,
  toDayjs,
  format: formatThai,
  range: formatRange,
  toBE,
  toAD,
  startOfThaiDay,
  startOfThaiDayISO,
  humanDuration,
  now: () => toDayjs(new Date()),
}

export default ThaiDateTime
