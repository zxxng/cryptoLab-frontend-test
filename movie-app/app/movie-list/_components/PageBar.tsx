import React, { useEffect, useState } from 'react'
import SvgIcon from '@/app/_components/SvgIcon'
import Image from 'next/image'

interface PageBarProps {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalPage: number
}

const PageBar = ({ currentPage, setCurrentPage, totalPage }: PageBarProps) => {
  const [pageRange, setPageRange] = useState<number[]>([1, 2, 3, 4, 5])

  useEffect(() => {}, [currentPage])

  const handlePageNumber = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    const target = e.target as HTMLButtonElement
    if (!target.textContent) return
    setCurrentPage(parseInt(target.textContent, 10))
  }

  const calculateRange = (calculateNumber: number) => {
    const newRange = pageRange.map((number) => {
      return number + calculateNumber
    })
    setPageRange(newRange)
  }

  return (
    <nav className="text-center mt-8 mb-12 text-gray-03">
      <SvgIcon.pageMoveArrow
        onClick={() => {
          setCurrentPage(1)
          setPageRange([1, 2, 3, 4, 5])
        }}
        double={true}
        alt="처음으로"
      />
      <SvgIcon.pageMoveArrow
        onClick={() => {
          const moveNumber = currentPage - 1
          if (moveNumber < 1) return
          setCurrentPage(moveNumber)
          if (pageRange.includes(moveNumber)) return
          if (moveNumber < pageRange[0]) calculateRange(-5)
        }}
        alt="앞으로"
      />
      {pageRange.map((number) => {
        return (
          <button
            key={number}
            className={`p-1 ${currentPage === number ? 'text-gray-01' : ''} hover:text-gray-01`}
            onClick={(e) => handlePageNumber(e)}
          >
            {number}
          </button>
        )
      })}
      <SvgIcon.pageMoveArrow
        onClick={() => {
          const moveNumber = currentPage + 1
          if (moveNumber > totalPage) return
          setCurrentPage(moveNumber)
          if (pageRange.includes(moveNumber)) return
          if (moveNumber > pageRange[4]) calculateRange(5)
        }}
        reverse={true}
        alt="뒤로"
      />
      <SvgIcon.pageMoveArrow
        onClick={() => {
          setCurrentPage(totalPage)
          const maxRangeNums = 5
          const lastPageRangeStart = Math.max(totalPage - maxRangeNums + 1, 1)
          const newPageRange = []

          for (let i = lastPageRangeStart; i <= totalPage; i++) {
            newPageRange.push(i)
          }

          setPageRange(newPageRange)
        }}
        reverse={true}
        double={true}
        alt="마지막으로"
      />
    </nav>
  )
}

export default PageBar
