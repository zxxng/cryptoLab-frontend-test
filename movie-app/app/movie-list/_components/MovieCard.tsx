import React from 'react'
import Image from 'next/image'
import type { trendingMovie } from '@/types/apiResponse'

interface MovieCardProps {
  movieData: trendingMovie
}

const MovieCard = ({ movieData }: MovieCardProps) => {
  return (
    <article>
      <Image
        className="rounded-lg"
        src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
        alt={`${movieData.title} poster`}
        width={300}
        height={420}
      ></Image>
    </article>
  )
}

export default MovieCard
