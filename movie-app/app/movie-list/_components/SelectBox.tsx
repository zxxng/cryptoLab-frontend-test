'use client'
import React, { useEffect, useState } from 'react'
import type { GenreMovie } from '@/types/apiResponse'

const SelectBox = () => {
  const [selected, setSelected] = useState<string>('Trending')
  const [genre, setGenre] = useState<GenreMovie | null>(null)

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjFmMjI5MWFjNmFlZWNmOTY1Njc1Yjk1YzIxYmU3YyIsInN1YiI6IjY1ZWVjYjMyMmIxMTNkMDE2M2Y4YzcyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0GdlqQ6AtnniLFPrwtEZnNk9XHDMNLyktT-iZvX9-cQ',
      },
    }

    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then((response) => response.json())
      .then((response) => setGenre(response))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="absolute top-0 right-0">
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value="Trending">Trending</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Animation">Animation</option>
        <option value="Comedy">Comedy</option>
        <option value="Crime">Crime</option>
        <option value="Documentary">Documentary</option>
        <option value="Drama">Drama</option>
        <option value="Family">Family</option>
        <option value="Fantasy">Fantasy</option>
      </select>
      {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <div className="h-4 w-4 transform rotate-45 border-b-2 border-r-2 border-gray-700"></div>
      </div> */}
    </div>
  )
}

export default SelectBox
