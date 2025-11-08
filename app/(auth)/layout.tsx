// NextJS
import { Metadata } from "next"

// React
import type { ReactNode } from "react"

// Components
import Copyright from "@/components/copyright"

export const metadata: Metadata = {
  metadataBase: new URL("https://clokin.app"),
  title: {
    default: "เข้าสู่ระบบ",
    template: "%s | ClokIn",
  },
  description:
    "ระบบลงเวลาและเงินเดือนที่ใช้งานง่าย พร้อมอัตโนมัติที่ช่วยให้ทีมทำงานไหลลื่นขึ้นทันที",
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 h-2 w-2 rounded-full bg-neutral-50/70" aria-hidden />
      <p className="opacity-90">{text}</p>
    </div>
  )
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full min-h-screen">
      <div className="mx-auto flex w-full flex-1 flex-col overflow-hidden md:flex-row">
        <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center gap-6 bg-neutral-900 text-neutral-50">
          <div className="h-screen relative overflow-hidden">
            {/* Animation Background */}
            <div className="absolute inset-0 flex flex-col justify-center px-18 py-12">
              <div className="flex flex-col gap-6 text-neutral-50">
                <span className="inline-flex w-fit items-center rounded-full bg-neutral-100/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-neutral-50/80">
                  Clock in with face
                </span>
                <div className="flex gap-4 items-center">
                  <h2 className="mt-8 text-6xl font-black font-sans">ClokIn</h2>
                </div>
                <p className="max-w-sm text-base leading-relaxed font-sans font-medium">
                  แพลตฟอร์มที่ช่วยให้ทีมของคุณลงเวลา คำนวณเงินเดือน
                  และตรวจสอบความถูกต้องได้ในไม่กี่นาที
                </p>
                <div className="mt-4 space-y-3 text-sm font-sans">
                  <Feature text="สแกนใบหน้าแม่นยำ ปรับแสงได้อัตโนมัติ เหมาะกับทุกสภาพแวดล้อม" />
                  <Feature text="วิเคราะห์เวลางานแบบเรียลไทม์ พร้อมแจ้งเตือนทันทีเมื่อพบความผิดปกติ" />
                  <Feature text="ระบบเงินเดือนที่ตั้งกฎได้ละเอียด และคำนวณให้อัตโนมัติทุกงวด" />
                </div>
              </div>
              <Copyright className="text-neutral-200" />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-center bg-neutral-50 px-8 py-12 dark:bg-neutral-900/40">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </main>
  )
}
