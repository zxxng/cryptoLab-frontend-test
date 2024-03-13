import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import './globals.css'

export const metadata: Metadata = {
  title: 'Movie App',
  description: 'CryptoLab 프론트엔드 구현 과제',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="w-full h-screen">
        <h1 className="w-full max-w-[1440px] h-[72px] mx-auto py-6 px-8 text-primar-01 text-lg border-b-[1px] border-b-gray-05">
          프론트엔드 구현 과제 (유재영)
        </h1>
        <main className="w-[1280px] mx-auto relative">{children}</main>
        <footer className="flex flex-col gap-4 justify-center items-center p-8 border-t-[1px] border-t-gray-05">
          <Image
            src="/HEAAN_Logo.svg"
            alt="logo"
            width={196}
            height={56}
            priority
          />
          <p className="text-gray-04 text-sm">
            © 2024 CryptoLab Inc. All Rights Reserved
          </p>
        </footer>
      </body>
    </html>
  )
}

export default RootLayout
