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

    // Generate SVG image with the Seene's styling
    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${seene.gradient_start || '#ffffff'};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${seene.gradient_end || '#f3f4f6'};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#grad)"/>
        <text x="600" y="315" font-family="Arial, sans-serif" font-size="60" font-weight="300" fill="${seene.text_color || '#111827'}" text-anchor="middle" dominant-baseline="middle" style="max-width: 90%;">
          ${displayText.split('\n').map((line, i) => `<tspan x="600" dy="${i === 0 ? 0 : 70}">${line}</tspan>`).join('')}
        </text>
        <text x="1160" y="590" font-family="Arial, sans-serif" font-size="24" fill="${seene.text_color || '#111827'}" text-anchor="end" opacity="0.6">
          seene.link
        </text>
      </svg>
    `

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error generating OG image:', error)
    return new Response(`Error: ${error.message}`, { status: 500 })
  }
}
