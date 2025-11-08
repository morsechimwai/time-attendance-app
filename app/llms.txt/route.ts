const body = `# llms.txt for FaceIN
contact: mailto:hello@face.in
legal: https://face.in/legal/privacy
terms: https://face.in/legal/terms
allowed-use: indexing, research, non-commercial summarization
disallow: /app/, /api/, /team/, /handler/
note: FaceIN อยู่ในช่วงเบต้า ข้อมูลผลิตภัณฑ์ยังไม่เสถียร กรุณาตรวจสอบก่อนนำไปใช้งานเชิงพาณิชย์
`

export const dynamic = "force-static"

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
