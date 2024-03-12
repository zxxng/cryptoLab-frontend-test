'use client'

import React, { useEffect, useState } from 'react'
import MenuBar from './_components/MenuBar'
import MovieCard from './_components/MovieCard'
import type { ApiResponse, trendingMovie } from '@/types/apiResponse'

const MovieListPage = () => {
  const [data, setData] = useState<ApiResponse<trendingMovie> | null>(null)

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
      'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
      options,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((response) => setData(response))
      .catch((err) => console.error(err))
  }, [])

  return (
    <>
      <MenuBar></MenuBar>
      <section className="flex flex-wrap gap-4">
        {data &&
          data.results.map((e) => {
            return <MovieCard movieData={e}></MovieCard>
          })}
      </section>
    </>
  )
}

export default MovieListPage
