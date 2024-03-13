import React from 'react'
import { MENU } from '@/constants/appNavigation'

interface MenuBarProps {
  selectedMenu: string
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>
}

const MenuBar = ({ selectedMenu, setSelectedMenu }: MenuBarProps) => {
  const handleSelectedMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault
    const target = e.target as HTMLButtonElement
    setSelectedMenu(target.textContent as string)
  }

  return (
    <div className="font-suit text-2xl font-bold mt-9 mb-8">
      <button
        onClick={(e) => handleSelectedMenu(e)}
        className={`${selectedMenu === MENU.movie ? 'text-blue-01' : 'text-gray-04'} hover:text-blue-01 mr-8`}
      >
        {MENU.movie}
      </button>
      <button
        onClick={(e) => handleSelectedMenu(e)}
        className={`${selectedMenu === MENU.favorite ? 'text-blue-01' : 'text-gray-04'} hover:text-blue-01`}
      >
        {MENU.favorite}
      </button>
    </div>
  )
}

export default MenuBar
