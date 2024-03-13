import type {
  ApiResponse,
  Movie,
  MovieDetails,
  AccountStates,
} from '@/types/apiResponse'

type setDataType = React.Dispatch<
  React.SetStateAction<ApiResponse<Movie> | null>
>
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: process.env.NEXT_PUBLIC_API_TOKEN as string,
  },
}

const fetchTrendingData = (currentPage: number, setData: setDataType) => {
  fetch(
    `${process.env.NEXT_PUBLIC_API_END_POINT}/trending/movie/day?language=en-US&page=${currentPage}`,
    options,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((response) => setData(response))
    .catch((err) => console.error(err))
}

const fetchFavoriteData = (setData: setDataType) => {
  fetch(
    `${process.env.NEXT_PUBLIC_API_END_POINT}/account/21090238/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`,
    options,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((response) => setData(response))
    .catch((err) => console.error(err))
}

const fetchGenreData = (selectedGenre: string, setData: setDataType) => {
  fetch(
    `${process.env.NEXT_PUBLIC_API_END_POINT}/discover/movie?with_genres=${selectedGenre}`,
    options,
  )
    .then((response) => response.json())
    .then((response) => setData(response))
    .catch((err) => console.error(err))
}

const fetchMovieDetailData = (
  movieId: string,
  setData: React.Dispatch<React.SetStateAction<MovieDetails | null>>,
) => {
  fetch(
    `${process.env.NEXT_PUBLIC_API_END_POINT}/movie/${movieId}?language=en-US`,
    options,
  )
    .then((response) => response.json())
    .then((response: MovieDetails) => setData(response))
    .catch((err) => console.error(err))
}

const fetchRecommendationsData = (
  movieId: string,
  setData: React.Dispatch<React.SetStateAction<ApiResponse<Movie> | null>>,
) => {
  fetch(
    `${process.env.NEXT_PUBLIC_API_END_POINT}/movie/${movieId}/recommendations?language=en-US&page=1`,
    options,
  )
    .then((response) => response.json())
    .then((response) => setData(response))
    .catch((err) => console.error(err))
}

const fetchAccountStates = (
  movieId: number,
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  fetch(
    `${process.env.NEXT_PUBLIC_API_END_POINT}/movie/${movieId}/account_states`,
    options,
  )
    .then((response) => response.json())
    .then((response: AccountStates) => setIsFavorite(response.favorite))
    .catch((err) => console.error(err))
}

const apiClient = {
  fetchTrendingData,
  fetchFavoriteData,
  fetchGenreData,
  fetchMovieDetailData,
  fetchRecommendationsData,
  fetchAccountStates,
}

export default apiClient
