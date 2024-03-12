import React from 'react'
import FilledStarSvg from '@/public/star_filled.svg'
import HalfStarSvg from '@/public/star_half.svg'
import FilledHeartSvg from '@/public/favorite_filled.svg'
import EmptyHeartSvg from '@/public/favorite_empty.svg'

interface SvgIconProps {
  color: string
  size: number
  Component: any
}

const SvgIcon = ({ color, size, Component }: SvgIconProps) => {
  return (
    <Component
      className="inline"
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill={color}
    />
  )
}

const FilledStar = ({ color }: { color: string }) => {
  return <SvgIcon color={color} size={20} Component={FilledStarSvg} />
}

const HarfStar = ({ color }: { color: string }) => {
  return <SvgIcon color={color} size={20} Component={HalfStarSvg} />
}

const FilledHeart = ({ color }: { color: string }) => {
  return <SvgIcon color={color} size={24} Component={FilledHeartSvg} />
}

const EmptyHeart = ({ color }: { color: string }) => {
  return <SvgIcon color={color} size={24} Component={EmptyHeartSvg} />
}

SvgIcon.filledStar = FilledStar
SvgIcon.harfStar = HarfStar
SvgIcon.filledHeart = FilledHeart
SvgIcon.emptyHeart = EmptyHeart

export default SvgIcon
