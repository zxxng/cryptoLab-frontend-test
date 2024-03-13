'use client'
import React, { useEffect, useState } from 'react'
import { GENRES } from '@/constants/genres'
import type { ApiResponse, trendingMovie } from '@/types/apiResponse'

interface SelectBoxProps {
  setData: React.Dispatch<
    React.SetStateAction<ApiResponse<trendingMovie> | null>
  >
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}
const SelectBox = ({ setData, setCurrentPage }: SelectBoxProps) => {
  const [selected, setSelected] = useState<string>('Trending')

  useEffect(() => {
    setCurrentPage(1)
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.NEXT_PUBLIC_API_TOKEN as string,
      },
    }

    if (selected !== 'Trending') {
      fetch(
        `${process.env.NEXT_PUBLIC_API_END_POINT}/discover/movie?with_genres=${selected}`,
        options,
      )
        .then((response) => response.json())
        .then((response) => setData(response))
        .catch((err) => console.error(err))
    }
  }, [selected])

  const displayedGenresIds = [28, 12, 16, 35, 80, 99, 18, 10751, 14]

  return (
    <div className="absolute top-0 right-0">
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
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
