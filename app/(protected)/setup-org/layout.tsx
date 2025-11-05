import AuthLayout from "@/app/(auth)/layout"

export default async function SetupOrgLayout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>
}
