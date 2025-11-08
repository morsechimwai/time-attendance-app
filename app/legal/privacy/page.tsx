import MainBackground from "@/components/main-background"
import { SquarePen } from "lucide-react"
import type { ReactNode } from "react"

const formatThaiDate = () =>
  new Intl.DateTimeFormat("th-TH", { day: "numeric", month: "short", year: "numeric" }).format(
    new Date()
  )

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="rounded-2xl border border-neutral-200 p-6 backdrop-blur bg-linear-to-br from-white via-white to-neutral-50/80">
    <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>
    <div className="mt-3 space-y-3 text-neutral-700 leading-relaxed tracking-[0.01em]">
      {children}
    </div>
  </section>
)

export default function PrivacyPage() {
  const lastUpdated = formatThaiDate()
  const legalMeta = [
    { label: "ฐานทางกฎหมาย", value: "PDPA พ.ศ. 2562 & กฎหมายที่เกี่ยวข้อง" },
    { label: "ข้อมูลหลัก", value: "บัญชี, บันทึกใช้งาน, ข้อมูลชีวภาพ, ภาพถ่าย" },
    { label: "DPO / ช่องทาง", value: `${process.env.NEXT_PUBLIC_DPO_EMAIL} (DPO team)` },
    { label: "อัปเดต", value: lastUpdated },
  ]
  const highlights = [
    "รองรับสิทธิ PDPA และการตัดสินใจอัตโนมัติ",
    "ข้อมูลชีวภาพถูกเข้ารหัสและแยกเก็บ",
    "มีกระบวนการแจ้งเหตุภายใน 72 ชั่วโมง",
  ]

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6">
        <div className="rounded-3xl border border-neutral-200 p-8 backdrop-blur bg-linear-to-br from-white via-white to-neutral-50/80">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-5xl font-black tracking-wider text-neutral-900">ClokIn</h2>
            <span className="rounded-full bg-neutral-900 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-100">
              Privacy
            </span>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-neutral-900">
            นโยบายความเป็นส่วนตัว (Privacy Policy)
          </h1>
          <p className="mt-4 text-base leading-relaxed tracking-[0.01em] text-neutral-600">
            เอกสารนี้อธิบายวิธีที่ ClokIn (“บริการ”) เก็บ ใช้ เปิดเผย และปกป้องข้อมูลส่วนบุคคล
            รวมถึงข้อมูลภาพและข้อมูลชีวภาพ โดยยึด PDPA และกฎหมายไทยที่เกี่ยวข้อง
            เราทำหน้าที่เป็นผู้ควบคุมข้อมูล และอาจแต่งตั้งผู้ประมวลผลย่อยภายใต้สัญญา
          </p>
          <dl className="mt-6 grid gap-4 text-sm text-neutral-600 sm:grid-cols-2">
            {legalMeta.map((meta) => (
              <div
                key={meta.label}
                className="rounded-2xl border border-neutral-200 p-4 bg-linear-to-br from-white via-white to-neutral-50/80"
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  {meta.label}
                </dt>
                <dd className="mt-1 text-base font-semibold text-neutral-900">{meta.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full bg-neutral-900 px-4 py-1.5 text-sm font-medium text-neutral-100 tracking-wider"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Section title="1. ประเภทข้อมูลที่เก็บรวบรวม">
            <p>
              เรารวบรวมเฉพาะข้อมูลที่จำเป็นต่อการให้บริการพิสูจน์ตัวตนและการบันทึกเวลา โดยแบ่งเป็น:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>ข้อมูลบัญชี: ชื่อ-นามสกุล อีเมล เบอร์โทรศัพท์ หน่วยงาน และบทบาทผู้ใช้</li>
              <li>
                ข้อมูลยืนยันตัวตน: รหัสผ่านที่เข้ารหัส โทเคน MFA บันทึกการเข้าสู่ระบบ และ device
                fingerprint
              </li>
              <li>ข้อมูลการใช้งาน: การตั้งค่า พฤติกรรมการใช้ อุปกรณ์ และข้อมูลเชิงวิเคราะห์</li>
              <li>
                ข้อมูลการสนับสนุน: แบบฟอร์มติดต่อ ตั๋วสนับสนุน เอกสารที่อัปโหลด และบันทึกการสนทนา
              </li>
              <li>
                <strong>ข้อมูลชีวภาพใบหน้า</strong> และข้อมูลภาพ/วิดีโอที่เจ้าของข้อมูลส่งเข้ามา
                รวมถึงเมตาดาตา (landmark, embedding, confidence score) ที่สร้างจากโมเดล AI
              </li>
            </ul>
          </Section>

          <Section title="2. วัตถุประสงค์และฐานทางกฎหมาย">
            <p>เราประมวลผลข้อมูลภายใต้ฐานที่ถูกต้องตาม PDPA:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>ความยินยอมอย่างชัดแจ้งสำหรับข้อมูลชีวภาพ ฟีเจอร์ทดลอง หรือการสื่อสารพิเศษ</li>
              <li>การปฏิบัติตามสัญญา เพื่อสร้างบัญชี ให้สิทธิ์การเข้าถึง และสนับสนุนลูกค้า</li>
              <li>
                ประโยชน์โดยชอบด้วยกฎหมาย เพื่อความปลอดภัย ป้องกันการทุจริต วิเคราะห์ประสิทธิภาพ
                และพัฒนาฟีเจอร์
              </li>
              <li>
                การปฏิบัติตามกฎหมายหรือคำสั่งของหน่วยงานรัฐและศาล เช่น
                กฎหมายแรงงานหรือความมั่นคงไซเบอร์
              </li>
              <li>การปกป้องชีวิตหรือความปลอดภัยเมื่อจำเป็นในสถานการณ์ฉุกเฉิน</li>
            </ul>
          </Section>

          <Section title="3. การใช้ เปิดเผย และผู้ประมวลผลข้อมูล">
            <p>
              ข้อมูลใช้เพื่อพิสูจน์ตัวตน จัดการบัญชี ตรวจจับความผิดปกติ ปรับปรุงผลิตภัณฑ์
              และตอบข้อซักถาม การเปิดเผยต่อบุคคลที่สามจะทำเฉพาะกรณี:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                จำเป็นต้องใช้ผู้ประมวลผล เช่น โครงสร้างพื้นฐานคลาวด์ ระบบ MFA
                หรือที่ปรึกษาด้านกฎหมาย/ไซเบอร์
              </li>
              <li>ลูกค้าร้องขอการเชื่อมต่อกับระบบ HR/Payroll/ERP โดยมี DPA ครอบคลุม</li>
              <li>มีหน้าที่ตามกฎหมาย คำสั่งศาล หรือการสอบสวนของหน่วยงานรัฐ</li>
              <li>ใช้ข้อมูลที่ทำให้นิรนามแล้วเพื่อการวิเคราะห์แนวโน้มและการทดสอบโมเดล AI</li>
            </ul>
          </Section>

          <Section title="4. การโอนข้อมูลระหว่างประเทศ">
            <p>
              ศูนย์ข้อมูลหลักตั้งอยู่ในประเทศไทย แต่หากต้องโอนไปยังต่างประเทศ เราจะปฏิบัติตามมาตรา
              28 PDPA และมาตรฐานสากลที่หน่วยงานไทยยอมรับ
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>ประเมินประเทศปลายทางและเลือกเฉพาะผู้ให้บริการที่มีมาตรฐานเพียงพอ</li>
              <li>ทำ Standard Contractual Clauses หรือกลไกอื่นที่รองรับการคุ้มครองข้อมูล</li>
              <li>
                แจ้งลูกค้าเมื่อมีการโอนข้อมูลที่มีความเสี่ยงสูง และเก็บบันทึกการโอนเพื่อการตรวจสอบ
              </li>
            </ul>
          </Section>

          <Section title="5. มาตรการรักษาความปลอดภัย">
            <p>
              ระบบใช้การเข้ารหัสระหว่างส่งและจัดเก็บ Zero Trust access control
              การจัดการสิทธิ์ตามบทบาท (RBAC) การหมุนเวียนคีย์ การตรวจสอบ log แบบเรียลไทม์
              และการทดสอบความปลอดภัยเป็นประจำ
            </p>
            <p>
              เทมเพลตข้อมูลใบหน้าและเมตาดาตา AI ถูกเก็บในสภาพแวดล้อมที่แยกจากฐานข้อมูลธุรกรรม
              พร้อมการควบคุมสิทธิ์พิเศษ และการบันทึกการเข้าถึงทุกครั้ง
            </p>
          </Section>

          <Section title="6. ระยะเวลาการเก็บรักษา">
            <p>
              เราเก็บข้อมูลเท่าที่จำเป็นต่อวัตถุประสงค์ทางธุรกิจหรือข้อกฎหมาย
              และทำให้นิรนามเมื่อหมดความจำเป็น โดยหลักการ:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>ข้อมูลชีวภาพ: ลบหรือทำให้นิรนามภายใน 60 วันหลังถอนความยินยอมหรือสิ้นสุดสัญญา</li>
              <li>ภาพ/วิดีโอยืนยันตัวตน: เก็บไม่เกิน 30 วัน เว้นแต่กฎหมายกำหนดให้เก็บนานกว่า</li>
              <li>บันทึกระบบและความปลอดภัย: เก็บ 12 เดือนหรือยาวกว่าหากจำเป็นต่อการตรวจสอบ</li>
              <li>ข้อมูลสำรอง: ลบตามรอบสำรองภายใน 90 วันหลังคำขอลบ</li>
            </ul>
          </Section>

          <Section title="7. สิทธิของเจ้าของข้อมูล">
            <p>ผู้ใช้สามารถยื่นคำร้องเพื่อ:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>ขอรับสำเนาหรือเข้าถึงข้อมูลส่วนบุคคล และทราบแหล่งที่มาของข้อมูลภาพ</li>
              <li>ขอแก้ไขให้ถูกต้อง เป็นปัจจุบัน และครบถ้วน</li>
              <li>คัดค้านหรือจำกัดการประมวลผลบางประเภท เช่น การใช้ข้อมูลเพื่อทดสอบ AI เพิ่มเติม</li>
              <li>ถอนความยินยอมโดยไม่กระทบความชอบด้วยกฎหมายก่อนหน้าการถอน</li>
              <li>ขอให้ลบ ทำลาย หรือทำให้ข้อมูลเป็นนิรนามเมื่อไม่มีความจำเป็นต้องประมวลผล</li>
              <li>ร้องเรียนต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคลหากเห็นว่าถูกละเมิดสิทธิ</li>
              <li>ขอคำอธิบายเกี่ยวกับการตัดสินใจอัตโนมัติที่มีผลกระทบอย่างมีนัยสำคัญ</li>
            </ul>
          </Section>

          <Section title="8. การตัดสินใจอัตโนมัติและ AI">
            <p>
              ClokIn ใช้โมเดล AI เพื่อประเมินความตรงกันของใบหน้า แต่จะไม่ปล่อยให้ผลลัพธ์ AI
              เพียงอย่างเดียวตัดสินใจเรื่องสำคัญ โดยไม่มีมนุษย์กำกับ ผู้ใช้สามารถร้องขอการทบทวนได้
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>บันทึกค่า Confidence Score และ metadata เพื่อให้ตรวจสอบย้อนกลับได้</li>
              <li>ประเมินความเอนเอียงของโมเดลเป็นระยะและเก็บหลักฐานการทดสอบ</li>
              <li>
                ไม่ใช้ข้อมูลภาพของลูกค้าเพื่อฝึกโมเดลภายนอกหรือจำหน่ายต่อโดยไม่ได้รับความยินยอม
              </li>
            </ul>
          </Section>

          <Section title="9. การจัดการข้อมูลชีวภาพและรูปภาพ">
            <p>
              ฟีเจอร์จดจำใบหน้าจะทำงานก็ต่อเมื่อได้รับความยินยอมที่ตรวจสอบได้
              และลูกค้าสามารถขอปิดใช้งานได้ทุกเมื่อ เราบันทึกหลักฐานการยินยอม ช่องทางแจ้งเตือน
              และปลายทางการส่งต่อข้อมูลภาพ
            </p>
            <p>
              การขอลบข้อมูลชีวภาพต้องผ่านขั้นตอนยืนยันตัวตนหลายชั้น
              ระบบจะส่งหลักฐานการลบหลังดำเนินการ เพื่อป้องกันคำร้องที่มิชอบ
            </p>
          </Section>

          <Section title="10. ช่องทางติดต่อและการแจ้งเหตุ">
            <p>
              หากต้องการใช้สิทธิ แจ้งเหตุละเมิดข้อมูล หรือสอบถามเพิ่มเติม โปรดติดต่อ{" "}
              <strong>{`${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}</strong> (ระบุหัวข้อ “PDPA /
              Privacy”) เจ้าหน้าที่คุ้มครองข้อมูลจะตอบกลับภายใน 15 วันทำการ
            </p>
            <p>
              หากพบเหตุละเมิดที่มีความเสี่ยงสูง
              โปรดแจ้งรายละเอียดทันทีเพื่อให้เราสามารถประสานหน่วยงานกำกับและผู้มีส่วนได้เสีย ภายใน
              72 ชั่วโมงหรือเร็วที่สุดเท่าที่จะเป็นไปได้
            </p>
          </Section>

          <Section title="11. การปรับปรุงนโยบาย">
            <p>
              เราอาจปรับปรุงนโยบายนี้เพื่อสะท้อนบริการหรือข้อกำหนดใหม่ หากมีการเปลี่ยนแปลงสาระสำคัญ
              จะประกาศให้ทราบล่วงหน้า และการใช้งานต่อเนื่องถือว่าผู้ใช้ยอมรับแล้ว
            </p>
          </Section>

          <div className="flex items-center justify-center gap-1">
            <SquarePen className="inline-block size-4 text-neutral-500" aria-hidden="true" />
            <p className="text-sm leading-relaxed tracking-[0.02em] text-neutral-500">
              ปรับปรุงล่าสุด {lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
