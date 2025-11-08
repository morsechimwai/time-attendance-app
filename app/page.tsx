// NextJS
import type { Metadata } from "next"
import Link from "next/link"

// Components
import SiteNavbar from "@/components/site-navbar"
import SiteFooter from "@/components/site-footer"

// Icons
import { ScanFace, Zap, Smartphone, Calculator } from "lucide-react"

// Metadata
export const metadata: Metadata = {
  title: "ClokIn - ลงเวลาเข้างานด้วยใบหน้า",
  description: "ลงเวลาเข้างานด้วยใบหน้า ดูเวลาทำงาน และคิดเงินเดือนได้ในหน้าเดียว",
}

// Quick Facts Data
const quickFacts = [
  {
    icon: Zap,
    label: "เริ่มใช้งาน",
    value: "ฟรีทันที",
    detail: "ลองใช้งานจริงได้โดยไม่ต้องติดตั้งอะไรเลย",
  },
  {
    icon: Smartphone,
    label: "พร้อมทุกอุปกรณ์",
    value: "มือถือ · แท็บเล็ต · เว็บ",
    detail: "ใช้งานได้ทันทีบนอุปกรณ์ที่คุณมีอยู่แล้ว",
  },
  {
    icon: Calculator,
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
      className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-semibold text-neutral-50 transition-all hover:bg-neutral-900/80 hover:scale-[1.02] active:scale-[0.98] min-w-0 w-full sm:w-auto"
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
      className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-semibold text-neutral-700 transition-all hover:border-neutral-400 hover:bg-neutral-100 active:scale-[0.98] min-w-0 w-full sm:w-auto"
    >
      {children}
    </Link>
  )
}

export default function HomePage() {
  return (
    <>
      <SiteNavbar />

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <section className="w-full max-w-6xl text-center space-y-8 sm:space-y-12 lg:space-y-16 py-8 sm:py-16 lg:py-24">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col gap-3 sm:gap-4 items-center">
              <ScanFace className="size-20 sm:size-24 lg:size-28 stroke-2 text-sky-500 animate-pulse duration-300" />
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight tracking-tight">
              ลงเวลาเข้างานด้วยใบหน้า
            </h1>
            <p className="mx-auto max-w-sm sm:max-w-xl lg:max-w-2xl text-sm sm:text-base lg:text-lg text-neutral-600 leading-relaxed">
              บันทึกเวลาทำงานให้อัตโนมัติ สรุปข้อมูลครบพร้อมพิมพ์ซองเงินเดือนในคลิกเดียว
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <PrimaryLink href="/signup">เริ่มใช้ฟรีวันนี้</PrimaryLink>
            <SecondaryLink href="/signin">มีบัญชีแล้ว เข้าสู่ระบบ</SecondaryLink>
          </div>

          <p className="text-xs sm:text-sm text-neutral-500 max-w-xs sm:max-w-none mx-auto">
            ใช้งานได้ทุกอุปกรณ์ — เหมาะกับธุรกิจทุกขนาด
          </p>

          <div className="mx-auto mt-8 sm:mt-12 lg:mt-16 grid w-full max-w-5xl grid-cols-1 gap-4 sm:gap-6 lg:gap-8 md:grid-cols-3">
            {quickFacts.map((fact) => {
              const IconComponent = fact.icon
              return (
                <div
                  key={fact.label}
                  className="group flex flex-col items-center text-center space-y-3 sm:space-y-4 py-6 sm:py-8 px-4 sm:px-6 rounded-2xl sm:rounded-3xl bg-white/50 backdrop-blur-sm border border-neutral-200/60 hover:border-neutral-300/80 hover:bg-white/70 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-200/25 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-sky-50 border border-sky-100 group-hover:bg-sky-100 group-hover:border-sky-200 transition-colors duration-300">
                    <IconComponent className="size-5 sm:size-6 text-sky-500 group-hover:text-sky-600 transition-colors duration-300" />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <p className="text-xs sm:text-xs uppercase tracking-[0.3em] text-neutral-400 group-hover:text-neutral-500 transition-colors duration-300">
                      {fact.label}
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-neutral-900 leading-snug">
                      {fact.value}
                    </p>
                    <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
                      {fact.detail}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
