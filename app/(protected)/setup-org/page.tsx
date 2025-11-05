import { getAuthContext } from "@/lib/auth/context"
import { redirect } from "next/navigation"

export default async function SetupOrgPage() {
  const ctx = await getAuthContext()
  console.log("SetupOrgPage ctx:", ctx)
  // if (!ctx) redirect("/signin")

  // // ถ้ามี org แล้ว ก็ไม่ต้อง setup อีก
  // if (ctx.orgId) redirect("/dashboard")

  return <div>Organization Setup Page</div>
}
