import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Visualization Designer | Digital Twin Portfolio',
  description: '专注于AI可视化、GIS地理信息系统与数字孪生技术的数据可视化设计师作品集',
  keywords: ['AI Visualization', 'GIS', 'Digital Twin', 'Three.js', 'Data Visualization'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="min-h-screen bg-[#0a0a0f] text-gray-100 overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
