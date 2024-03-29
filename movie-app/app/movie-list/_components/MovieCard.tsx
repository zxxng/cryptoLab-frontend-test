import React from 'react'
import type { Movie } from '@/types/apiResponse'
import Link from 'next/link'
import RatingStars from '@/app/_components/RatingStars'
import { GENRES } from '@/constants/genres'
import { PATH } from '@/constants/appNavigation'

interface MovieCardProps {
  movieData: Movie
}

const MovieCard = ({ movieData }: MovieCardProps) => {
  const formatReleaseDate = (data: string) => {
    return `(${data.split('-')[0]})`
  }

  const formatGenreData = (genres: number[]) => {
    return genres.slice(0, 2).map((genre) => {
      return GENRES[genre]
    })
  }

  const validateMovieData = (data: Movie) => {
    if (
      !data.poster_path ||
      !data.title ||
      !data.release_date ||
      !data.vote_average ||
      !data.genre_ids ||
      !data.overview
    )
      return false
    return true
  }

  return (
    <>
      {validateMovieData(movieData) ? (
        <article
          className="w-[300px] h-[420px] rounded-lg shadow-inner"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieData.poster_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex flex-col justify-between h-full p-4 rounded-lg bg-black bg-opacity-60 text-white opacity-0 hover:opacity-100 duration-300">
            <h3 className="text-center font-suit text-base">
              {movieData.title}
            </h3>
            <p className="text-center mb-28 font-suit text-sm">
              {formatReleaseDate(movieData.release_date)}
            </p>
            <div className="flex flex-col gap-1 text-sm">
              <p className="flex gap-1">
                {movieData.vote_average.toFixed(2)}
                <RatingStars rate={movieData.vote_average} />
              </p>
              <p>{`genres: ${formatGenreData(movieData.genre_ids).join(', ')}`}</p>
              <p className="line-clamp-[8] mb-1">{movieData.overview}</p>
              <Link
                href={`${PATH.detail}/${movieData.id}`}
                className="w-full text-right"
              >
                View Details
              </Link>
            </div>
          </div>
        </article>
      ) : null}
    </>
  )
}

export default MovieCard
