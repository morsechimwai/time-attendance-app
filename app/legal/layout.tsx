import SiteNavbar from "@/components/side-navbar"

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SiteNavbar />
      <section>{children}</section>
    </>
  )
}
