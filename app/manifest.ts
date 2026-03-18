import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Math Radar | 수학 행사 및 공모전 알리미',
    short_name: 'Math Radar',
    description: '매일 업데이트되는 국내외 수학 행사, 공모전, 캠프 정보를 한눈에 확인하세요.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
