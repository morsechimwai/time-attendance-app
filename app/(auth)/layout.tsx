// NextJS
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

// React
import type { ReactNode } from "react"

// Components
import Copyright from "@/components/copyright"
import MainBackground from "@/components/main-background"

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
      <span className="mt-1 h-2 w-2 rounded-full bg-sky-500/70" aria-hidden />
      <p className="opacity-90 text-neutral-600">{text}</p>
    </div>
  )
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <MainBackground
      backgroundVariant="intense"
      backdropIntensity="medium"
      backdropTint="white"
      className="bg-linear-to-b from-white to-neutral-50 text-neutral-900"
    >
      <div className="mx-auto flex w-full min-h-screen flex-col lg:flex-row relative">
        {/* Left Section - Hidden on mobile, visible on lg+ */}
        <section className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden bg-linear-to-br from-white via-neutral-50 to-neutral-100 border-r border-neutral-200/50">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent"></div>

          <div className="relative z-10 flex flex-col justify-between p-8 xl:p-12 2xl:p-16 text-neutral-900">
            <div className="flex flex-col space-y-10">
              <div className="flex flex-col gap-6 xl:gap-8 items-start">
                <Link href="/" className="w-fit">
                  <Image
                    src="/clokin-logo.png"
                    alt="ClokIn Logo"
                    width={200}
                    height={67}
                    className="w-48 xl:w-56 2xl:w-64 h-auto aspect-auto hover:opacity-80 transition-opacity"
                  />
                </Link>
                <p className="max-w-lg text-lg xl:text-xl leading-relaxed font-sans font-medium text-neutral-600">
                  แพลตฟอร์มที่ช่วยให้ทีมของคุณลงเวลา คำนวณเงินเดือน
                  และตรวจสอบความถูกต้องได้ในไม่กี่นาที
                </p>
              </div>

              <div className="space-y-4 text-sm xl:text-base font-sans">
                <Feature text="สแกนใบหน้าแม่นยำ ปรับแสงได้อัตโนมัติ เหมาะกับทุกสภาพแวดล้อม" />
                <Feature text="วิเคราะห์เวลางานแบบเรียลไทม์ พร้อมแจ้งเตือนทันทีเมื่อพบความผิดปกติ" />
                <Feature text="ระบบเงินเดือนที่ตั้งกฎได้ละเอียด และคำนวณให้อัตโนมัติทุกงวด" />
              </div>
            </div>

            <Copyright className="text-neutral-500 text-sm" />
          </div>
        </section>

        {/* Right Section - Full width on mobile, half on lg+ */}
        <section className="flex flex-1 lg:w-1/2 xl:w-2/5 items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8 xl:p-12">
          <div className="w-full max-w-sm lg:max-w-md xl:max-w-lg flex items-center justify-center">
            <div className="w-full bg-white/95 backdrop-blur-md rounded-4xl shadow-2xl shadow-black/20 border border-white/30 p-6 sm:p-8 lg:p-10 relative z-20 flex items-center justify-center min-h-[600px]">
              <div className="w-full flex flex-col items-center justify-center space-y-6">
                {children}
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainBackground>
  )
}
