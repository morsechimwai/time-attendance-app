// lib/utils/formatters/currency-formatter.ts

export type CurrencyFormatOptions = {
  locale?: string // เช่น "th-TH" หรือ "en-US"
  currency?: string // เช่น "THB", "USD"
  compact?: boolean // แสดงแบบสั้น: 1.2K, 1.2 พัน
  noSymbol?: boolean // ไม่แสดงสัญลักษณ์ (เฉพาะเลข)
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

/**
 * formatCurrency()
 * แปลงจำนวนเงินให้สวยงามตาม locale และสกุลเงิน
 */
export function formatCurrency(
  amount: number,
  {
    locale = "th-TH",
    currency = "THB",
    compact = false,
    noSymbol = false,
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
  }: CurrencyFormatOptions = {}
): string {
  // Intl.NumberFormat ทำงานตาม locale ที่กำหนด
  const formatter = new Intl.NumberFormat(locale, {
    style: noSymbol ? "decimal" : "currency",
    currency: currency,
    notation: compact ? "compact" : "standard",
    minimumFractionDigits,
    maximumFractionDigits,
  })

  return formatter.format(amount)
}

/**
 * parseCurrency()
 * แปลง string -> number (รองรับเฉพาะตัวเลขและจุดทศนิยม)
 */
export function parseCurrency(input: string): number {
  const normalized = input.replace(/[^\d.-]/g, "")
  const value = parseFloat(normalized)
  return isNaN(value) ? 0 : value
}
