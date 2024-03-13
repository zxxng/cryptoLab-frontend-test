import React from 'react'
import SvgIcon from './SvgIcon'

interface RatingStarsProps {
  rate: number
  color?: string
}

const RatingStars = ({ rate, color }: RatingStarsProps) => {
  const fullStars = Math.floor(rate / 2)
  const halfStarNeeded = rate % 2 >= 1
  const stars = []

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <SvgIcon.filledStar
        color={color ? color : 'white'}
        key={`filled_${i}`}
      />,
    )
  }

  if (halfStarNeeded) {
    stars.push(
      <SvgIcon.harfStar color={color ? color : 'white'} key="half_star" />,
    )
  }

  return <span>{stars}</span>
}

export default RatingStars
