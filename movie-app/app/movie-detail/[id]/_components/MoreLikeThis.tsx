import React, { useState, useEffect } from 'react'
import type { ApiResponse, trendingMovie } from '@/types/apiResponse'
import Image from 'next/image'
import Link from 'next/link'

interface MoreLikeThisProps {
  movieId: string
}

const MoreLikeThis = ({ movieId }: MoreLikeThisProps) => {
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
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,
      options,
    )
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err))
  }, [])

  // TODO: Image size css 수정 필요
  return (
    <>
      {data ? (
        <section className="">
          <h3 className="mb-5">More Like This</h3>
          <ul className="flex gap-4 overflow-x-scroll">
            {data?.results.slice(0, 20).map((e) => {
              return (
                <li
                  key={e.id}
                  className="rounded-lg shadow-inner overflow-hidden relative"
                >
                  <Link href={`/movie-detail/${e.id}`}>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
                      alt={`${e.title} poster`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <p className="whitespace-nowrap text-ellipsis">{e.title}</p>
                    <p>★ {e.vote_average.toFixed(1)}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      ) : (
        <p>데이터 로딩중입니다</p>
      )}
    </>
  )
}

export default MoreLikeThis
