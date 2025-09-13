// Simple branded SVG placeholder generator for preview imagery
// Usage: placeholder('Gold Jewelry', 'gold')

type Theme =
  | 'gold'
  | 'silver'
  | 'diamond'
  | 'bridal'
  | 'daily'
  | 'wedding'
  | 'festive'
  | 'office'
  | 'gifting'
  | 'loyalty'
  | 'savings'
  | 'neutral';

const themeMap: Record<Theme, { from: string; to: string; fg: string; ring: string }> = {
  gold: { from: '#f7e3a3', to: '#e6c766', fg: '#5a3d00', ring: '#b58b25' },
  silver: { from: '#e6e9ee', to: '#cfd6e1', fg: '#2e3a48', ring: '#9aa7b7' },
  diamond: { from: '#eef7ff', to: '#cfe7ff', fg: '#213547', ring: '#98c6ff' },
  bridal: { from: '#fde2e4', to: '#f9c2c7', fg: '#7a1c24', ring: '#e29aa1' },
  daily: { from: '#fff8e7', to: '#ffe7b8', fg: '#5a3d00', ring: '#d4b06b' },
  wedding: { from: '#ffe8cf', to: '#ffcaa0', fg: '#6e2b0f', ring: '#e3a56c' },
  festive: { from: '#ffe6e6', to: '#ffb3b3', fg: '#7a1c24', ring: '#ef7f7f' },
  office: { from: '#eef2f7', to: '#d6dde7', fg: '#2e3a48', ring: '#a8b4c4' },
  gifting: { from: '#eaf7f0', to: '#c8ead6', fg: '#214c35', ring: '#8ac5a2' },
  loyalty: { from: '#fff1e6', to: '#ffd7b3', fg: '#6b2e12', ring: '#e6a676' },
  savings: { from: '#fff6e5', to: '#ffe1ad', fg: '#5a3d00', ring: '#d8b46c' },
  neutral: { from: '#f5f7fa', to: '#e4e9f0', fg: '#2e3a48', ring: '#c7d0dc' },
};

export function placeholder(label: string, theme: Theme = 'neutral', w = 1200, h = 900): string {
  const t = themeMap[theme] || themeMap.neutral;
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="${t.from}"/>
        <stop offset="100%" stop-color="${t.to}"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)"/>
    <rect x="24" y="24" width="${w-48}" height="${h-48}" rx="24" ry="24" fill="none" stroke="${t.ring}" stroke-opacity="0.45" stroke-width="2"/>
    <g fill="${t.fg}" fill-opacity="0.9" text-anchor="middle" font-family="'Inter', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, 'Helvetica Neue', Arial">
      <text x="${w/2}" y="${h/2}" font-size="${Math.min(w,h)/12}" font-weight="700">${escapeXml(label)}</text>
      <text x="${w/2}" y="${h/2 + 48}" font-size="${Math.min(w,h)/28}" opacity="0.75">RL Jewels • Sample Preview</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default placeholder;
