import React from 'react'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Movie App',
    template: '%s | Movie App',
  },
  description: 'CryptoLab 프론트엔드 구현 과제',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body>
        <h1>프론트엔드 구현 과제 (유재영)</h1>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
