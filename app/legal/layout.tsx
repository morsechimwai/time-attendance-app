import SiteFooter from "@/components/site-footer"
import SiteNavbar from "@/components/site-navbar"

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SiteNavbar />
      <section>{children}</section>
      <SiteFooter />
    </>
  )
}
