import { createClient } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { text } = req.body

    // Validate input
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required' })
    }

    if (text.length > 500) {
      return res.status(400).json({ error: 'Text too long (max 500 characters)' })
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    )

    // Generate unique ID
    const id = nanoid(8)

    // Insert into database
    const { data, error } = await supabase
      .from('seenes')
      .insert([
        {
          id,
          text: text.trim(),
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: 'Failed to create Seene' })
    }

    // Return success response
    return res.status(201).json({
      id: data.id,
      url: `${process.env.BASE_URL || 'https://seene.link'}/${data.id}`
    })

  } catch (error) {
    console.error('Error creating Seene:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
