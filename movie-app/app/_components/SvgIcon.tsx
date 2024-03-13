import React from 'react'
import FilledStarSvg from '@/public/star_filled.svg'
import HalfStarSvg from '@/public/star_half.svg'
import FilledHeartSvg from '@/public/favorite_filled.svg'
import EmptyHeartSvg from '@/public/favorite_empty.svg'
import Chevron from '@/public/chevron.svg'
import DoubleChevron from '@/public/double_chevron.svg'

interface SvgIconProps {
  Component: any
  className?: string
  size: number
  alt: string
  color?: string
  onClick?: () => void
}

const SvgIcon = ({
  Component,
  className = '',
  color,
  size,
  alt,
  onClick,
}: SvgIconProps) => {
  return (
    <Component
      onClick={onClick}
      className={`inline ${className}`}
      width={size}
      height={size}
      fill={color}
      alt={alt}
      viewBox="0 0 25 25"
    />
  )
}

const FilledStar = ({ color }: { color: string }) => {
  return (
    <SvgIcon
      Component={FilledStarSvg}
      color={color}
      size={20}
      alt="채워진 별"
    />
  )
}

const HarfStar = ({ color }: { color?: string }) => {
  return (
    <SvgIcon Component={HalfStarSvg} color={color} size={20} alt="반쪽 별" />
  )
}

const FavoriteToggle = ({
  filled,
  className,
  color = '#531FC2',
  onClick,
}: {
  filled: boolean
  className: string
  color?: string
  onClick: () => void
}) => {
  return (
    <button onClick={onClick}>
      <SvgIcon
        Component={filled ? FilledHeartSvg : EmptyHeartSvg}
        className={className}
        color={color}
        size={24}
        alt="좋아요 버튼"
      />
    </button>
  )
}

const pageMoveArrow = ({
  double,
  reverse,
  alt,
  onClick,
}: {
  double?: boolean
  reverse?: boolean
  alt: string
  onClick: () => void
}) => {
  return (
    <SvgIcon
      onClick={onClick}
      Component={double ? DoubleChevron : Chevron}
      className={`cursor-pointer ${reverse ? 'rotate-180' : ''}`}
      alt={alt}
      size={20}
    ></SvgIcon>
  )
}

SvgIcon.filledStar = FilledStar
SvgIcon.harfStar = HarfStar
SvgIcon.favoriteToggle = FavoriteToggle
SvgIcon.pageMoveArrow = pageMoveArrow

export default SvgIcon
