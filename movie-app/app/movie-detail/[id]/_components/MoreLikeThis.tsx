import React, { useState, useEffect } from 'react'
import type { ApiResponse, Movie } from '@/types/apiResponse'
import Image from 'next/image'
import Link from 'next/link'
import { PATH } from '@/constants/appNavigation'
import { useRouter } from 'next/navigation'
import SvgIcon from '@/app/_components/SvgIcon'
import apiClient from '@/utils/apiClient'

interface MoreLikeThisProps {
  movieId: string
}

const MoreLikeThis = ({ movieId }: MoreLikeThisProps) => {
  const router = useRouter()
  const [data, setData] = useState<ApiResponse<Movie> | null>(null)

  useEffect(() => {
    apiClient.getRecommendations(movieId, setData)
  }, [])

  const handleGoToBack = () => {
    router.push(PATH.root)
  }

  return (
    <>
      {data ? (
        <section className="">
          <h3 className="mb-5">More Like This</h3>
          <ul className="flex gap-4 overflow-x-scroll">
            {data?.results.slice(0, 20).map((e) => {
              return (
                <li key={e.id}>
                  <Link href={`${PATH.detail}/${e.id}`}>
                    <div className="block w-[210px] h-[294px] rounded-lg shadow-inner relative">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
                        alt={`${e.title} poster`}
                        className="object-cover rounded-lg"
                        fill
                      />
                    </div>
                    <p className="w-[210px] overflow-hidden whitespace-nowrap text-ellipsis mt-2 mb-1">
                      {e.title}
                    </p>
                    <p className="flex items-center text-gray-03 text-xs">
                      <SvgIcon.filledStar color="#531fc2" />
                      {e.vote_average.toFixed(1)}
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>
          <button
            onClick={handleGoToBack}
            className="flex justify-center items-center w-[360px] h-[42px] bg-gray-04 mx-auto rounded-lg text-white font-normal mt-8 mb-16"
          >
            Back to List
          </button>
        </section>
      ) : (
        <p>데이터 로딩중입니다</p>
      )}
    </>
  )
}

export default MoreLikeThis
