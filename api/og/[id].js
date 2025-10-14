import { ImageResponse } from '@vercel/og'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

export const config = {
  runtime: 'edge',
}

export default async function handler(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return new Response('Missing ID', { status: 400 })
    }

    // Get Seene data from Supabase
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data: seene, error } = await supabase
      .from('seenes')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !seene) {
      return new Response('Seene not found', { status: 404 })
    }

    // Truncate text if too long
    const displayText = seene.text.length > 200 
      ? seene.text.substring(0, 200) + '...' 
      : seene.text

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${seene.gradient_start || '#ffffff'} 0%, ${seene.gradient_end || '#f3f4f6'} 100%)`,
            padding: '80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: 60,
                fontWeight: 300,
                color: seene.text_color || '#111827',
                lineHeight: 1.4,
                margin: 0,
                whiteSpace: 'pre-wrap',
              }}
            >
              {displayText}
            </p>
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
