'use client'
import React from 'react'
import { PATH, MENU } from '@/constants/appNavigation'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const MenuBar = () => {
  const searchParams = useSearchParams()
  const selectedMenu = searchParams.get('menu')

  return (
    <div className="font-suit text-2xl font-bold mt-9 mb-8">
      <Link
        href={`${PATH.root}`}
        className={`${selectedMenu ? 'text-gray-04' : 'text-blue-01'} hover:text-blue-01 mr-8`}
      >
        {MENU.movie}
      </Link>
      <Link
        href={`${PATH.root}?menu=${MENU.favorite}`}
        className={`${selectedMenu ? 'text-blue-01' : 'text-gray-04'} hover:text-blue-01`}
      >
        {MENU.favorite}
      </Link>
    </div>
  )
}

export default MenuBar
