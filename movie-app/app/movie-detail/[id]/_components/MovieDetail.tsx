import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import type { MovieDetails } from '@/types/apiResponse'
import RatingStars from '@/app/_components/RatingStars'
import FavoriteButton from './FavoriteButton'

interface MovieDetailProps {
  movieId: string
}

const MovieDetail = ({ movieId }: MovieDetailProps) => {
  const [data, setData] = useState<MovieDetails | null>(null)

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.NEXT_PUBLIC_API_TOKEN as string,
      },
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_END_POINT}/movie/${movieId}?language=en-US`,
      options,
    )
      .then((response) => response.json())
      .then((response: MovieDetails) => setData(response))
      .catch((err) => console.error(err))
  }, [movieId])

  return (
    <>
      {data ? (
        <section className="mb-8">
          <h3 className="font-suit text-2xl font-bold mt-9 mb-8 text-blue-01">
            {data.title}
          </h3>
          <div className="flex gap-8 h-[490px]">
            <Image
              className="rounded-lg shadow-inner"
              src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
              alt={`${data.title} poster`}
              width={350}
              height={490}
            />
            <div className="w-[770px] h-[490px] border-[1px] rounded-lg border-gray-04 p-4 relative text-sm">
              <p className="mb-2">
                Rate.{' '}
                <span className="text-gray-03">{`(${data.vote_average.toFixed(2)})`}</span>
                <RatingStars rate={data.vote_average} color="#531fc2" />
              </p>
              <p>Release Date. {data.release_date.replaceAll('-', '.')}</p>
              <p className="my-4">
                {data.genres.map((genre) => {
                  return (
                    <span
                      className="bg-gray-06 text-gray-03 p-2 rounded-full mr-2"
                      key={genre.id}
                    >{`# ${genre.name}`}</span>
                  )
                })}
              </p>
              <p>{data.overview}</p>
              <FavoriteButton movieId={data.id} movieTitle={data.title} />
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
