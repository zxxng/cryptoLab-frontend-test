import React from 'react'
import Link from 'next/link'

const MovieListLayout = () => {
  return (
    <div>
      <Link href="/movie-list">Movie List</Link>
      <Link href="/movie-list">My Favorite List</Link>
    </div>
  )
}

export default MovieListLayout
