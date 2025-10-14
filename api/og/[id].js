import { ImageResponse } from '@vercel/og'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

export const config = {
  runtime: 'edge',
}

export default async function handler(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return new Response('Missing id parameter', { status: 400 })
    }

    // Fetch Seene data from Supabase
    const { data: seene, error } = await supabase
      .from('seenes')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !seene) {
      return new Response('Seene not found', { status: 404 })
    }

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
            background: `linear-gradient(135deg, ${seene.gradient_start} 0%, ${seene.gradient_end} 100%)`,
            padding: '80px',
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: 300,
              color: seene.text_color,
              textAlign: 'center',
              lineHeight: 1.4,
              maxWidth: '90%',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {seene.text.length > 200 ? seene.text.substring(0, 200) + '...' : seene.text}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              right: 40,
              fontSize: 24,
              color: seene.text_color,
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
    return new Response('Error generating image', { status: 500 })
  }
}
