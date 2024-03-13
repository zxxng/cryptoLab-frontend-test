import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import type { MovieDetails, AccountStates } from '@/types/apiResponse'
import RatingStars from '@/app/_components/RatingStars'
import SvgIcon from '@/app/_components/SvgIcon'

interface MovieDetailProps {
  movieId: string
}

const MovieDetail = ({ movieId }: MovieDetailProps) => {
  const [data, setData] = useState<MovieDetails | null>(null)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

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
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      options,
    )
      .then((response) => response.json())
      .then((response: MovieDetails) => setData(response))
      .catch((err) => console.error(err))

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/account_states`,
      options,
    )
      .then((response) => response.json())
      .then((response: AccountStates) => setIsFavorite(response.favorite))
      .catch((err) => console.error(err))
  }, [movieId])

  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev)

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjFmMjI5MWFjNmFlZWNmOTY1Njc1Yjk1YzIxYmU3YyIsInN1YiI6IjY1ZWVjYjMyMmIxMTNkMDE2M2Y4YzcyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0GdlqQ6AtnniLFPrwtEZnNk9XHDMNLyktT-iZvX9-cQ',
      },
      body: JSON.stringify({
        media_type: 'movie',
        media_id: movieId,
        favorite: !isFavorite,
      }),
    }

    fetch(`https://api.themoviedb.org/3/account/21090238/favorite`, options)
      .then((response) => response.json())
      .then((response) => console.log(response, '상태변경 성공!'))
      .catch((err) => console.error(err))
  }

  return (
    <>
      {data ? (
        <section className="mb-8">
          <h3 className="font-suit text-2xl font-bold mt-9 mb-8 text-blue-01">
            {data.title}
          </h3>
          <div className="flex gap-8">
            <Image
              className="rounded-lg shadow-inner"
              src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
              alt={`${data.title} poster`}
              width={350}
              height={490}
            />
            <div className="w-[770px] h-[490px] border-[1px] rounded-lg border-gray-04 p-4 relative">
              <p className="mb-2">
                Rate. {`(${data.vote_average.toFixed(2)})`}
                <RatingStars rate={data.vote_average} color="#531fc2" />
              </p>
              <p>Release Date. {data.release_date.replaceAll('-', '.')}</p>
              <p className="my-4">
                {data.genres.map((genre) => {
                  return <span key={genre.id}>{`# ${genre.name}`}</span>
                })}
              </p>
              <p>{data.overview}</p>
              <SvgIcon.favoriteToggle
                className="absolute top-4 right-4"
                filled={isFavorite}
                onClick={handleFavoriteToggle}
              />
            </div>
          </div>
        </section>
      ) : (
        <p>데이터 로딩중입니다</p>
      )}
    </>
  )
}

export default MovieDetail
