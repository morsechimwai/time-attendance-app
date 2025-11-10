import { Metadata } from "next"

export const metadata: Metadata = {
  title: "ตั้งค่า",
  description: "การตั้งค่าระบบและองค์กร",
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">ตั้งค่า</h1>
        <p className="text-muted-foreground">จัดการการตั้งค่าระบบและองค์กร</p>
      </div>

      <div className="grid gap-6">
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">ข้อมูลองค์กร</h2>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              การตั้งค่าข้อมูลบริษัทและการกำหนดค่าระบบ
            </div>
            <div className="text-sm">🚧 กำลังพัฒนา - จะเพิ่มฟีเจอร์การตั้งค่าในเร็วๆ นี้</div>
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">การตั้งค่าเงินเดือน</h2>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              กำหนดค่าเริ่มต้นสำหรับการคำนวณเงินเดือนและ OT
            </div>
            <div className="text-sm">
              🚧 กำลังพัฒนา - จะเพิ่มฟีเจอร์การตั้งค่าเงินเดือนในเร็วๆ นี้
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">วันหยุด</h2>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              จัดการวันหยุดประจำปีและวันหยุดบริษัท
            </div>
            <div className="text-sm">🚧 กำลังพัฒนา - จะเพิ่มฟีเจอร์จัดการวันหยุดในเร็วๆ นี้</div>
          </div>
        </div>
      </div>
    </div>
  )
}
