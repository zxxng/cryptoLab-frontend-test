export interface ApiResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface Movie {
  adult: boolean
  backdrop_path: string
  id: number
  title: string
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}

interface Genre {
  id: number
  name: string
}

interface ProductionCompany {
  name: string
  id: number
  logo_path?: string
  country?: string
}

interface ProductionCountry {
  iso_3166_1: string
  name: string
}

interface SpokenLanguage {
  iso_639_1: string
  name: string
}

export interface MovieDetails {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: null | object
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: 'Released' | 'Pending' | 'Cancelled' | 'In Production'
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface AccountStates {
  favorite: boolean
  id: number
  rated: boolean
  watchlist: boolean
}
