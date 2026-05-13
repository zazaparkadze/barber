import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  console.log("zaza", request.url)
  const { searchParams } = new URL(request.url)
  const width = searchParams.get('width') || '400'
  const height = searchParams.get('height') || '500'
  const style = searchParams.get('style') || 'default'

  // Different colors based on style
  const styleColors = {
    'classic': { primary: '#fbbf24', secondary: '#f59e0b' },
    'fade': { primary: '#60a5fa', secondary: '#3b82f6' },
    'beard': { primary: '#a78bfa', secondary: '#8b5cf6' },
    'shave': { primary: '#34d399', secondary: '#10b981' },
    'package': { primary: '#f87171', secondary: '#ef4444' },
    'default': { primary: '#fbbf24', secondary: '#f59e0b' }
  }

  const styleKey = style.split('-')[0] as keyof typeof styleColors
  const colors = styleColors[styleKey] || styleColors.default

  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1e293b;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <circle cx="50%" cy="35%" r="25%" fill="${colors.primary}" opacity="0.1"/>
      <text x="50%" y="40%" text-anchor="middle" fill="${colors.primary}" font-family="Arial, sans-serif" font-size="48" font-weight="bold">BARBER</text>
      <text x="50%" y="55%" text-anchor="middle" fill="#94a3b8" font-family="Arial, sans-serif" font-size="44">Style Preview</text>
      <text x="50%" y="70%" text-anchor="middle" fill="#64748b" font-family="Arial, sans-serif" font-size="34">${style.toUpperCase()}</text>
    </svg>
  `

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000',
    },
  })
}