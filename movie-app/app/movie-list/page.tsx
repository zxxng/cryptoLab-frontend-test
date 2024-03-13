'use client'

import React, { useEffect, useState } from 'react'
import MenuBar from './_components/MenuBar'
import SelectBox from './_components/SelectBox'
import MovieCard from './_components/MovieCard'
import PageBar from './_components/PageBar'
import type { ApiResponse, trendingMovie } from '@/types/apiResponse'
import { MENU } from '@/constants/appNavigation'

const MovieListPage = () => {
  const [data, setData] = useState<ApiResponse<trendingMovie> | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedMenu, setSelectedMenu] = useState<string>(MENU.movie)

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjFmMjI5MWFjNmFlZWNmOTY1Njc1Yjk1YzIxYmU3YyIsInN1YiI6IjY1ZWVjYjMyMmIxMTNkMDE2M2Y4YzcyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0GdlqQ6AtnniLFPrwtEZnNk9XHDMNLyktT-iZvX9-cQ',
      },
    }

    if (selectedMenu === MENU.movie) {
      fetch(
        `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${currentPage}`,
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
    } else {
      fetch(
        'https://api.themoviedb.org/3/account/21090238/favorite/movies?language=en-US&page=1&sort_by=created_at.asc',
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
    }
  }, [currentPage, selectedMenu])

  return (
    <>
      <MenuBar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      {selectedMenu === MENU.movie && <SelectBox setData={setData}></SelectBox>}
      <section className="flex flex-wrap gap-4">
        <h2 className="sr-only">영화 목록</h2>
        {data &&
          data.results.map((e) => {
            return <MovieCard key={e.id} movieData={e}></MovieCard>
          })}
      </section>
      <PageBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={data ? data.total_pages : 0}
      />
    </>
  )
}

export default MovieListPage
