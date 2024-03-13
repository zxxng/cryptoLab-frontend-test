import React, { useEffect, useState } from 'react'
import SvgIcon from '@/app/_components/SvgIcon'

interface PageBarProps {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalPage: number
}

const PageBar = ({ currentPage, setCurrentPage, totalPage }: PageBarProps) => {
  const [pageRange, setPageRange] = useState<number[]>([])

  useEffect(() => {
    const calculatePageRange = () => {
      let startPage = currentPage - 2
      let endPage = currentPage + 2
      if (startPage < 1) {
        startPage = 1
        endPage = Math.min(5, totalPage)
      }
      if (endPage > totalPage) {
        endPage = totalPage
        startPage = Math.max(1, totalPage - 4)
      }

      const newPageRange = []
      for (let i = startPage; i <= endPage; i++) {
        newPageRange.push(i)
      }
      setPageRange(newPageRange)
    }

    calculatePageRange()
  }, [currentPage, totalPage])

  const handlePageNumber = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    const target = e.target as HTMLButtonElement
    if (!target.textContent) return
    setCurrentPage(parseInt(target.textContent, 10))
  }

  return (
    <nav className="text-center mt-8 mb-12 text-gray-03">
      <SvgIcon.pageMoveArrow
        onClick={() => {
          setCurrentPage(1)
        }}
        double={true}
        alt="처음으로"
      />
      <SvgIcon.pageMoveArrow
        onClick={() => {
          const moveNumber = currentPage - 1
          if (moveNumber < 1) return
          setCurrentPage(moveNumber)
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
        }}
        reverse={true}
        alt="뒤로"
      />
      <SvgIcon.pageMoveArrow
        onClick={() => {
          setCurrentPage(totalPage)
        }}
        reverse={true}
        double={true}
        alt="마지막으로"
      />
    </nav>
  )
}

export default PageBar
