'use client'

import React, { useEffect, useState } from 'react'
import MenuBar from './_components/MenuBar'
import SelectBox from './_components/SelectBox'
import MovieCard from './_components/MovieCard'
import PageBar from './_components/PageBar'
import type { ApiResponse, Movie } from '@/types/apiResponse'
import { MENU } from '@/constants/appNavigation'
import { useSearchParams } from 'next/navigation'
import apiClient from '@/utils/apiClient'

const MovieListPage = () => {
  const searchParams = useSearchParams()
  const [data, setData] = useState<ApiResponse<Movie> | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const menu = searchParams.get('menu')
  const genre = searchParams.get('genre')

  useEffect(() => {
    setSelectedMenu(menu)
    setSelectedGenre(genre)
  }, [searchParams])

  useEffect(() => {
    if (selectedMenu === MENU.favorite) {
      apiClient.getFavorite(setData)
    } else if (selectedGenre && selectedGenre !== 'Trending') {
      apiClient.getGenre(selectedGenre, setData)
    } else {
      apiClient.getTrending(currentPage, setData)
    }
  }, [currentPage, selectedMenu, selectedGenre])

  return (
    <>
      <MenuBar />
      {!selectedMenu && <SelectBox />}
      <section className="flex flex-wrap gap-4">
        <h2 className="sr-only">영화 목록</h2>
        {data &&
          data.results.map((e) => {
            return <MovieCard key={e.id} movieData={e} />
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
