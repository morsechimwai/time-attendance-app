const body = `# llms.txt for FaceIN
contact: mailto:hello@face.in
legal: https://clokin.app/legal/privacy
terms: https://clokin.app/legal/terms
allowed-use: indexing, research, non-commercial summarization
disallow: /app/, /api/, /team/, /handler/
note: This llms.txt file is intended to guide AI language models on how to interact with the ClokIn website's content.
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
