'use client'

import React, { useEffect, useState } from 'react'
import { GENRES } from '@/constants/genres'
import { useRouter, useSearchParams } from 'next/navigation'
import { PATH } from '@/constants/appNavigation'

const SelectBox = () => {
  const router = useRouter()
  const genre = useSearchParams().get('genre')
  const [selected, setSelected] = useState<string>('Trending')
  const displayedGenresIds = [28, 12, 16, 35, 80, 99, 18, 10751, 14]

  useEffect(() => {
    setSelected(genre ? genre : 'Trending')
  }, [genre])

  return (
    <div className="absolute top-0 right-0">
      <select
        value={selected}
        onChange={(e) => router.push(`${PATH.root}?genre=${e.target.value}`)}
      >
        <option key={0} value="Trending">
          Trending
        </option>
        {displayedGenresIds.map((id) => (
          <option key={id} value={id}>
            {GENRES[id]}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectBox
