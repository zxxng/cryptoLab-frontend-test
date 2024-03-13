import type { ApiResponse, Movie, MovieDetails } from '@/types/apiResponse'

type setDataType = React.Dispatch<
  React.SetStateAction<ApiResponse<Movie> | null>
>

const fetchGET = async (url: string, setState: React.Dispatch<any>) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_API_TOKEN as string,
    },
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error('데이터 통신 중 오류가 발생했습니다.')
    }
    const data = await response.json()
    setState(data)
  } catch (err) {
    console.error(err)
  }
}

const fetchPOST = async (url: string, body: object, onSuccess: () => void) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: process.env.NEXT_PUBLIC_API_TOKEN as string,
    },
    body: JSON.stringify(body),
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error('데이터 통신 중 오류가 발생했습니다.')
    }
    onSuccess()
  } catch (err) {
    console.error(err)
  }
}

const getTrending = (currentPage: number, setData: setDataType) => {
  const url = `${process.env.NEXT_PUBLIC_API_END_POINT}/trending/movie/day?language=en-US&page=${currentPage}`
  fetchGET(url, setData)
}

const getFavorite = (setData: setDataType) => {
  const url = `${process.env.NEXT_PUBLIC_API_END_POINT}/account/21090238/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`
  fetchGET(url, setData)
}

const getGenre = (selectedGenre: string, setData: setDataType) => {
  const url = `${process.env.NEXT_PUBLIC_API_END_POINT}/discover/movie?with_genres=${selectedGenre}`
  fetchGET(url, setData)
}

const getMovieDetail = (
  movieId: string,
  setData: React.Dispatch<React.SetStateAction<MovieDetails | null>>,
) => {
  const url = `${process.env.NEXT_PUBLIC_API_END_POINT}/movie/${movieId}?language=en-US`
  fetchGET(url, setData)
}

const getRecommendations = (
  movieId: string,
  setData: React.Dispatch<React.SetStateAction<ApiResponse<Movie> | null>>,
) => {
  const url = `${process.env.NEXT_PUBLIC_API_END_POINT}/movie/${movieId}/recommendations?language=en-US&page=1`
  fetchGET(url, setData)
}

const getAccountStates = (
  movieId: number,
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const url = `${process.env.NEXT_PUBLIC_API_END_POINT}/movie/${movieId}/account_states`
  fetchGET(url, setIsFavorite)
}

const postFavoriteStatus = async (
  movieId: number,
  isFavorite: boolean,
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const url = `${process.env.NEXT_PUBLIC_API_END_POINT}/account/21090238/favorite`
  const body = {
    media_type: 'movie',
    media_id: movieId,
    favorite: !isFavorite,
  }
  await fetchPOST(url, body, () => setIsModalVisible(true))
}

const apiClient = {
  getTrending,
  getFavorite,
  getGenre,
  getMovieDetail,
  getRecommendations,
  getAccountStates,
  postFavoriteStatus,
}

export default apiClient
