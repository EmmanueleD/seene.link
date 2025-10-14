import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'edge',
}

export default async function handler(request) {
  try {
    const { pathname } = new URL(request.url)
    const id = pathname.split('/').pop()

    if (!id) {
      return new Response('Missing id parameter', { status: 400 })
    }

    // Fetch Seene data from API
    const apiUrl = `${request.url.split('/api/og')[0]}/api/get?id=${id}`
    const response = await fetch(apiUrl)
    
    if (!response.ok) {
      return new Response('Seene not found', { status: 404 })
    }

    const seene = await response.json()
    const displayText = seene.text.length > 200 ? seene.text.substring(0, 200) + '...' : seene.text

    // Generate OG image with the Seene's styling
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${seene.gradient_start || '#ffffff'} 0%, ${seene.gradient_end || '#f3f4f6'} 100%)`,
            padding: '80px',
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: 300,
              color: seene.text_color || '#111827',
              textAlign: 'center',
              lineHeight: 1.4,
              maxWidth: '90%',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {displayText}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              right: 40,
              fontSize: 24,
              color: seene.text_color || '#111827',
              opacity: 0.6,
            }}
          >
            seene.link
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    return new Response(`Error: ${error.message}`, { status: 500 })
  }
}
