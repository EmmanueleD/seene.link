import { NextResponse } from 'next/server'

export async function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Check if it's a Seene URL (format: /abc123)
  const seeneMatch = pathname.match(/^\/([A-Za-z0-9_-]{6,32})$/)
  
  if (!seeneMatch) {
    return NextResponse.next()
  }
  
  const id = seeneMatch[1]
  const userAgent = request.headers.get('user-agent') || ''
  
  // Check if it's a bot/crawler
  const isBot = /bot|crawler|spider|crawling|facebook|twitter|whatsapp|telegram|slack|linkedin/i.test(userAgent)
  
  if (!isBot) {
    return NextResponse.next()
  }
  
  // Redirect bots to meta endpoint
  return NextResponse.rewrite(new URL(`/api/meta/${id}`, request.url))
}

export const config = {
  matcher: '/:id([A-Za-z0-9_-]{6,32})',
}
