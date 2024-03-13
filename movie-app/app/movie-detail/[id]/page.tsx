'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import MovieDetail from './_components/MovieDetail'
import MoreLikeThis from './_components/MoreLikeThis'

const MovieDetailPage = () => {
  const pathname = usePathname()
  const movieId = pathname.split('/')[2]

  return (
    <div className="w-[1152px] mx-auto">
      <h2 className="sr-only">영화 상세정보</h2>
      <MovieDetail movieId={movieId} />
      <MoreLikeThis movieId={movieId} />
    </div>
  )
}

export default MovieDetailPage
