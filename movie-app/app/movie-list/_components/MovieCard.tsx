import React from 'react'
import type { trendingMovie } from '@/types/apiResponse'
import SvgIcon from '@/app/_components/SvgIcon'

interface MovieCardProps {
  movieData: trendingMovie
}

const MovieCard = ({ movieData }: MovieCardProps) => {
  const formatReleaseDate = (data: string) => {
    return `(${data.split('-')[0]})`
  }

  const convertRatingToStars = (rate: number) => {
    const fullStars = Math.floor(rate / 2)
    const halfStarNeeded = rate % 2 >= 1
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(<SvgIcon.filledStar color="white" key={`filled_${i}`} />)
    }

    if (halfStarNeeded) {
      stars.push(<SvgIcon.harfStar color="white" key="half_star" />)
    }

    return <span>{stars}</span>
  }

  return (
    <article
      className="w-[300px] h-[420px] rounded-lg"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieData.poster_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col justify-between h-full p-4 rounded-lg bg-black bg-opacity-60 text-white opacity-0 hover:opacity-100 duration-300">
        <h3 className="text-center font-suit text-base">{movieData.title}</h3>
        <p className="text-center mb-28 font-suit text-sm">
          {formatReleaseDate(movieData.release_date)}
        </p>
        <div className="flex flex-col gap-1 text-sm">
          <p className="flex gap-1">
            {movieData.vote_average.toFixed(2)}
            {convertRatingToStars(movieData.vote_average)}
          </p>
          <p>{`genres: ${movieData.genre_ids.join(', ')}`}</p>
          <p className="line-clamp-[8] mb-1">{movieData.overview}</p>
          <button className="w-full text-right">View Details</button>
        </div>
      </div>
    </article>
  )
}

export default MovieCard
