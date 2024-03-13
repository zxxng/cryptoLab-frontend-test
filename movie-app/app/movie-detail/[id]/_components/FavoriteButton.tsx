import React, { useState, useEffect } from 'react'
import SvgIcon from '@/app/_components/SvgIcon'
import Modal from '../../../_components/Modal'
import { useRouter } from 'next/navigation'
import { PATH, MENU } from '@/constants/appNavigation'
import apiClient from '@/utils/apiClient'

interface FavoriteButtonProps {
  movieId: number
  movieTitle: string
}

const FavoriteButton = ({ movieId, movieTitle }: FavoriteButtonProps) => {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  useEffect(() => {
    apiClient.fetchAccountStates(movieId, setIsFavorite)
  }, [movieId])

  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev)

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: process.env.NEXT_PUBLIC_API_TOKEN as string,
      },
      body: JSON.stringify({
        media_type: 'movie',
        media_id: movieId,
        favorite: !isFavorite,
      }),
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_END_POINT}/account/21090238/favorite`,
      options,
    ).catch((err) => console.error(err))

    setIsModalVisible(true)
  }

  const handleModalClose = () => {
    setIsModalVisible(false)
  }

  const handleModalConfirm = () => {
    router.push(`${PATH.root}?menu=${MENU.favorite}`)
  }

  return (
    <>
      <SvgIcon.favoriteToggle
        className="absolute top-4 right-4"
        filled={isFavorite}
        onClick={handleFavoriteToggle}
      />

      {isFavorite ? (
        <Modal
          title={movieTitle}
          isModalVisible={isModalVisible}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
        >
          <p className="text-gray-01 text-sm text-center">
            선택한 영화가 My Favorite List에 추가되었습니다.
            <br />
            <br />
            *확인하기 버튼을 눌러 My Favorite List에서
            <br />
            좋아요한 영화 목록을 확인할 수 있습니다.
          </p>
        </Modal>
      ) : (
        <Modal
          title={movieTitle}
          isModalVisible={isModalVisible}
          onClose={handleModalClose}
        >
          <p className="text-gray-01 text-sm text-center">
            선택한 영화가 My Favorite List에서 제거되었습니다.
          </p>
        </Modal>
      )}
    </>
  )
}

export default FavoriteButton
