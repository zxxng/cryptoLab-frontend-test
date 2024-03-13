'use client'

import React, { useEffect, useState } from 'react'
import MenuBar from './_components/MenuBar'
import SelectBox from './_components/SelectBox'
import MovieCard from './_components/MovieCard'
import PageBar from './_components/PageBar'
import type { ApiResponse, trendingMovie } from '@/types/apiResponse'
import { MENU } from '@/constants/appNavigation'
import { useSearchParams } from 'next/navigation'

const MovieListPage = () => {
  const searchParams = useSearchParams()
  const [data, setData] = useState<ApiResponse<trendingMovie> | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null)
  const menu = searchParams.get('menu')

  useEffect(() => {
    setSelectedMenu(menu)
  }, [searchParams])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.NEXT_PUBLIC_API_TOKEN as string,
      },
    }

    if (selectedMenu === MENU.favorite) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_END_POINT}/account/21090238/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`,
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
        `${process.env.NEXT_PUBLIC_API_END_POINT}/trending/movie/day?language=en-US&page=${currentPage}`,
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
      <MenuBar />
      {!selectedMenu && (
        <SelectBox setData={setData} setCurrentPage={setCurrentPage} />
      )}
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
