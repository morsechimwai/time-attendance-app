// NextJS
import Link from "next/link"

export default function AuthDisclaimer() {
  return (
    <div className="font-sans text-sm text-neutral-500 dark:text-neutral-400 mt-4">
      การใช้งานบริการนี้ถือว่าคุณยอมรับ{" "}
      <Link
        className="hover:text-neutral-900 dark:hover:text-neutral-50 underline text-neutral-800 dark:text-neutral-200"
        href="/legal/terms"
      >
        ข้อตกลงการใช้บริการ
      </Link>{" "}
      และ{" "}
      <Link
        className="hover:text-neutral-900 dark:hover:text-neutral-50 underline text-neutral-800 dark:text-neutral-200"
        href="/legal/privacy"
      >
        นโยบายความเป็นส่วนตัว
      </Link>{" "}
      เราอาจส่งอัปเดตผลิตภัณฑ์และแจ้งเตือนเกี่ยวกับบัญชีให้คุณ และคุณสามารถยกเลิกการรับได้ทุกเมื่อ
    </div>
  )
}
