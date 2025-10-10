import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { id } = req.query

    // Validate input
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'ID is required' })
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    )

    // Query database
    const { data, error } = await supabase
      .from('seenes')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return res.status(404).json({ error: 'Seene not found' })
    }

    // Return Seene data
    return res.status(200).json({
      id: data.id,
      text: data.text,
      font: data.font,
      text_color: data.text_color,
      gradient_start: data.gradient_start,
      gradient_end: data.gradient_end,
      created_at: data.created_at
    })

  } catch (error) {
    console.error('Error fetching Seene:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
