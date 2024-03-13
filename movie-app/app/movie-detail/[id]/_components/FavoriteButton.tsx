import React, { useState, useEffect } from 'react'
import SvgIcon from '@/app/_components/SvgIcon'
import type { AccountStates } from '@/types/apiResponse'
import Modal from '../../../_components/Modal'

interface FavoriteButtonProps {
  movieId: number
  movieTitle: string
}

const FavoriteButton = ({ movieId, movieTitle }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

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

    setIsModalVisible(true)
  }

  const handleModalClose = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <SvgIcon.favoriteToggle
        className="absolute top-4 right-4"
        filled={isFavorite}
        onClick={handleFavoriteToggle}
      />
      <Modal
        title={movieTitle}
        isModalVisible={isModalVisible}
        onClose={handleModalClose}
      >
        {isFavorite ? (
          <p className="text-gray-01 text-sm text-center">
            선택한 영화가 My Favorite List에 추가되었습니다.
            <br />
            <br />
            *확인하기 버튼을 눌러 My Favorite List에서
            <br />
            좋아요한 영화 목록을 확인할 수 있습니다.
          </p>
        ) : (
          <p className="text-gray-01 text-sm text-center">
            선택한 영화가 My Favorite List에서 제거되었습니다.
          </p>
        )}
      </Modal>
    </>
  )
}

export default FavoriteButton
