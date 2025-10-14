import { readFileSync } from 'fs'
import { join } from 'path'

export default async function handler(req, res) {
  try {
    const { id } = req.query

    if (!id) {
      return res.status(400).send('Missing ID')
    }

    // Get Seene data from Supabase using REST API
    const supabaseUrl = process.env.VITE_SUPABASE_URL
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY
    
    const response = await fetch(
      `${supabaseUrl}/rest/v1/seenes?id=eq.${id}&select=*`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
      }
    )

    if (!response.ok) {
      return res.status(500).send('Error fetching Seene')
    }

    const data = await response.json()
    const seene = data[0]

    if (!seene) {
      return res.status(404).send('Seene not found')
    }

    const url = `https://seene.link/${id}`
    const ogImageUrl = `https://seene.link/api/og/${id}?id=${id}`
    const title = seene.text.substring(0, 60) + (seene.text.length > 60 ? '...' : '')
    const description = seene.text.substring(0, 160) + (seene.text.length > 160 ? '...' : '')
    
    // Read the index.html from dist folder
    const indexPath = join(process.cwd(), 'dist', 'index.html')
    let html = readFileSync(indexPath, 'utf-8')
    
    // Inject meta tags into the HTML
    const metaTags = `
  <title>${title}</title>
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${ogImageUrl}">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${url}">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogImageUrl}">
`
    
    // Insert meta tags before </head>
    html = html.replace('</head>', `${metaTags}</head>`)

    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(html)
  } catch (error) {
    console.error('Error generating meta page:', error)
    res.status(500).send('Error generating page')
  }
}
