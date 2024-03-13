'use client'
import React, { useEffect, useState } from 'react'
import { GENRES } from '@/constants/genres'
import type { ApiResponse, trendingMovie } from '@/types/apiResponse'

interface SelectBoxProps {
  setData: React.Dispatch<
    React.SetStateAction<ApiResponse<trendingMovie> | null>
  >
}
const SelectBox = ({ setData }: SelectBoxProps) => {
  const [selected, setSelected] = useState<string>('Trending')

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjFmMjI5MWFjNmFlZWNmOTY1Njc1Yjk1YzIxYmU3YyIsInN1YiI6IjY1ZWVjYjMyMmIxMTNkMDE2M2Y4YzcyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0GdlqQ6AtnniLFPrwtEZnNk9XHDMNLyktT-iZvX9-cQ',
      },
    }

    fetch(
      `https://api.themoviedb.org/3/discover/movie${selected !== 'Trending' ? `?with_genres=${selected}` : ''}`,
      options,
    )
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err))
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
