import Link from "next/link"
import Copyright from "./copyright"

export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 py-8 text-center text-sm text-neutral-600 space-y-4">
      <div className="flex flex-wrap justify-center gap-4 text-xs uppercase tracking-[0.3em]">
        <Link href="/legal/terms" className="hover:text-neutral-800">
          ข้อตกลงการใช้บริการ
        </Link>
        <Link href="/legal/privacy" className="hover:text-neutral-800">
          นโยบายความเป็นส่วนตัว
        </Link>
        <Link
          href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
          className="hover:text-neutral-800"
        >
          ติดต่อผู้พัฒนา
        </Link>
      </div>
      <Copyright className="text-neutral-500 justify-center" />
    </footer>
  )
}
