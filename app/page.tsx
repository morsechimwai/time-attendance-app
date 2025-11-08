import type { Metadata } from "next"
import Link from "next/link"
import SiteNavbar from "@/components/site-navbar"
import SiteFooter from "@/components/site-footer"
import { ScanFace } from "lucide-react"

export const metadata: Metadata = {
  title: "ClokIn - ลงเวลาเข้างานด้วยใบหน้า",
  description: "ลงเวลาเข้างานด้วยใบหน้า ดูเวลาทำงาน และคิดเงินเดือนได้ในหน้าเดียว",
}

const quickFacts = [
  {
    label: "เริ่มใช้งาน",
    value: "ฟรีทันที",
    detail: "ลองใช้งานจริงได้โดยไม่ต้องติดตั้งอะไรเลย",
  },
  {
    label: "พร้อมทุกอุปกรณ์",
    value: "มือถือ · แท็บเล็ต · เว็บ",
    detail: "ใช้งานได้ทันทีบนอุปกรณ์ที่คุณมีอยู่แล้ว",
  },
  {
    label: "คิดเงินเดือนอัตโนมัติ",
    value: "ครบในคลิกเดียว",
    detail: "คำนวณชั่วโมงทำงานและเงินเดือนให้อัตโนมัติ",
  },
]

// Primary CTA
function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-8 py-3 text-sm font-semibold text-neutral-50 transition-all hover:bg-neutral-900/80 hover:scale-[1.02]"
    >
      {children}
    </Link>
  )
}

// Secondary CTA
function SecondaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-8 py-3 text-sm font-semibold text-neutral-700 transition-all hover:border-neutral-400 hover:bg-neutral-100"
    >
      {children}
    </Link>
  )
}

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col overflow-y-auto bg-linear-to-b from-white to-neutral-50 text-neutral-900">
      <SiteNavbar />

      <main className="flex flex-1 min-h-0 items-center justify-center px-4 sm:px-8">
        <section className="w-full max-w-5xl text-center space-y-12 py-20 sm:py-28">
          <div className="space-y-8">
            <div className="flex flex-col gap-4 items-center">
              <ScanFace className="size-24 stroke-2 text-sky-500 animate-pulse duration-300" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-semibold leading-tight">
              ลงเวลาเข้างานด้วยใบหน้า
            </h1>
            <p className="mx-auto max-w-xl text-base text-neutral-600">
              บันทึกเวลาทำงานให้อัตโนมัติ สรุปข้อมูลครบพร้อมพิมพ์ซองเงินเดือนในคลิกเดียว
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <PrimaryLink href="/signup">เริ่มใช้ฟรีวันนี้</PrimaryLink>
            <SecondaryLink href="/signin">มีบัญชีแล้ว เข้าสู่ระบบ</SecondaryLink>
          </div>

          <p className="text-xs text-neutral-500">ใช้งานได้ทุกอุปกรณ์ — เหมาะกับธุรกิจทุกขนาด</p>

          <div className="mx-auto mt-12 grid w-full max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
            {quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col items-center sm:items-start text-center sm:text-left"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">{fact.label}</p>
                <p className="text-lg font-semibold text-neutral-900">{fact.value}</p>
                <p className="text-neutral-600 text-sm">{fact.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
