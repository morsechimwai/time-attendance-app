import Link from "next/link"
import Copyright from "./copyright"

export default function SiteFooter() {
  return (
    <footer className="border-t border-stone-900 py-6 sm:py-8 lg:py-12 text-center text-sm text-stone-900 bg-stone-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 lg:gap-8">
            <Link
              href="/legal/terms"
              className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white hover:text-stone-200 transition-colors duration-200 px-2 py-1 rounded hover:bg-stone-800"
            >
              ข้อตกลงการใช้บริการ
            </Link>
            <div className="hidden sm:block w-px h-4 bg-stone-700" />
            <Link
              href="/legal/privacy"
              className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white hover:text-stone-200 transition-colors duration-200 px-2 py-1 rounded hover:bg-stone-800"
            >
              นโยบายความเป็นส่วนตัว
            </Link>
            <div className="hidden sm:block w-px h-4 bg-stone-700" />
            <Link
              href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
              className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white hover:text-stone-200 transition-colors duration-200 px-2 py-1 rounded hover:bg-stone-800"
            >
              ติดต่อผู้พัฒนา
            </Link>
          </div>
          <Copyright className="text-neutral-300 justify-center text-xs sm:text-sm" />
        </div>
      </div>
    </footer>
  )
}
